import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import 'animate.css'

createApp(App).use(store).use(router).use(VeeValidate, {
  validity: true
}).mount('#app')
