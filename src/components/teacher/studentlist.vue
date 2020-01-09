<template>
  <el-card>
    <my-bread level1="课程管理" level2="学生作业"></my-bread>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="student.stuStudyNumber" label="学号" width="220" align="center"></el-table-column>
      <el-table-column prop="student.stuPhone" label="手机号" width="220" align="center"></el-table-column>
      <el-table-column prop="student.stuEmail" label="邮箱" width="220" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" width="240" align="center"></el-table-column>

      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="showDia(scope.$index,list)"
            type="primary"
            size="small"
          >选择签到状态</el-button>
          <el-button
            @click.native.prevent="checkHomework(scope.$index,list)"
            type="success"
            size="small"
            class="mr_bot10"
          >查看学生作业</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="考勤状态" :visible.sync="dialogFormVisible">
  <el-form :model="form2">
    <el-form-item label="考勤状态" :label-width="formLabelWidth">
      <el-select v-model="form2.status" placeholder="请选择考勤状态">
        <el-option label="出席" value="出席"></el-option>
        <el-option label="迟到" value="迟到"></el-option>
        <el-option label="请假" value="请假"></el-option>
        <el-option label="旷课" value="旷课"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRow">确 定</el-button>
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
      form2: {
        status: ''
      },
      formLabelWidth: '120px',
      list: [],
      form: {
        courseLogId: null
      },
      stuCourseLogId: null
    }
  },
  methods: {
    // 获取列表数据
    async getMsgList () {
      const res = await this.$http.post(
        'CurriculumLog/queryStudentOnCourse',
        this.form
      )
      console.log(res)
      if (res.status == 200) {
        this.list = res.data.list
      }
    },
    async onSubmit () {
      console.log(this.form)
      const res = await this.$http.post(
        'studentReg/auditStudentReg',
        this.form
      )
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
    showDia (index, rows) {
      this.dialogFormVisible = true
      this.stuCourseLogId = rows[index].id
    },
    async editRow () {
      this.dialogFormVisible = false
      const formdata = {
        stuCourseLogId: this.stuCourseLogId,
        stuAbsentState: this.form2.status
      }
      console.log(formdata)
      const res = await this.$http.post(
        'CurriculumLog/studentAbsent',
        formdata
      )
      console.log(res.data)
      if (res.data.code == 1) {
        this.$message.success('修改签到成功！')
        this.form2.status = ''
        this.getMsgList()
      }
    },
    checkHomework (index, rows) {
      const cuId = this.form.courseLogId
       this.$router.push({ name: 'homeworklist', params: { cuId } })
    }
  },
  mounted () {
    this.getMsgList()
  },
  created () {
    this.form.courseLogId = this.$route.params.cuId
  }
}
</script>

<style>
</style>
