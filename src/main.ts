import { createApp } from 'vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './components/App.vue';

// styles
import './styles/element-override.scss';
import './styles/index.scss';

import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-notification.css';

// Pinia store
import { createPinia } from 'pinia';

import router from './router';

// create app
const pinia = createPinia();
const app = createApp(App);

// register el icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.mount('#app');
