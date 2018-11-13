<template>
    <div class="layout">
        <el-container>
            <el-aside width="160px">
            <vue-scroll>
                <router-link to="/" tag="h3" class="logo">VuexMS管理系统</router-link>
                    <el-menu
                    default-active=""
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#324157"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组1</template>
                            <el-menu-item index="userList">用户列表</el-menu-item>
                            <el-menu-item index="privateInfo">个人信息</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="passwordEdit">修改密码</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-3">
                            <template slot="title">用户筛选</template>
                            <el-menu-item index="rateUserList">三星用户</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    </el-menu>
            </vue-scroll>
            </el-aside>
            
            <el-container>
                <el-header>
                    <el-row>
                        <el-col :span="12">
                            <div class="layout-icon"><i class="el-icon-menu"></i></div> 
                        </el-col>
                        <el-col :span="12">
                            <ul class="header-ul right">
                                <li style="padding-right: 20px;" @click="handleExit">退出</li>
                                <li>切换语言</li>
                                <!-- <router-link :to="'/privateinfo'" tag="li">{{ realname }}</router-link> -->
                                <li @click="info('privateInfo')">{{ realname }}</li>
                            </ul>
                        </el-col>
                    </el-row>
                </el-header>
                
                <vue-scroll>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </vue-scroll>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
        
    };
  },
  computed: {
      ...mapState({
          userInfo:'userInfo',
          realname: status => status.userInfo.realname
      })
  },
  methods: {
    handleExit(){
        this.$confirm('您将退出系统，并返回登录页, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$router.push('/login')
            localStorage.removeItem('userInfo')
            this.$message({
                type: 'success',
                message: '已经清空本地存储，请重新登录!'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出操作'
          });          
        });
    },
    info(key){
        // this.$refs.elmenu.open()
        // open(key)
        // select(key)

    },
    handleOpen(key, keyPath) {
      console.log('key :', key);
      console.log('keyPath :', keyPath);
    },
    handleClose(key, keyPath) {
      console.log('key :', key);
      console.log('keyPath :', keyPath);
    },
    home(){
        this.$router.push('/');
    }
  },
};
</script>

<style>
.layout, .el-container {
  height: 100%;
  background-color: #f3f3f4;
}
.el-aside {
    background-color: #324157;
    overflow-x: hidden;
}

.layout .logo {
    color: #fff;
    text-align: center;
    padding: 18px 0;
    margin: 0;
    cursor: default;
}
.el-header{
    overflow: hidden;
    background: #324157;
    color: #fff;
    padding: 0px;
    z-index: 4;
    box-sizing: border-box;
    font-size: 16px;
    text-align: right;
    line-height: 60px;
}
.el-menu {
    border-right: 1px solid #324157;
}
.el-menu--inline{
    background-color: #283446;
}
.layout-icon{
    text-align: left;
    margin-left: 10px;
    font-size: 28px;
    cursor: pointer;
}
.header-ul{
    margin: 0px;
    padding: 0px;
    list-style: none;
}
.header-ul li{
    float: right;
    padding: 0px 15px;
    cursor: pointer;
}
.header-ul li:hover{
    background-color: #283446;
}
.layout ul ul li{
    background-color: #283446!important;
}

.source {
    padding: 24px;
}
</style>
