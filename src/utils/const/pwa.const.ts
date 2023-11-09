import icons from './icons.const';
import pkg from './../../../package.json';



export default {
  injectRegister: 'auto',
  registerType: 'autoUpdate',
  manifest: {
    name: 'Playback Sync',
    theme_color: '#383f51',
    background_color: '#dddbf1',
    description: (pkg as any).description,
    screenshots: [
      {
        sizes: '412x915',
        type: 'image/jpeg',
        form_factor: 'narrow',
        src: '/img/screenshots/narrow.jpeg',
      },
      {
        sizes: '2428x1250',
        type: 'image/jpeg',
        form_factor: 'wide',
        src: '/img/screenshots/wide.jpeg',
      }
    ],
    icons: [
      ...icons.ios,
      ...icons.android,
      ...icons.desktop
    ]
  }
};