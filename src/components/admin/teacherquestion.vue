<template>
  <el-card>
    <my-bread level1="系统提问" level2="老师提问"></my-bread>
    <el-form
      ref="form"
      :model="form"
      label-width="8em"
      label-position="right"
      style="margin-top:30px;"
      :inline="true"
    >
      <el-form-item label="提问内容关键词" prop="content">
        <el-input v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="是否回复" prop="replyFlag">
        <el-select v-model="form.status" placeholder="选择回复状态">
          <el-option label="已回复" value="1"></el-option>
          <el-option label="未回复" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" @click="onSubmit()">查询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <h4>系统消息列表</h4>
    <el-table :data="list" style="width: 100%;" max-height="500">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="role.stuStudyNumber" label="学号" width="220" align="center"></el-table-column>
      <el-table-column prop="contectAdmin.content" label="问题描述" width="220" align="center"></el-table-column>
      <el-table-column prop="role.stuPhone" label="学生电话" width="220" align="center"></el-table-column>
      <el-table-column prop="contectAdmin.issueTime" label="提问时间" width="240" align="center"></el-table-column>
      <el-table-column
        prop="contectAdmin.replyFlag"
        label="状态"
        width="120"
        align="center"
        :filters="[{ text: '已回复', value: '1' }, { text: '未回复', value: '0' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.contectAdmin.replyFlag == '1' ? 'success' : 'danger' "
            disable-transitions
          >{{scope.row.contectAdmin.replyFlag == '1' ? '已回复' : '未回复' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="editRow(scope.$index,list)" type="text" size="small">回复</el-button> -->
          <el-button
            @click.native.prevent="checkDetail(scope.$index,list)"
            type="text"
            size="small"
          >查看回复</el-button>
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
        foreignType: "TEA",
        content: "",
        replyFlag: ""
      }
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
      const res = await this.$http.post("contectAdmin/qsqfa", this.form);
      console.log(res);
      // if (res.status == 200) {
      this.list = res.data.contectAdminList;
      // }
    },
    async onSubmit() {
      console.log(this.form);
      const res = await this.$http.post("contectAdmin/qsqfa", this.form);
      this.list = res.data.contectAdminList;
      console.log(res);
    },
    filterTag(value, row) {
      return row.contectAdmin.replyFlag === value;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    editRow(index, rows) {
      const status = rows[index].status;
      const replyFlag = rows[index].contectAdmin.replyFlag;
      const foreignId = rows[index].contectAdmin.foreignId;
      this.$prompt("请输入回复内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          const formdata = {
            pid: foreignId,
            content: value
          };
          console.log(formdata);
          const res = await this.$http.post(
            "contectAdmin/admReplySysMsg",
            formdata
          );
          if (res.data.retCode == "CONADM0000") {
            this.$message.success(res.data.retMsg);
            this.getMsgList();
          }
          console.log(res);
        })
        .catch(() => {});
    },
    async checkDetail(index, rows) {
      const status = rows[index].status;
      const replyFlag = rows[index].contectAdmin.replyFlag;
      const pid = rows[index].contectAdmin.id;
      console.log(rows);
      if (replyFlag == "0") {
        this.$message.warning("暂无回复内容");
        return false;
      }
      const formdata = {
        pid: pid
      };
      const res = await this.$http.post("contectAdmin/qsqr", formdata);
      console.log(res);
      const value = res.data.contectAdminList.map(item => {
        return item;
      });
      console.log(value);
      const questionname = res.data.contectAdminList[0].role.stuStudyNumber;
      var html =
        "<p>" +
        questionname +
        "(学号)提问：" +
        value[0].contectAdmin.content +
        "</p>";
      for (let i = 1; i < value.length; i++) {
        console.log(value[i]);
        html +=
          "<p><span>" +
          value[i].role.role +
          ":</span><span>" +
          value[i].contectAdmin.content +
          "</span><p>";
      }
      this.$alert(html, "回复列表", {
        dangerouslyUseHTMLString: true
      });
    }
  },
  created() {
    this.getMsgList();
  }
};
</script>

<style>
</style>