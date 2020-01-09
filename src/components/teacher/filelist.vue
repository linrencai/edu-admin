<template>
  <el-card>
    <my-bread level1="课程管理" level2="我的课程"></my-bread>
    <h4>系统消息列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="state" label="课程状态" width="80" align="center"></el-table-column>
      <el-table-column prop="notice" label="课程备注" width="240" align="center"></el-table-column>
      <el-table-column prop="taskTime" label="考试时间" width="200" align="center"></el-table-column>
      <el-table-column prop="time" label="课程时间" width="200" align="center"></el-table-column>

      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            @click.native.prevent="goStudentList(scope.$index,list)"
            type="primary"
            size="small"
            class="mr_bot10"
          >学生列表</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      cuId: null,
      list:[]
    }
  },
  methods: {
    // 获取列表数据
    async getMsgList () {
      const formdata = {
        courseLogId: this.cuId,
        fileState: '通过'
      }
      const res = await this.$http.post(
        'fileStream/selectFileIdByclId',
        formdata
      )
      console.log(res.data)
      // if (res.status == 200) {
      this.list = res.data.list
      // }
    }
    
  },
  mounted () {
    this.getMsgList()
  },
  created () {
    this.cuId = this.$route.params.cuId
  }
}
</script>

<style>
</style>
