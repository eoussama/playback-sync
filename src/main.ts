import './style/main.scss';

import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { loadIcons } from './utils/helpers/fontawesome.helper';
import { addComponent } from './utils/helpers/component.helper';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
loadIcons();
addComponent(app);
app.mount('#app');