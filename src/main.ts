import './style/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import { initEffects } from './state/effects';
import { initGSAP } from './utils/helpers/gsap.helper';
import { initIcons } from './utils/helpers/fontawesome.helper';
import { addComponent } from './utils/helpers/component.helper';
import { initShortcuts } from './utils/helpers/shortcut.helper';



const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

initGSAP();
initIcons();
initEffects();
initShortcuts();
addComponent(app);

app.mount('#app');