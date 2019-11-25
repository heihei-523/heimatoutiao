<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论详情</span>
      </div>
    <el-table
        :data="comments"
        style="width: 100%">
        <el-table-column
            label="头像"
            width="180">
            <template slot-scope="scope">
                <img width="50" :src="scope.row.aut_photo" alt="">
            </template>
        </el-table-column>
        <el-table-column
            prop="content"
            label="评论内容"
            width="180">
        </el-table-column>
        <el-table-column
            label="点赞"
            width="180">
            <template slot-scope="scope">
                {{scope.row.is_liking===1?'已赞':'点赞'}}
            </template>
        </el-table-column>
        <el-table-column
            prop="like_count"
            label="点赞数量"
            width="180">
        </el-table-column>
        <el-table-column
            prop="pubdate"
            label="评论日期"
            width="180"
            >
            <template slot-scope="scope">
                {{ scope.row.pubdate | dateFormat }}
            </template>
        </el-table-column>
        <el-table-column
            prop="reply_count"
            label="是否推荐"
            width="180"
            >
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.is_top"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="onTop(scope.row)">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
            prop="reply_count"
            label="回复数量"
            width="180">
        </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
// import moment from 'moment'
// import format from 'path'
export default {
  name: 'asd',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comments: []
    }
  },
  // 实力选项：过滤器
  // 全局：任何组件都可以
  // 局部：只能用在当前组件
  // 它的作用就是：常用于一些简单的文本格式化，例如日期格式化处理
  // 过滤器函数可以直接在模板中调用
  // 调用方式：{{数据|过滤器函数}}
  //   filters: {
  //     dateFormat (value) {
  //       return moment(value).format('YYYY-MM-DD HH:mm:ss')
  //     }
  //   },
  created () {
    this.loadComments()
  },
  methods: {
    loadComments () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          source: this.articleId
        }
      }).then(res => {
        console.log(res)
        const comments = res.data.data.results
        // comments.forEach(item => {
        //   item.pubdate = moment(item.pubdate).format('YYYY-MM-DD HH:mm:ss')
        // })
        this.comments = comments
      }).catch(err => {
        console.log(err)
        this.$message.error('获取数据失败')
      })
    },
    onTop (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`,
        data: {
          sticky: comment.is_top
        }
      }).then(res => {
        console.log(res.data)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      }).catch(err => {
        //   console.log(err)
        this.$message.error('操作失败', err)
      })
    }
  }
}
</script>

<style>
</style>
