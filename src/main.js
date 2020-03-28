import Vue from 'vue'
import App from './App.vue'
import API from '@aws-amplify/api'
import awsconfig from './aws-exports'
import * as VueGoogleMaps from 'vue2-google-maps'

API.configure(awsconfig)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
    load: {
        key: '',//process.env.VUE_APP_GOOGLE_MAP_API,
        libraries: 'places',
        region: 'JP',
        language: 'ja'
    }
})

new Vue({
    render: h => h(App),
}).$mount('#app')
