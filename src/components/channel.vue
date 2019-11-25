<template>
  <div class="channel">
      <el-select placeholder="请选择" :value="value" @input="$emit('input',$event)">
        <el-option label="所有频道" :value="null"></el-option>
        <el-option
          :label="channel.name"
          :value="channel.id"
          v-for="channel in channels"
          :key="channel.id"
        ></el-option>
      </el-select>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  data () {
    return {
      channels: []
    }
  },
  props: ['value'],
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '失败2')
      })
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style scoped>
</style>
