<template>
  <el-card>
    <my-bread level1="公告查看" level2="公告列表"></my-bread>
    <h4>系统消息列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <!-- <el-table-column prop="id" label="消息编号" width="80" align="center"></el-table-column> -->
      <el-table-column prop="title" label="消息标题" width="260" align="center"></el-table-column>
      <el-table-column prop="content" label="消息内容" width="600" align="center"></el-table-column>
      <el-table-column prop="issueTime" label="发布时间" width="240" align="center"></el-table-column>
      <el-table-column prop="adminId" label="发布者id" width="80" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// import catlist from '@/assets/city_data2017_element.js'
export default {
  data () {
    return {
      list: [],
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    // 获取列表数据
    async getMsgList () {
      const res = await this.$http.post('sysMsg/querySysMsg', this.form)
      console.log(res)
      if (res.status == 200) {
        this.list = res.data.sysMsgList
      }
    }
  },
  created () {
    this.getMsgList()
  }
}
</script>

<style>
</style>
