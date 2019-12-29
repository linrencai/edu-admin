<template>
  <el-card>
    <my-bread level1="注册审核" level2="学生审核"></my-bread>
    <el-form
      ref="form"
      :model="form"
      label-width="4em"
      label-position="left"
      style="margin-top:30px;"
      :inline="true"
    >
      <el-form-item label="学号" prop="stuStudyNumber">
        <el-input v-model="form.stuStudyNumber"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="stuPhone">
        <el-input v-model="form.stuPhone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="stuEmail">
        <el-input v-model="form.stuEmail"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="选择注册状态">
          <el-option label="通过" value="PASS"></el-option>
          <el-option label="未通过" value="NOPASS"></el-option>
          <el-option label="未审核" value="PENDING"></el-option>
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
      <el-table-column prop="stuStudyNumber" label="学号" width="220" align="center"></el-table-column>
      <el-table-column prop="stuPhone" label="手机号" width="220" align="center"></el-table-column>
      <el-table-column prop="stuEmail" label="邮箱" width="220" align="center"></el-table-column>
      <el-table-column prop="regTime" label="注册时间" width="240" align="center"></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120"
        align="center"
        :filters="[{ text: '通过', value: 'PASS' }, { text: '未通过', value: 'NOPASS' }, { text: '待审核', value: 'PENDING' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status == 'PASS' ? 'success' : scope.row.status == 'NOPASS' ? 'danger' : 'info' "
            disable-transitions
          >{{scope.row.status == 'PASS' ? '已通过' : scope.row.status == 'NOPASS' ? '未通过' : '待审核' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editRow(scope.$index,list)" type="text" size="small">编辑</el-button>
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
        stuPhone: "",
        stuEmail: "",
        stuStudyNumber: "",
        status: ""
      }
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
      const res = await this.$http.post("studentReg/queryStuReg", this.form);
      console.log(res);
      if (res.status == 200) {
        this.list = res.data.stuRegList;
      }
    },
    async onSubmit() {
      console.log(this.form);
      const res = await this.$http.post(
        "studentReg/auditStudentReg",
        this.form
      );
      console.log(res);
      if (res.status == 200) {
        if (res.data.retCode == "SYSMSG0000") {
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
    filterTag(value, row) {
      return row.status === value;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    editRow(index, rows) {
      const status = rows[index].status;
      const stuRegId = rows[index].id;
      if (status != "PENDING") {
        this.$message.warning("只能操作未审核状态的学生！");
        return false;
      }
      this.$confirm("请选择修改该学生的审核状态", "操作", {
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        type: "warning"
      })
        .then(async () => {
          const formdata = {
            stuRegId: stuRegId,
            status: "PASS"
          };
          console.log(formdata);
          const res = await this.$http.post(
            "studentReg/auditStudentReg",
            formdata
          );
          if (res.data.retCode == "AUDIT0010") {
            this.$message.success(res.data.retMsg);
            this.getMsgList();
          }
          console.log(res);
        })
        .catch(async () => {
          const formdata = {
            stuRegId: stuRegId,
            status: "NOPASS"
          };
          console.log(formdata);
          const res = await this.$http.post(
            "studentReg/auditStudentReg",
            formdata
          );
          if (res.data.retCode == "AUDIT0010") {
            this.$message.success(res.data.retMsg);
            this.getMsgList();
          }
          console.log(res);
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