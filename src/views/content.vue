<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- <el-select placeholder="请选择" v-model="form.channel_id">
            <el-option label="所有频道" :value='null'></el-option>
            <el-option :label="channel.name" :value="channel.id" v-for="channel in channels"
            :key="channel.id"></el-option> -->
            <ChannelSelect v-model="form.channel_id"></ChannelSelect>
          <!-- </el-select> -->
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="rangeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="loadAeticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{sum}}篇符合内容的文章</span>
      </div>
      <el-table :data="articles" style="width: 100%" v-loading='loading'>
        <el-table-column prop label="封面" width="180">
          <template slot-scope="scope">
            <img width="100" :src="scope.row.cover.images[0]" alt />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <!-- <span >{{articleStatus[scope.row.status].label}}</span> -->
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{articleStatus[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click.native="onDelete(scope.row.id)">删除</el-button>
            <el-button type="primary" @click="$router.push('/publish/'+scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <br>
      <el-pagination background
      layout="prev, pager, next"
      :total="sum"
      @current-change='onPageChange'
      :disabled="loading"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import ChannelSelect from '../components/channel'
export default {
  components: {
    ChannelSelect
  },
  name: 'abc',
  data () {
    return {
      loading: true,
      sum: 1,
      form: {
        status: null,
        channel_id: null
        // begin_pubdate: '',
        // end_pubdate: ''
      },
      rangeDate: [],
      articles: [],
      articleStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ]
      // channels: []
    }
  },
  created () {
    this.loadAeticles(1)
    // this.loadChannels()// 加载频道列表
  },
  methods: {
    loadAeticles (a) {
      this.loading = true
      // const token = window.localStorage.getItem('user')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        // Authorization: `Bearer ${token}`
        // },
        params: {
          status: this.form.status, // 文章状态
          channel_id: this.form.channel_id, // 频道id
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null, // 结束时间
          page: a,
          per_page: 10
        }
      }).then(res => {
        this.articles = res.data.data.results
        this.sum = res.data.data.total_count
      }).catch(err => {
        console.log(err, '失败')
      }).finally(() => {
        this.loading = false
      })
    },
    onPageChange (a) {
      this.loadAeticles(a)
    },
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     console.log(res)
    //     this.channels = res.data.data.channels
    //   }).catch(err => {
    //     console.log(err, '失败2')
    //   })
    // },
    onDelete (articleID) {
      // console.log(articleID)
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleID}`
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  }
}
</script>

<style>
</style>
