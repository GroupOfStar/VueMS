<template>
    <div class="privateinfo">
        <el-card class="box-card">
            <div slot="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/privateinfo' }">个人信息</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <el-row v-for="(item,itemkey,index) in itemInfo" :key="index">
                <el-col :span="6" :key="index"><div class="itemInfo">{{ item }}</div></el-col>
                <el-col :span="18" :key="index+1"><div class="info">{{ userInfo[itemkey] }}</div></el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            itemInfo: {
                username: '用户名：',
                password: '密 码：',
                realname: '姓 名：',
                age: '年 龄：',
                idType: '证件号：'
            }
        }
    },
    computed: {
        ...mapState([
            'userInfo'
        ])
    }
}
</script>

<style scoped>
.itemInfo{
    text-align: right;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    color: #606266;
}
.info{
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #606266;
}
</style>




