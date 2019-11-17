<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
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
            <el-select placeholder="请选择" v-model="article.channel_id">
              <el-option label="所有频道" :value="null"></el-option>
              <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="channel in channels"
                :key="channel.id"
              ></el-option>
            </el-select>
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
export default {
  name: 'Publish',
  components: {
    quillEditor
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
      channels: [],
      editorOption: {}
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.article
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err, '失败')
        })
    },
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      })
        .then(res => {
          console.log(res)
          this.channels = res.data.data.channels
        })
        .catch(err => {
          console.log(err, '失败2')
        })
    }
  }
}
</script>

<style>
</style>
