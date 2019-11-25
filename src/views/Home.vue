<template>
<el-container>
  <el-aside style="width:200px">
    <div class="max">
      <div class="img">
        <img src="../assets/logo_admin.png" alt="">
      </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#353b4e"
      style="width:201px"
      text-color="#fff"
      router
      >
          <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/content">内容列表</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="/source">素材管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>粉丝管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">图文数据</el-menu-item>
            <el-menu-item index="1-2">粉丝概况</el-menu-item>
            <el-menu-item index="1-3">粉丝画像</el-menu-item>
            <el-menu-item index="1-4">粉丝列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
      <el-menu-item index="/account">账户信息</el-menu-item>
    </el-menu>
  </div>
  </el-aside>
  <el-container>
  <el-header>
    <Header></Header>
  </el-header>
  <el-main>
    <router-view :key="$route.path"></router-view>
  </el-main>
  </el-container>
</el-container>
</template>

<script>
import header from '../components/header'
export default {
  components: {
    'Header': header
  }
}
</script>
<style lang='less' scoped>
  .max {
    width: 200px;
    height: 100vh;
    background-color:#353b4e;
  }
  .img {
    width: 200px;
    height: 50px;
    background-color: #2e2f32;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 100px;
    }
  }
</style>
