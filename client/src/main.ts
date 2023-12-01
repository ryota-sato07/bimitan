import { createApp } from 'vue'
import { Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import './style.css';
import App from './App.vue'
import router from './router'
import AmplifyVue from '@aws-amplify/ui-vue';

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {},
})
myApp.use(router)
myApp.use(AmplifyVue)

myApp.mount('#app')
