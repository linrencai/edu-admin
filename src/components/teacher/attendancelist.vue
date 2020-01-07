<template>
  <el-card>
    <my-bread level1="课程管理" level2="课程出勤统计"></my-bread>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="stuName" label="学生姓名" width="150" align="center"></el-table-column>
      <el-table-column prop="cCount" label="迟到" width="150" align="center"></el-table-column>
      <el-table-column prop="kCount" label="旷课" width="150" align="center"></el-table-column>
      <el-table-column prop="qCount" label="请假" width="150" align="center"></el-table-column>
      <el-table-column prop="zCount" label="正常" width="150" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>
<script>
// import catlist from '@/assets/city_data2017_element.js'
export default {
  data() {
    return {
         dialogFormVisible: false,
          form2: {
          status: '',
        },
        formLabelWidth: '120px',
      list: [],
      form: {
        courseId: null
      },
      stuCourseLogId:null
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
      const res = await this.$http.post(
        "CurriculumLog/studentAttendCount",
        this.form
      );
      console.log(res);
      if (res.status == 200) {
        this.list = res.data.list;
      }
    }
  },
  mounted() {
    this.getMsgList();
  },
  created() {
    this.form.courseId = this.$route.params.cuId;
  }
};
</script>

<style>
</style>