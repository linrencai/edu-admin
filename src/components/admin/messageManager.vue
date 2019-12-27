<template>
  <el-card>
    <my-bread level1="公告管理"></my-bread>
    <el-form
      ref="form"
      :model="form"
      label-width="10em"
      label-position="left"
      style="margin-top:30px;"
    >
      <el-form-item label="系统消息标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="系统消息内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <h4>系统消息列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50"></el-table-column>
      <!-- <el-table-column prop="id" label="消息编号" width="80" align="center"></el-table-column> -->
      <el-table-column prop="title" label="消息标题" width="260" align="center"></el-table-column>
      <el-table-column prop="content" label="消息内容" width="600" align="center"></el-table-column>
      <el-table-column prop="issueTime" label="发布时间" width="240" align="center"></el-table-column>
      <el-table-column prop="adminId" label="发布者id" width="80" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index,list)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
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
    },
    async onSubmit () {
      console.log(this.form)
      const res = await this.$http.post('sysMsg/addSysMsg', this.form)
      console.log(res)
      if (res.status == 200) {
        if (res.data.retCode == 'SYSMSG0000') {
          this.$message.success(res.data.retMsg)
          this.form = {
            title: '',
            content: ''
          }
          this.getMsgList()
        } else {
          this.$message.warning(res.data.retMsg)
        }
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async deleteRow (index, rows) {
      const msgId = rows[index].id
      const sysMsgId = {
        sysMsgId: msgId
      }
      const res = await this.$http.post('sysMsg/delSysMsg', sysMsgId)
      if (res.status == 200) {
        rows.splice(index, 1)
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
