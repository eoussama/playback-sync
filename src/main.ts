import './style/main.scss';

import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Input from './components/Input.vue';
import Modal from './components/Modal.vue';
import Button from './components/Button.vue';
import Tooltip from './components/Tooltip.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { loadIcons } from './utils/helpers/fontawesome.helper';

const pinia = createPinia();
const app = createApp(App);

loadIcons();

app.use(pinia);

app.component('Modal', Modal);
app.component('Input', Input);
app.component('Button', Button);
app.component('Tooltip', Tooltip);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');