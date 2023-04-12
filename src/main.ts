import { createApp } from 'vue'
import { Store } from "vuex"
import { createRouter, createWebHistory } from "vue-router"

import axios from "axios"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './components/App.vue'

// styles
import "./styles/element-override.scss"
import "./styles/index.scss"

// vuex store
import store from "./store/index"

// global properties type fix
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        axios: any
        store: Store<any>
    }
}

// setup VueRouter
const routes = [
    { path: "/", component: () => import("./components/home/StartScreen.vue") },
    { path: "/test", component: () => import("./components/test/TestPage.vue") },
    { path: "/login", component: () => import("./components/account/LoginPage.vue") },
    { path: "/list", component: () => import("./components/list/ListPage.vue") },
    { path: "/group", component: () => import("./components/group/GroupPage.vue") },
    { path: "/:pathMatch(.*)*", component: () => import("./components/NotFoundPage.vue") },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// create app
const app = createApp(App)

// register el icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.axios = axios
app.config.globalProperties.store = store

app.use(store)
app.use(router)
app.mount('#app')
