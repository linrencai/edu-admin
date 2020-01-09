<template>
  <el-card>
    <my-bread level1="课程管理" level2="我的课程"></my-bread>
    <h4>系统消息列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500" border>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="state" label="课程状态" width="80" align="center"></el-table-column>
      <el-table-column prop="notice" label="课程备注" width="240" align="center"></el-table-column>
      <el-table-column prop="taskTime" label="考试时间" width="200" align="center"></el-table-column>
      <el-table-column prop="time" label="课程时间" width="200" align="center"></el-table-column>

      <el-table-column fixed="right" label="操作" width="340" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            @click.native.prevent="goStudentList(scope.$index,list)"
            type="primary"
            size="small"
            class="mr_bot10"
          >学生列表</el-button> -->
          <el-button
            @click.native.prevent="goupload(scope.$index,list)"
            type="info"
            size="small"
            class="mr_bot10"
          >提交作业</el-button>
          <!-- <el-button
            @click.native.prevent="showDia(scope.$index,list)"
            type="success"
            size="small"
            class="mr_bot10"
          >设置作业最晚提交时间</el-button> -->
          <el-button
            @click.native.prevent="checkFile(scope.$index,list)"
            type="warning"
            size="small"
            class="mr_bot10"
          >下载课件/作业</el-button>
          <!-- <el-button
            @click.native.prevent="checkHomework(scope.$index,list)"
            type="warning"
            size="small"
            class="mr_bot10"
          >查看学生作业</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="最晚作业提交时间" :visible.sync="dialogFormVisible" align="center" >
      <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="setTime">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
// import catlist from '@/assets/city_data2017_element.js'
export default {
  data () {
    return {
      dialogFormVisible: false,
      courseLogId: '',
      list: [],
      value1: '',
      form: {
        select: 'MC'
      },
      cuId: null,
      fileList: [],
      uploadUrl: 'fileStream/fileUpload',
      homeworkUpload: {
        fileType: '作业',
        currimlumLogId: null
      },
      courseUpload: {
        fileType: '课件',
        currimlumLogId: null
      }
    }
  },
  methods: {
    // 获取列表数据
    async getMsgList () {
      console.log(this.form)
      const formdata = {
        courseId: this.cuId
      }
      const res = await this.$http.post(
        'CurriculumLog/queryCurriculumLog',
        formdata
      )
      console.log(res.data)
      // if (res.status == 200) {
      this.list = res.data.list
      // }
    },
    showDia (index, rows) {
      this.dialogFormVisible = true
      this.courseLogId = rows[index].id
    },
    goStudentList (index, rows) {
      const cuId = rows[index].id
      this.$router.push({ name: 'studentlist', params: { cuId } })
    },
    async register (index, rows) {
      const cuId = rows[index].curriculum.id
      const formdata = {
        courseLogId: cuId,
        stuCourceState: '正常'
      }
      const res = await this.$http.post(
        'CurriculumLog/addStudentCurriculumLog',
        formdata
      )
      if (res.data.code == 1) {
        this.$message.success('签到成功！')
      }
    },
    async setTime () {
      this.dialogFormVisible = false
      const formdata = {
        courseLogId: this.courseLogId,
        hwCommitTime: this.value1
      }
      const res = await this.$http.post('CurriculumLog/editHomeworkTime', formdata)
      console.log(res)
      if (res.data.code == 1) {
        this.$message.success('设置成功！')
      } else {
        this.$message.warning('设置失败')
      }
    },
    goupload (index, rows) {
      const cuId = rows[index].id
      console.log(cuId)
      this.$router.push({name: 'stuuploadhomework', params: { cuId }})
    },
    checkFile (index, rows) {
      const cuId = rows[index].id
      this.$router.push({ name: 'filelist', params: { cuId } })
    },
    checkHomework (index, rows) {
      const cuId = rows[index].id
       this.$router.push({ name: 'homeworklist', params: { cuId } })
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
