# soracom-map

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Add google map API key

edit src/app.js
```
Vue.use(VueGoogleMaps, {
    load: {
        key: '',//process.env.VUE_APP_GOOGLE_MAP_API,
```

### Amplify setup
see also
https://aws.amazon.com/jp/blogs/startup/event-report-amplify-handson/

```
npm install -g @aws-amplify/cli@1.8.0
amplify configure
```

### publish
```
amplify publish
```


