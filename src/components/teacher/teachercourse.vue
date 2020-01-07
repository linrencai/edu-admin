<template>
  <el-card>
    <my-bread level1="课程管理" level2="我的课程"></my-bread>
    <h4>新增课程</h4>
    <el-form
      ref="form"
      :model="form"
      label-width="6em"
      label-position="left"
      style="margin-top:30px;"
      :inline="true"
    >
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="课程介绍" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <h4>系统消息列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="name" label="课程名称" width="220" align="center"></el-table-column>
      <el-table-column prop="intro" label="课程介绍" width="220" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="220" align="center"></el-table-column>

      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="gochartarea(scope.$index,list)"
            type="primary"
            size="small"
            class="mr_bot10"
          >进讨论区</el-button>
          <el-button
            @click.native.prevent="release(scope.$index,list)"
            type="success"
            size="small"
            class="mr_bot10"
          >发布通知</el-button>
          <el-button
            @click.native.prevent="goCourseList(scope.$index,list)"
            type="warning"
            size="small"
            class="mr_bot10"
          >查看课表</el-button>
          <el-button
            @click.native.prevent="goAttendanceList(scope.$index,list)"
            type="info"
            size="small"
            class="mr_bot10"
          >考勤统计</el-button>
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
        name: "",
        intro:""
      },
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
      const res = await this.$http.post("curriculum/qcft", this.form);
      // if (res.status == 200) {
      this.list = res.data.cList;
      // }
    },
    async onSubmit() {
      const res = await this.$http.post(
        "curriculum/addCurriculum",
        this.form
      );
      console.log(res);
      if (res.status == 200) {
        if (res.data.retCode == "KC0000") {
          this.$message.success(res.data.retMsg);
          this.form = {
            title: "",
            content: ""
          };
          this.getMsgList();
        } else {
          this.$message.warning(res.data.retMsg);
        }
      }
    },
    gochartarea(index,rows){
      const cuId = rows[index].id;
      this.$router.push( {name: 'teacherchartarea',params:{ cuId }})
    },
    
    goCourseList(index,rows){
      const cuId = rows[index].id;
      this.$router.push( {name: 'teacourselist',params:{ cuId }})
    },
    goAttendanceList(index,rows){
      const cuId = rows[index].id;
      this.$router.push( {name: 'attendancelist',params:{ cuId }})
    }
    ,
     release(index,rows){
      const cuId = rows[index].id;
      this.$prompt('请输入通知内容', '发布通知', {
          confirmButtonText: '发布',
          cancelButtonText: '取消'
        }).then(async ({ value }) => {
          const formdata = {
            courseId:cuId,
            CurriculumLogNotice:value
          }
          const res = await this.$http.post("CurriculumLog/addCurriculumLog", formdata);
          console.log(res.data)
          if(res.data.code == 1){
            this.$message({
              type: 'success',
              message: '发布成功！'
            });
          }
        }).catch(() => {
               
        });
    }
  },
  created() {
    this.getMsgList();
  }
};
</script>

<style>
.mr_bot10 {
  margin-bottom:10px;
}
</style>