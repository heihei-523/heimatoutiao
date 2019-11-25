<template>
  <div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>素材管理</span>
            <el-upload
              style="float: right; padding: 3px 0"
              class="upload-demo"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :headers="uploadHeaders"
              name="image"
              :on-success="onUploadSuccess"
              :show-file-list="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button
              style="float: right; margin-right:10px;"
              type="success"
              @click="onUpload"
            >自己请求上传图片</el-button>
            <input type="file" hidden ref="file" @change="onFileChange">
        </div>
         <div>
            <el-radio-group v-model="type" @change="onFind">
            <el-radio-button label="全部">全部</el-radio-button>
            <el-radio-button label="收藏">收藏</el-radio-button>
            </el-radio-group>
        </div>
        <el-row :gutter="20">
            <el-col :xs="24"
            :sm="12"
            :md="4"
            v-for="item in images"
            :key="item.id"
            style="margin-bottom:20px"
            class="col-item"
            >
                <el-card :body-style="{ padding: '0px' }" style="text-align: center">
                    <img :src="item.url" height="200">
                    <div style="padding: 14px;" class="action">
                        <i :class="item.is_collected ? 'el-icon-star-on':'el-icon-star-off'"
                        @click="onCollect(item)"
                        ></i>
                        <i class="el-icon-delete-solid" @click="onDelete(item)"></i>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('user')
export default {
  name: 'qqq',
  data () {
    return {
      images: [],
      type: '全部',
      uploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect
        }
      }).then(res => {
        this.images = res.data.data.results
      }).catch(err => {
        console.log(err)
      })
    },
    onFind (value) {
      this.loadImages(value !== '全部')
    },
    onCollect (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        item.is_collected = !item.is_collected
      }).catch(err => {
        console.log(err)
      })
    },
    // onDelete (item) {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     // 确定执行
    //     this.$axios({
    //       method: 'DELETE',
    //       url: `/user/images/${item.id}`
    //     }).then(res => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功'
    //       })

    //       // 更新列表
    //       this.loadImages(this.type !== '全部')
    //     }).catch(err => {
    //       console.log(err)
    //       this.$message.error('删除失败')
    //     })
    //   }).catch(() => {
    //     // 取消执行
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // }
    // onDelete (item) {
    //   this.$axios({
    //     method: 'DELETE',
    //     url: `/user/images/${item.id}`
    //   }).then(res => {
    //     // console.log(res, 123)
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功'
    //     })
    //     // this.loadImages(this.type !== '全部')
    //   }).catch(err => {
    //     console.log(err)
    //     this.$message.error('删除失败')
    //   })
    // }
    onDelete (item) {
      this.$axios({
        method: 'DELETE',
        url: `/user/images/${item.id}`
      }).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // this.loadImage(this.page)
      }).catch((e) => {
        this.$message.error('删除失败')
      })
    },
    onUploadSuccess () {
      this.loadImages(this.type !== '全部')
    },
    onUpload () {
      this.$refs.file.click()
    },
    onFileChange () {
      const fileObj = this.$refs.file.files[0]
      const FormDat = new FormData()
      // console.log(fileObj)
      FormDat.append('image', fileObj)
      this.$axios({
        method: 'POST',
        url: '/user/images',
        data: FormDat
      }).then(res => {
        console.log(res)
        this.loadImages(this.type !== '全部')
      }).catch(err => {
        console.log(err)
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style scoped lang='less'>
.col-item{
    margin-bottom: 20px;
    .action {
        display: flex;
        justify-content: center;
        font-size: 24px;
    }
}
</style>
