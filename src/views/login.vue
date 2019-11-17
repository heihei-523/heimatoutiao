<template>
  <div class="back">
    <el-card class="card">
      <div class="img">
        <img src="../assets/logo_index.png" alt="">
      </div>
      <el-form :model= 'form' :rules='rules' ref="abc">
        <el-form-item prop='call'>
          <el-input placeholder="请输入您的手机号" v-model="form.call" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:280px" placeholder="请输入验证码" v-model="form.code"></el-input>
          <el-button style='float:right'>获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">我已阅读并接受条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        call: '',
        code: '',
        checked: false
      },
      rules: {
        call: [{ required: true, message: '请输入手机号码' }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'
        }],
        code: [{ required: true, message: '请输入验证码' }, {
          pattern: /^\d{6}$/, message: '验证码错误'
        }],
        checked: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('请您勾选条款'))
          }
        } }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.abc.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            data: {
              mobile: this.form.call,
              code: this.form.code
            },
            method: 'post'
          }).then(result => {
            window.localStorage.setItem('user', result.data.data.token)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              message: '手机或验证码错误，请重新输入',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .back{
    background-image: url('../assets/login_bg.jpg');
    background-size: cover;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .card{
      width: 450px;
      height: 330px;
      .img{
        text-align: center;
        height: 55px;
        img {
          height: 35px;
        }
      }
    }
  }
</style>
