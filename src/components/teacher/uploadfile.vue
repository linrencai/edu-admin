<template>
  <el-card>
    <my-bread level1="课程管理" level2="文件上传"></my-bread>
    <div class="mr_top">
    <el-upload
      :action="uploadUrl"
      :on-change="handleChange"
      :data="courseUpload"
      :file-list="fileList1"
    >
    
      <el-button size="small" type="primary">点击上传课件</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    </div>
    <div class="mr_top">
    <el-upload
      :action="uploadUrl"
      :on-change="handleChange"
      :data="homeworkUpload"
      :file-list="fileList2"
    >
      <el-button size="small" type="primary">点击上传作业</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    </div>
  </el-card>
</template>

<script>
// import catlist from '@/assets/city_data2017_element.js'
export default {
  data() {
    return {
      fileList1: [],
      fileList2: [],
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
    async uploadCourseFile(index, rows) {
      const cuId = rows[index].curriculum.id;
      const formdata = {
        fileType: "课件",
        currimlumLogId: cuId
      };
      const res = await this.$http.post("fileStream/fileUpload", formdata);
      console.log(res);
    },
    async uploadHomeworkFile(index, rows) {
      const cuId = rows[index].curriculum.id;
      const formdata = {
        fileType: "作业",
        currimlumLogId: cuId
      };
      const res = await this.$http.post("fileStream/fileUpload", formdata);
      console.log(res);
    },
    handleChange(file, fileList) {
      }
  },
  created() {
    this.homeworkUpload.currimlumLogId = this.$route.params.cuId;
    this.courseUpload.currimlumLogId = this.$route.params.cuId;
  }
};
</script>

<style>
.mr_top {
    margin-top: 20px;
}
</style>