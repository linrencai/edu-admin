<template>
  <el-card>
    <my-bread level1="课程管理" level2="我的课程"></my-bread>
    <h4>课件/作业列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="fname" label="文件名称" width="220" align="center"></el-table-column>
      <el-table-column prop="ftype" label="文件类型" width="100" align="center"></el-table-column>
      <el-table-column prop="ftime" label="上传时间" width="200" align="center"></el-table-column>
      <el-table-column prop="teacher" label="老师" width="120" align="center"></el-table-column>

      <el-table-column label="操作" fixed="right" width="240" align="center">
        <template slot-scope="scope">
          <a class="downloadbtn" :href='"fileStream/fileDownload"+scope.row.fuuidName+"."+scope.row.fextend' target="_blank">下载</a>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      cuId: null,
      list:[]
    }
  },
  methods: {
    // 获取列表数据
    async getMsgList () {
      const formdata = {
        courseLogId: this.cuId,
        fileState: '通过'
      }
      const res = await this.$http.post(
        'fileStream/selectFileIdByclId',
        formdata
      )
      console.log(res.data)
      // if (res.status == 200) {
      this.list = res.data.list
      // }
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
