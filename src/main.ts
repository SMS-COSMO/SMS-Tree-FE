import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./components/App.vue";

// setup VueRouter
const routes = [
    { path: "/", component: () => import('./components/home/StartScreen.vue') },
    { path: "/test", component: () => import('./components/test/TestPage.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
import "element-plus/dist/index.css";
import "~/styles/element-override.scss";

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
// import "element-plus/theme-chalk/src/message.scss"

const app = createApp(App);

app.use(router);
app.mount("#app");
