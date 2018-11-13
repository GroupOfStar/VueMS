<template>
    <div class="rateuserlist">
        <el-card class="box-card">
            <div slot="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/rateuserlist' }">三星用户</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <el-table :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" stripe style="width: 100%">

                <el-table-column type="selection" width="55"></el-table-column>

                <el-table-column prop="username" label="用户名" width="100" sortable></el-table-column>

                <el-table-column prop="realname" label="姓名" width="100" sortable>
                </el-table-column>

                <el-table-column prop="age" label="年龄" min-width="80" sortable>
                </el-table-column>

                <el-table-column prop="rate" label="星级" width="200" sortable>
                    <template slot-scope="scope">
                        <el-rate v-model="scope.row.rate" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                    </template>
                </el-table-column>

                <el-table-column prop="idType" label="证件号" :show-overflow-tooltip="true"></el-table-column>

                <el-table-column fixed="right" width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.id)">修改</el-button>
                        <el-button type="danger" size="mini" @click="handleDle(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
        </el-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      search:''
    };
  },
  created() {
    this.GET_USERLIST().then((result) => {
        this.tableData = this.getRateList(3)
    }).catch((err) => {
        console.log(err)
    });
  },
  computed: {
      ...mapGetters([
          'getRateList'
      ])
  },
  methods: {
      handleEdit(id){
          console.log('修改',id)
      },
      handleDle(id){
          console.log('删除',id)
      },
      ...mapActions([
          'GET_USERLIST'
      ])
  }
};
</script>



