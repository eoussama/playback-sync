import './style/main.scss';

import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Head from './components/layout/Head.vue';
import Body from './components/layout/Body.vue';
import Foot from './components/layout/Foot.vue';
import View from './components/layout/View.vue';
import Controls from './components/layout/Controls.vue';

import Modal from './components/info/Modal.vue';
import Tooltip from './components/info/Tooltip.vue';
import Confirm from './components/info/Confirm.vue';

import Source from './components/source/Source.vue';
import SourceDetail from './components/source/SourceDetail.vue';

import Range from './components/controls/Range.vue';
import Input from './components/controls/Input.vue';
import Speed from './components/controls/Speed.vue';
import Select from './components/controls/Select.vue';
import Button from './components/controls/Button.vue';
import Volume from './components/controls/Volume.vue';
import Timeline from './components/controls/Timeline.vue';
import PlayPause from './components/controls/PlayPause.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { loadIcons } from './utils/helpers/fontawesome.helper';

const pinia = createPinia();
const app = createApp(App);

loadIcons();

app.use(pinia);

app.component('Head', Head);
app.component('Body', Body);
app.component('Foot', Foot);
app.component('View', View);
app.component('Controls', Controls);

app.component('SourceDetail', SourceDetail);
app.component('PlayPause', PlayPause);
app.component('Timeline', Timeline);
app.component('Volume', Volume);
app.component('Speed', Speed);
app.component('Modal', Modal);
app.component('Source', Source);
app.component('Range', Range);
app.component('Input', Input);
app.component('Button', Button);
app.component('Select', Select);
app.component('Confirm', Confirm);
app.component('Tooltip', Tooltip);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');