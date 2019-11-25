<template>
  <div>
    <el-card class="box-card">
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="800"></el-table-column>
        <el-table-column label="评论状态" width="100">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="onStatusChange(scope.row)"
                >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="100"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数" width="100"></el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-button type='primary' @click="$router.push('/comment/'+scope.row.id)">修改</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      })
        .then(res => {
          console.log(res.data)
          this.articles = res.data.data.results
        })
        .catch(err => {
          console.log(err, '获取失败')
        })
    },
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    }
  }
}
</script>

<style>
</style>
