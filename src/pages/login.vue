<template>
    <div class="login">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
            <h3 class="title">VueMS管理系统</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="邮箱账号或手机号"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="输入密码"></el-input>
            </el-form-item>

            <el-form-item size="mini">

                <el-row type="flex" justify="space-between">

                  <el-col :span=12>
                    <!-- `checked` 为 true 或 false -->
                    <el-checkbox v-model="loginForm.keepLogin">记住登录状态</el-checkbox>
                  </el-col>
                  <el-col :span=12 style="text-align:right">
                    <el-button type="text">忘记密码？</el-button><el-button type="text">注册用户</el-button>
                  </el-col>

                </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        keepLogin: false,
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}, //非空
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}, //长度
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    // 读取本地存储的登录信息
    const local = JSON.parse(localStorage.getItem('loginInfo'));
    // Object.assign(this.loginForm, local)
    this.loginForm = {...local};
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   收集用户名和密码，发送给后端
          // const params = {};
          // Object.assign(params, this.loginForm);
          this.axios
            .post('/api/checkLogin', this.loginForm)
            .then(result => {
              if (result.data.length) {
                // “记住登录状态信息” 配置 
                if (this.loginForm.keepLogin) {
                  // 先把登录数据存入本地存储
                  localStorage.setItem('loginInfo', JSON.stringify(this.loginForm));
                } else {
                  localStorage.removeItem('loginInfo');
                }
                // 把当前用户数据存入store
                this.$store.commit('SAVE_USERINFO', result.data[0]);

                // 成功消息提示
                this.$message({
                  message: '恭喜你，登录成功！',
                  type: 'success',
                });
                // 编程式路由跳转
                this.$router.push('/');
              } else {
                this.$message.error('登录失败：账户名或密码错误！');
              }
            })
            .catch(err => {});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log('this.$refs[formName] :', this.$refs[formName]);
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 30px 0px 0px;
}
.el-form .title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
</style>
