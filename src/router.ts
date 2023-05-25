import { createRouter, createWebHistory } from "vue-router"

// setup VueRouter
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("./components/home/StartScreen.vue") },
        {
            path: "/admin", component: () => import("./components/admin/AdminApp.vue"), children: [
                {
                    path: "/admin/home",
                    component: () => import("./components/admin/AdminTest.vue")
                }
            ]
        },
        { path: "/test", component: () => import("./components/test/TestPage.vue") },
        { path: "/login", component: () => import("./components/account/LoginPage.vue") },
        { path: "/list", component: () => import("./components/paper/ListPage.vue") },
        { path: "/paper/:id", component: () => import("./components/paper/ContentPage.vue") },
        { path: "/group", component: () => import("./components/group/GroupPage.vue") },
        { path: "/:pathMatch(.*)*", component: () => import("./components/NotFoundPage.vue") },
    ],
})

export default router