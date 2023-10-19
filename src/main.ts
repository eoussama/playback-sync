import './style/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import { initGSAP } from './utils/helpers/gsap.helper';
import { loadIcons } from './utils/helpers/fontawesome.helper';
import { addComponent } from './utils/helpers/component.helper';



const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

initGSAP();
loadIcons();
addComponent(app);

app.mount('#app');