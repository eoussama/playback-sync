import { createPinia } from "pinia";

import { createApp } from "vue";
import App from "./App.vue";

import { initEffects } from "./state/effects";

import { addComponent } from "./utils/helpers/component.helper";
import { initIcons } from "./utils/helpers/fontawesome.helper";
import { initGSAP } from "./utils/helpers/gsap.helper";
import { initShortcuts } from "./utils/helpers/shortcut.helper";
import "./style/main.scss";



const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

initGSAP();
initIcons();
initEffects();
initShortcuts();
addComponent(app);

app.mount("#app");
