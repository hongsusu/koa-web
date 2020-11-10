import Vue from "vue";
import VueRouter from "vue-router";
import ErrorPage from "@/views/Error.vue";
// 分模块的路由
import page from "./page";

const root= [
    {
        path: "/h5",
        name: "Form",
        meta: {
            title: "预约表单"
        },
        redirect: "/form"
    },
    {
        path: "",
        name: "Form",
        meta: {
            title: "预约表单"
        },
        redirect: "/form"
    },
    {
        path: "/error",
        name: "Error",
        component: ErrorPage,
        meta: {
            title: "错误页面"
        }
    }
];

const routes = root.concat(page);

Vue.use(VueRouter);

//默认跳转和登录拦截

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

export default router;
