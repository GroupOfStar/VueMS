<template>
    <div class="userlist">
        <el-card class="box-card">
            <div slot="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/userlist' }">用户列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <el-row type="flex" justify="space-between">
                <el-col :span="6">
                    <el-button size="small" >添加用户</el-button>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="search" width="200" size="small" placeholder="Search..."/>
                </el-col>
            </el-row>

            <el-table v-loading.lock="loading" :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" stripe style="width: 100%">

                <el-table-column type="selection" width="55"></el-table-column>

                <el-table-column prop="username" label="用户名" width="100" sortable></el-table-column>

                <el-table-column prop="realname" label="姓名" width="100" sortable>
                </el-table-column>

                <el-table-column prop="age" label="年龄" width="80" sortable>
                </el-table-column>

                <el-table-column prop="rate" label="星级" width="200" sortable>
                    <template slot-scope="scope">
                        <el-rate v-model="scope.row.rate" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                    </template>
                </el-table-column>
                <el-table-column prop="idType" label="证件号" :show-overflow-tooltip="true"></el-table-column>

                <el-table-column fixed="right" label="操作" align="center" width="150">
                    <!-- <template slot="header" slot-scope="slot">
                        <el-input v-model="search" size="mini" placeholder="Search..."/>
                    </template> -->
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.id)">修改</el-button>
                        <el-button type="danger" size="mini" @click="handleDle(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页 -->
            <div style="padding-top:15px; text-align:right">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 30, 50]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length"></el-pagination>
            </div>
        </el-card>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="120px">
                <el-form-item label="用户名：">
                    <el-input v-model="editForm.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓 名：" prop="realname">
                    <el-input v-model="editForm.realname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年 龄：" prop="age">
                    <el-input v-model.number="editForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="星 级：" prop="rate">
                    <el-rate v-model.number="editForm.rate" show-text></el-rate>
                </el-form-item>
                <el-form-item label="证件号：" prop="idType">
                    <el-input v-model="editForm.idType" autocomplete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">取 消</el-button>
                <el-button type="primary" @click="editUserInfo('editForm')">确 定</el-button>
            </div>
        </el-dialog>
      
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      currentPage:1,
      search: '',
      gridData: [],
      dialogFormVisible: false,
      editForm: {},
      formLabelWidth: '120px',
      rules: {
        realname: [
          {required: true, message: '姓名不能为空', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
        ],
        age: [
          {type: 'number', message: '年龄必须为数字值', trigger: 'blur'},
          {required: true, message: '年龄不能为空', trigger: 'blur'},
        ],
        rate: [{type: 'number', message: '请评价星级', trigger: 'change'}],
        idType: [
          {required: true, message: '证件号不符合规范', trigger: 'blur'},
          {min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur'},
        ],
      },
    };
  },
  created() {
    //   this.$store.dispatch('GET_USERLIST').then(() => {
    //       this.tableData = this.userList
    //   })
    this.$Progress.start()
    this.$Progress.set(20)
    this.GET_USERLIST(this.$Progress)
      .then(() => {
        this.tableData = this.userList;
        this.loading = false;
        this.$Progress.finish()
      })
      .catch(err => {
        this.$Progress.fail()
        console.log(err);
      });
  },
  computed: {
    ...mapState(['userList']),
  },
  methods: {
    handleEdit(idx) {
      this.editForm = {...this.tableData.find(e => e.id === idx)};
      this.dialogFormVisible = true;
    },
    handleDle(idx) {
      this.$confirm('您将删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.Delet_USERINFO(idx).then(() => {
            this.$message({
              type: 'success',
              message: '数据删除成功!',
            });
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出操作',
          });
        });
    },
    editUserInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // const ind = this.tableData.findIndex((value,index) => {
          //     if(value.id === this.editForm.id) return index
          // })
          // this.tableData[ind] = this.editForm
          this.UPDATE_USERINFO(this.editForm)
            .then(result => {
              this.$message({
                message: '恭喜，修改信息成功！',
                type: 'success',
              });
              this.dialogFormVisible = false;
            })
            .catch(err => {
              console.log(err);
              this.$message.error('抱歉，数据提交失败！');
            });
        } else {
          this.$message.error('失败，请按要求修改！');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.editForm = {};
      this.$refs[formName].resetFields();
      return (this.dialogFormVisible = false);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    ...mapActions(['GET_USERLIST', 'UPDATE_USERINFO', 'Delet_USERINFO']),
  },
};
</script>

<style scoped>
.box{
  height: 250px;
  width: 100%;
  max-width: 500px;
  background: #dfe9fe;
}


.vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}
</style>




