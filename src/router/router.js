// 引入路由
import Vue from 'vue'
import Router from 'vue-router'

// 引入组件(页面)
import Login from '../pages/login'
import Layout from '../pages/layout'
import Home from '../pages/home'
import UserList from '../pages/userlist'
import PrivateInfo from '../pages/privateinfo'
import PassWordEdit from '../pages/passwordedit'
import RateUserList from '../pages/rateuserlist'

// 使用路由
Vue.use(Router)

// 定义路由
const router = new Router({
    mode: 'history',
    routes: [
        {
            path:'/login', 
            component: Login,
            meta:{requireAuth: true}
        },
        {
            path:'/', 
            component: Layout,
            children:[
                {path:'', component: Home},
                {path:'/userlist', component: UserList},
                {path:'/privateinfo', component: PrivateInfo},
                {path:'/passwordedit', component: PassWordEdit},
                {path:'/rateuserlist', component: RateUserList}
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    
    if(!to.matched.some(record => record.meta.requireAuth)){
        if(localStorage.getItem('loginInfo') == undefined){
            next({
                path: '/login',
                query: { redirect: to.fullPath } //to.fullPath = /login
              })
        } else {
            next()
        }
    } else {
        next()
    }
})

// 导出路由
export default router