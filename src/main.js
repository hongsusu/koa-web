import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import "./assets/style/base.less";
import Vant from 'vant';
import 'vant/lib/index.css';
import constant from "./constant";

Vue.use(Vant);
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(MintUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    let tidSuffix = `_${to.query.tid}`;
    if(to.query.tid){
        localStorage.setItem(constant.TENANT_ID,to.query.tid)
    }
    if (to.meta.requireAuth) {
        if (localStorage.getItem(constant.LOGIN_TOKE + tidSuffix) && localStorage.getItem(constant.LIVE_SIG + tidSuffix)) {
            next();
        } else {
            var curTid=to.query.tid||localStorage.getItem(constant.TENANT_ID);
            console.log('localStorage.getItem(constant.TENANT_ID)',localStorage.getItem(constant.TENANT_ID));
            next({
                path: `/login?tid=${curTid}`,
                query: {redirect: to.fullPath}
            });
        }
    } else {
        next();
    }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
