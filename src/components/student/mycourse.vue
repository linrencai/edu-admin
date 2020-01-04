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
      
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="gochartarea(scope.$index,list)"
            type="text"
            size="small"
          >进入讨论区</el-button>
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
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
        console.log(this.form)
      const res = await this.$http.post("curriculum/qcfs", this.form);
      console.log(res.data)
      // if (res.status == 200) {
      this.list = res.data.cList;
      // }
    },
    gochartarea(index,rows){
      const cuId = rows[index].curriculum.id;
      this.$router.push( {name: 'chartarea',params:{ cuId }})
    }
  },
  created() {
    this.getMsgList();
  }
};
</script>

<style>
</style>