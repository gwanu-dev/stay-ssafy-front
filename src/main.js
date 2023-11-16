import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { Quasar } from 'quasar'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import '@quasar/extras/roboto-font/roboto-font.css'
// Import Quasar css
import 'quasar/src/css/index.sass'


const app = createApp(App);


const pinia = createPinia();

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
})
app.use(pinia);
app.use(router);
app.mount("#app");
