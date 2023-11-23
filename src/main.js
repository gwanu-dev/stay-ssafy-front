import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { Quasar } from 'quasar'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiHeart, BiHeartFill, BiXCircle, BiPencil, BiReplyAll, BiArrowReturnRight,
  BiTelephone, BiBookmarkStar,  BiBookmarkStarFill 
} from "oh-vue-icons/icons";

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


addIcons( BiHeart, BiHeartFill, BiXCircle, BiPencil, BiReplyAll , BiArrowReturnRight, BiTelephone, BiBookmarkStar,  BiBookmarkStarFill );

// ...
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(Quasar, {
  // plugins: {}, // import Quasar plugins and add here
  // config: {
  //   brand: {
  //     // primary: '#e46262',
  //     // ... or all other brand colors
  //   },
  //   notify: {}, // default set of options for Notify Quasar plugin
  //   loading: {}, // default set of options for Loading Quasar plugin
  //   loadingBar: {}, // settings for LoadingBar Quasar plugin
  //   // ..and many more (check Installation card on each Quasar component/directive/plugin)
  // }
  
})
app.component("v-icon", OhVueIcon);
app.use(router);
app.mount("#app");
