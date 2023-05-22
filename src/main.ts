import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'
import { setupLayouts } from 'virtual:generated-layouts'
/* import { defineCustomElements } from '@ionic/pwa-elements/loader' */
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import messages from '@intlify/unplugin-vue-i18n/messages'
import App from './App.vue'
import generatedRoutes from '~pages'
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
/* Optional CSS utils */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'
import 'swiper/scss'
import 'swiper/css/autoplay'
import 'swiper/css/keyboard'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import '@ionic/vue/css/ionic-swiper.css'
/* Theme variables */
import './theme/variables.css'
import './theme/tailwind.scss'

const routes = setupLayouts(generatedRoutes)
const pinia = createPinia()
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const app = createApp(App)
  .use(i18n)
  .use(pinia)
  .use(router)
  .use(IonicVue)
router.isReady().then(() => {
  app.mount('#app')
})
