<template>
    <div id="app">
        <input type="button" v-on:click="getData()" value="最新データ取得" />
        <br />
        <br />
        参加者一覧(30秒に1回更新)
        <div align="center">
            <GmapMap :center="{lat:33.60, lng:130.40}"
                     :zoom="6"
                     map-type-id="terrain"
                     style="width: 80%; height: 500px">
                <GmapMarker :key="id"
                            v-for="(location,id) in locationdata"
                            :position="location.position"
                            :clickable="true"
                            :title="location.title"
                            :label="location.title"
                            :icon="{ url: location.icon}"
                            :draggable="false" />
            </GmapMap>
        </div>
        <br /><br />
        <table align="center">
            <tr>
                <th class="tbl">お名前</th>
                <th class="tbl">位置情報</th>
                <th class="tbl">更新日時</th>
                <th class="tbl">クリックタイプ</th>
            </tr>
            <tr v-for="location in sortedItems" :key="location.userName">
                <td class="tbl">{{location.title}}</td>
                <td class="tbl">{{location.position}}</td>
                <td class="tbl">{{location.updatetime}}</td>
                <td class="tbl">{{location.clickType}}</td>
            </tr>
        </table>


    </div>
</template>

<script>
    /* import HelloWorld from './components/HelloWorld.vue' */
    import { API } from 'aws-amplify'
    let apiName = 'api2f0ee405'
    let path = '/items/:userName'
    let myInit = {
        headers: {},
        response: true
    }

    function clickType2icon(clickType) {
        let color = "red"
        switch (clickType) {
            case 1:
                color = "red"
                break
            case 2:
                color = "blue"
                break
            case 3:
                color = "yellow"
                break
        }
        return "https://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
    }

    function clickType2Name(clickType) {
        let clickName = "Single"
        switch (clickType) {
            case 1:
                clickName = "Single"
                break
            case 2:
                clickName = "Double"
                break
            case 3:
                clickName = "Long"
                break
        }
        return clickName
    }

    export default {
        name: 'App',
        components: {},
        data() {
            return {
                locationdata: [],
                apiName: apiName,
                path: path,
                myInit: myInit
            }
        },
        methods: {
            getData: function () {
                API.get(apiName, path, myInit).then(response => {
                    this.locationdata = response.data.map(
                        location => ({
                            position: { "lat": parseFloat(location.lat), "lng": parseFloat(location.lon) },
                            title: location.viewName ? location.viewName : location.userName,
                            updatetime: location.updatetime ? (new Date(parseFloat(location.updatetime))).toString() : "",
                            utime: location.updatetime ? parseFloat(location.updatetime) : 0,
                            icon: clickType2icon(location.clickType ? parseInt(location.clickType) : 1),
                            clickType: clickType2Name(location.clickType ? parseInt(location.clickType) : 1)
                        }));
                }).catch(error => {
                    console.log(error)
                    console.log('error')
                    this.locationdata = []
                })
            }
        },
        mounted() {
            this.getData()
            setInterval(this.getData, 30 * 1000)
        },
        computed: {
            sortedItems() {
                return this.locationdata.slice().sort((a, b) => {
                    return (a.utime < b.utime) ? 1 : (a.utime > b.utime) ? -1 : 0;
                })
            }
        }
    }
</script>

<style>

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    table {
        border: 1px solid black;
        border-collapse: collapse;
        width: 70%;
    }

    .tbl {
        border: 1px solid black;
        margin: 5px;
        padding: 5px;
    }
</style>
