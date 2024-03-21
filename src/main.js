import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

app.use(router)
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBCD74IKqWFdxt4MruVDKSLVPYCwNFtyko',
    libraries: 'places'
  }
})
app.mount('#app')
