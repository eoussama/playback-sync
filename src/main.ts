import './style/main.scss';

import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Modal from './components/Modal.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { loadIcons } from './utils/helpers/fontawesome.helper';

const pinia = createPinia();
const app = createApp(App);

loadIcons();

app.use(pinia);

app.component('Modal', Modal);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');