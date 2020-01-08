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

      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="goStudentList(scope.$index,list)"
            type="primary"
            size="small"
            class="mr_bot10"
          >学生列表</el-button>
          <el-button
            @click.native.prevent="goupload(scope.$index,list)"
            type="info"
            size="small"
            class="mr_bot10"
          >上传文件</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// import catlist from '@/assets/city_data2017_element.js'
export default {
  data() {
    return {
      list: [],
      form: {
        select: "MC"
      },
      cuId: null,
      fileList: [],
      uploadUrl: "fileStream/fileUpload",
      homeworkUpload: {
        fileType: "作业",
        currimlumLogId: null
      },
      courseUpload: {
        fileType: "课件",
        currimlumLogId: null
      }
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
      console.log(this.form);
      const formdata = {
        courseId: this.cuId
      };
      const res = await this.$http.post(
        "CurriculumLog/queryCurriculumLog",
        formdata
      );
      console.log(res.data);
      // if (res.status == 200) {
      this.list = res.data.list;
      // }
    },
    goStudentList(index, rows) {
      const cuId = rows[index].id;
      this.$router.push({ name: "studentlist", params: { cuId } });
    },
    async register(index, rows) {
      const cuId = rows[index].curriculum.id;
      const formdata = {
        courseLogId: cuId,
        stuCourceState: "正常"
      };
      const res = await this.$http.post(
        "CurriculumLog/addStudentCurriculumLog",
        formdata
      );
      if (res.data.code == 1) {
        this.$message.success("签到成功！");
      }
    },
    // async uploadCourseFile(index, rows) {
    //   const cuId = rows[index].curriculum.id;
    //   const formdata = {
    //     fileType: "课件",
    //     currimlumLogId: cuId
    //   };
    //   const res = await this.$http.post("fileStream/fileUpload", formdata);
    //   console.log(res);
    // },
    // async uploadHomeworkFile(index, rows) {
    //   const cuId = rows[index].curriculum.id;
    //   const formdata = {
    //     fileType: "作业",
    //     currimlumLogId: cuId
    //   };
    //   const res = await this.$http.post("fileStream/fileUpload", formdata);
    //   console.log(res);
    // },
    goupload(index,rows){
      const cuId = rows[index].id;
      console.log(cuId)
      this.$router.push( {name: 'uploadfile',params:{ cuId }})
    }
  },
  mounted() {
    this.getMsgList();
  },
  created() {
    this.cuId = this.$route.params.cuId;
  }
};
</script>

<style>
</style>