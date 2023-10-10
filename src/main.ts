import './style/main.scss'

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const pinia = createPinia();
const app = createApp(App);
library.add(faPlay, faPause);

app.use(pinia);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
