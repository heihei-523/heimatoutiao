<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$route.params.articleId ? '编辑文章':'发布文章'}}</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="article" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
            <quill-editor
              v-model="article.content"
              ref="myQuillEditor"
              :options="editorOption"
            ></quill-editor>
          </el-form-item>
          <el-form-item label="频道列表">
            <!-- <el-select placeholder="请选择" v-model="article.channel_id">
              <el-option label="所有频道" :value="null"></el-option>
              <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="channel in channels"
                :key="channel.id"
              ></el-option>
            </el-select> -->
            <ChannelSelect v-model="article.channel_id"></ChannelSelect>
          </el-form-item>
          <!-- <el-form-item label="封面">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit(false)">发表</el-button>
            <el-button @click="onSubmit(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import ChannelSelect from '../components/channel'
export default {
  name: 'Publish',
  components: {
    quillEditor,
    ChannelSelect
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      // channels: [],
      editorOption: {}
    }
  },
  created () {
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
    // this.loadArticle()
  },
  methods: {
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        console.log(res.data)
        this.article = res.data.data
      })
    },
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.updateArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: '发表成功'
        })
      }).catch(err => {
        console.log(err, '失败')
      })
    },
    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('错了')
      })
    }

    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   })
    //     .then(res => {
    //       console.log(res)
    //       this.channels = res.data.data.channels
    //     })
    //     .catch(err => {
    //       console.log(err, '失败2')
    //     })
    // }
  }
}
</script>

<style>
</style>
