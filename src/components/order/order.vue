<template>
  <el-card>
    <my-bread level1="公告管理"></my-bread>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="消息编号" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="消息标题" width="260" align="center"></el-table-column>
      <el-table-column prop="content" label="消息内容" width="500" align="center"></el-table-column>
      <el-table-column prop="issueTime" label="发布时间" width="240" align="center"></el-table-column>
      <el-table-column prop="adminId" label="发布者id" width="80" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import catlist from "@/assets/city_data2017_element.js";
export default {
  data() {
    return {
      list: [{
          id:"1",
          title:"测试标题",
          content:"测试内容",
          issueTime:"2019-12-18 23:47:32",
          adminId:"001"
      },{
         id:"2",
          title:"测试标题",
          content:"测试内容",
          issueTime:"2019-12-18 23:47:32",
          adminId:"001" 
      },{
          id:"3",
          title:"测试标题",
          content:"测试内容",
          issueTime:"2019-12-18 23:47:32",
          adminId:"001"
      }
      ],
    };
  },
  methods: {
    
    // 获取列表数据
    async getMsgList() {
      const res = await this.$http.post("sysMsg/querySysMsg");
      console.log(res);
    //   this.list = res.data.data.goods;
    }
  },
  created() {
    this.getMsgList();
  }
};
</script>

<style>
</style>
