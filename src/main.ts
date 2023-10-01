import { createApp } from 'vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './components/App.vue';

// Styles
import './styles/element-override.scss';
import './styles/index.scss';

import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-notification.css';

// Pinia store
import { createPinia } from 'pinia';
const pinia = createPinia();

import router from './router';

// Create app
const app = createApp(App);

// Register el icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.mount('#app');
