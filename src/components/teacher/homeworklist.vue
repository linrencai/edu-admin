<template>
  <el-card>
    <my-bread level1="课程管理" level2="学生作业"></my-bread>
    <h4>学生作业列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="fname" label="文件名称" width="220" align="center"></el-table-column>
      <!-- <el-table-column prop="ftype" label="文件类型" width="100" align="center"></el-table-column> -->
      <el-table-column prop="ftime" label="上传时间" width="200" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="scoring(scope.$index,list)"
            type="primary"
            size="small"
            class="mr_bot10"
          >评分</el-button>
          <div class="mr_bot">
            <!-- <a class="downloadbtn" :href='"api/fileStream/fileDownload?"+scope.row.fuuidName+"."+scope.row.fextend' target="_blank">下载</a> -->
            <a class="downloadbtn" :href='"api/fileStream/fileDownload?fileuuid="+scope.row.fuuidName+"&filename="+scope.row.fname' target="_blank">下载</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      cuId: null,
      list: []
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
      const formdata = {
        courseLogId: this.cuId,
        fileState: "学生"
      };
      const res = await this.$http.post(
        "fileStream/selectFileIdByclId",
        formdata
      );
      console.log(res.data);
      // if (res.status == 200) {
      this.list = res.data.list;
      // }
    },
    async scoring(index, rows) {
      const cuId = rows[index].id;
      this.$prompt("请输入评分", "作业评分", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          const formdata = {
            stuCourseLogId: this.cuId,
            stuScore: value
          };
          const res = await this.$http.post(
            "CurriculumLog/studentScore",
            formdata
          );
          console.log(res.data);
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "评分已提交！"
            });
          }
        })
        .catch(() => {});
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
.mr_bot {
  margin-bottom: 10px;
}
.downloadbtn {
  display: inline-block;
  padding: 6px 15px;
  background-color: rgb(95, 92, 247);
  border-radius: 3px;
  text-decoration: none;
  color: #fff;
  transition: .1s;
}
.downloadbtn:hover {
  opacity: .7;
}
</style>
