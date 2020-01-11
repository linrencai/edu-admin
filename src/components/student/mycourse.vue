<template>
  <el-card>
    <my-bread level1="课程管理" level2="我的课程"></my-bread>
    <h4>系统消息列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="curriculum.name" label="课程名称" width="220" align="center"></el-table-column>
      <el-table-column prop="curriculum.intro" label="课程介绍" width="220" align="center"></el-table-column>
      <el-table-column prop="curriculum.createTime" label="创建时间" width="220" align="center"></el-table-column>
      <el-table-column prop="teacher.name" label="课程教师" width="240" align="center"></el-table-column>

      <el-table-column fixed="right" label="操作" width="420">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="gochartarea(scope.$index,list)"
            type="success"
            size="small"
            class="mr_bot"
          >讨论区</el-button>
          <el-button class="mr_bot" @click.native.prevent="register(scope.$index,list)" type="primary" size="small">签到</el-button>
        <el-button
            @click.native.prevent="goCourseList(scope.$index,list)"
            type="warning"
            size="small"
            class="mr_bot"
          >查看课程</el-button>
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
      }
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
      console.log(this.form);
      const res = await this.$http.post("curriculum/qcfs", this.form);
      console.log(res.data);
      // if (res.status == 200) {
      this.list = res.data.cList;
      // }
    },
    gochartarea(index, rows) {
      const cuId = rows[index].curriculum.id;
      this.$router.push({ name: "chartarea", params: { cuId } });
    },
    goCourseList(index,rows){
      console.log(rows[index].curriculum.id)
      const cuId = rows[index].curriculum.id;
      this.$router.push( {name: 'stucourselist',params:{ cuId }})
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
    }
  },
  created() {
    this.getMsgList();
  }
};
</script>

<style>
.mr_bot {
  margin-bottom: 10px;
}
</style>