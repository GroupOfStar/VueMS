// 引用Vue
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

// 注册
Vue.use(Vuex)

// 状态
const state = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    userList: []
}

const getters = {
    getRateList: state => value => {
        return state.userList.filter(data => data.rate >= value)
    }
}

// mutations 来操作 state
const mutations = {
    // 保存用户数据
    SAVE_USERINFO(state, userInfo){
        // 先把数据存入本地存储
        localStorage.setItem('userInfo', JSON.stringify(userInfo))

        // 更新数据
        state.userInfo = userInfo
    },
    // 查询用户列表数据
    GET_USERLIST(state, payload){
        state.userList = payload.data
    },
    // 新增用户数据
    ADD_USERINFO(state,userInfo){
        userInfo.rate = 2
        state.userList.unshift(userInfo)
    },
    // 修改用户数据
    UPDATE_USERINFO(state, userInfo){
        // 找到要更新的userInfo在userList中的索引
        const i = state.userList.findIndex((value,index) => {
            if(value.id === userInfo.id) return index
        })
        // 根据索引，修改userList的数据
        state.userList[i] = userInfo
    },
    // 删除用户数据
    Delet_USERINFO(state, userId){
        // 找到要更新的userId在userList中的索引
        const i = state.userList.findIndex((value,index) => {
            if(value.id === userId) return index
        })
        state.userList.splice(i,1);
    }
}

// 用actions 来操作 mutations
const actions = {
    // 获取用户列表信息
    GET_USERLIST({ commit }){
        return new Promise((resolve, reject) => {
            Axios.get('/api/getUserList').then(response => {
                // console.log('获取用户数据：', response.data)
                commit('GET_USERLIST',response)
                resolve()
            })
        })
    },
    // 新增用户信息
    ADD_USERINFO({ commit },userInfo){
        return new Promise((resolve,reject ) => {
            // Axios提交post请求来更新数据库中的数据，成功后存入state
            Axios.post('/api/addUserInfo',userInfo).then((response) => {
                if(response.status == 200)
                // 提交到action来更新state中的数据
                commit('ADD_USERINFO',userInfo)
                resolve()
            })
        })
    },
    // 修改用户信息
    UPDATE_USERINFO({ commit },userInfo){
        return new Promise((resolve,reject ) => {
            // Axios提交post请求来更新数据库中的数据，成功后存入state
            Axios.post('/api/setUserInfo',userInfo).then((response) => {
                if(response.status == 200)
                // 提交到action来更新state中的数据
                commit('UPDATE_USERINFO',userInfo)
                resolve()
            })
        })
    },
    // 删除用户信息
    Delet_USERINFO({ commit },userId){
        return new Promise((resolve,reject) => {
            Axios.post('/api/delUserInfo',{id:userId}).then((response) => {
                if(response.status == 200)
                commit('Delet_USERINFO',userId)
                resolve()
            })
        })
    }
}


// 导出暴露出去
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})