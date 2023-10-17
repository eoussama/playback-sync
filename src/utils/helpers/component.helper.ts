import type { App } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Head from '@/components/layout/Head.vue';
import Body from '@/components/layout/Body.vue';
import Foot from '@/components/layout/Foot.vue';
import View from '@/components/layout/View.vue';
import Controls from '@/components/layout/Controls.vue';

import Modal from '@/components/info/Modal.vue';
import Tooltip from '@/components/info/Tooltip.vue';
import Confirm from '@/components/info/Confirm.vue';

import Source from '@/components/source/Source.vue';
import SourceDetail from '@/components/source/SourceDetail.vue';

import Range from '@/components/controls/Range.vue';
import Input from '@/components/controls/Input.vue';
import Speed from '@/components/controls/Speed.vue';
import Select from '@/components/controls/Select.vue';
import Button from '@/components/controls/Button.vue';
import Volume from '@/components/controls/Volume.vue';
import Tilling from '@/components/controls/Tilling.vue';
import Timeline from '@/components/controls/Timeline.vue';
import PlayPause from '@/components/controls/PlayPause.vue';



/**
 * @description
 * Registers components globaly
 *
 * @param app The vue app
 */
export function addComponent(app: App<Element>) {
  app.component('Head', Head);
  app.component('Body', Body);
  app.component('Foot', Foot);
  app.component('View', View);
  app.component('Controls', Controls);

  app.component('Modal', Modal);
  app.component('Tooltip', Tooltip);
  app.component('Confirm', Confirm);

  app.component('Speed', Speed);
  app.component('Range', Range);
  app.component('Input', Input);
  app.component('Volume', Volume);
  app.component('Button', Button);
  app.component('Select', Select);
  app.component('Tilling', Tilling);
  app.component('Timeline', Timeline);
  app.component('PlayPause', PlayPause);

  app.component('Source', Source);
  app.component('SourceDetail', SourceDetail);

  app.component('font-awesome-icon', FontAwesomeIcon);
}