import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import SessionModule from "@/store/SessionModule";
import {getModule} from "vuex-module-decorators";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {path: '/', name: 'Home', component: () => import("../views/HomeView.vue")},
    {path: '/store', name: 'Store', component: () => import("../views/StoreView.vue")},
    {path: '/login', name: 'Login', component: () => import("../views/LoginView.vue")},
    {path: '/settings', name: 'Settings', component: () => import("../views/SettingsView.vue")},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async(to, from, next) => {
    let sessionModule: SessionModule = getModule(SessionModule)
    if (sessionModule.session && sessionModule.session.sid) {
        sessionModule.saveSession()
    }
    sessionModule.loadSession()

    if (!sessionModule.session.sid) {
        if (to.path != "/login") {
            return next({path: "/login", query: {redirect: to.path}})
        }
    } else if (to.path == "/login") {
        return next({path: "/"})
    }
    next()
})

export default router
