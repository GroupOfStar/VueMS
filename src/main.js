import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'

// 全局使用ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//滚动条自定义
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css'
Vue.use(vuescroll);
Vue.prototype.$vuescrollConfig = {
  scrollPanel: {
    scrollingX: false
  },
  bar: {
    background: '#555',
    onlyShowBarOnScroll: false,
    opacity: 0.4
  }
};

// 进度条：页面顶部的细长进度条
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: '#68f8b0',
  failedColor: 'red',
  height: '2px'
})


// 引入axios并挂载在Vue原型上
import axios from 'axios'
Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
