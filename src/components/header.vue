<template>
  <el-row type="flex" justify="space-between" align="middle">
  <el-col :span="20" class="left">
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
  </el-col>
  <el-col :span="4" class="right">
      <span>消息</span>
      <img src="../assets/avatar.jpg" alt="">
      <el-dropdown trigger="click">
       <span>网名</span>
      <!-- <span class="el-dropdown-link"> -->
        <i class="el-icon-arrow-down el-icon--right"></i>
      <!-- </span> -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>git地址</el-dropdown-item>
        <el-dropdown-item @click.native="out">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
  <!-- <el-col :span="6"></el-col> -->
</el-row>
</template>

<script>
export default {
  methods: {
    out () {
      this.$confirm('不要退出好不好, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出失败'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.left {
    i{
        font-size: 25px;
    }
    span{
        vertical-align: top;
    }
}
.right {
    display: flex;
    align-items: center;
    img {
        border-radius: 50%;
        margin-right: 5px;
        margin: 5px;
    }
}
</style>
