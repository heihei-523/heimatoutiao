import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Publish from '../views/Publish.vue' // 文章发布
import Page from '../views/page.vue' // 首页
import Content from '../views/content.vue' // 内容列表
import Nprogress from 'nprogress' // 条条
import Comment from '../views/comment.vue' // 评论
import CommentList from '../views/comment-list.vue'
import Source from '../views/source.vue' // 素材管理
import Account from '../views/account.vue' // 管理账户
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   component: Home
  // },
  {

    path: '/',
    // name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: Page
      },
      {
        path: '/publish',
        component: Publish
      },
      {
        path: '/content',
        component: Content
      },
      {
        path: '/publish/:articleId', // 编辑文章e
        component: Publish
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/comment/:articleId',
        component: CommentList,
        props: true
      },
      {
        path: '/source',
        component: Source
      },
      {
        path: '/account',
        component: Account
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})
// 路由拦截器
// to表示去哪里的路由信息
// from表示来自哪里的路由信息
// next它是一个方法，用于路由登录放行
router.beforeEach((to, from, next) => {
  // 进度条
  Nprogress.start()
  if (to.path === '/login') {
    next()
    Nprogress.done()
    return
  }
  const token = window.localStorage.getItem('user')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
router.afterEach((to, from) => {
  Nprogress.done()
})
export default router
