<template>
  <el-card>
    <my-bread level1="系统提问" level2="教师提问"></my-bread>
    <h4>向管理员提问</h4>
    <el-form
      ref="form2"
      :model="form2"
      label-width="8em"
      label-position="right"
      style="border-bottom:1px solid #ccc;"
      :inline="false"
    >
      <el-form-item label="你要提的问题" prop="content">
        <el-input type="textarea" v-model="form2.content" placeholder="请输入你向管理员提问的内容"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" @click="onSubmit2()">提交问题</el-button>
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
          <el-button
            @click.native.prevent="checkDetail(scope.$index,list)"
            type="primary"
            size="small"
            v-if="scope.row.contectAdmin.replyFlag == '1'"
          >查看回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="回复详情" :visible.sync="dialogVisible" width="40%">
      <div v-if="dialogdata == ''" >
        <h4>暂无回复</h4>
      </div>
      <div v-else style="max-height:50vh;overflow-y:scroll;background-color:#ccc;padding:20px 10px;">
        <!-- <h4>问题：{{dialogdata[0].contectAdmin.content}}</h4> -->
        <div v-for="item in dialogdata" :key="item.id" >
          <div style="margin-bottom:16px;">
            <span
              style="display:inline-block;width:4em;text-align:right;padding-right:10px;font-weight:bold;"
            >{{item.role.role == 'TEA'?'教师：':'管理员：'}}</span>
            <span>{{item.contectAdmin.content}}</span>
          </div>
        </div>
        
      </div>
      <h4>请在下面输入您想要回复的内容：</h4>
        <el-input placeholder="请输入回复内容" v-model="input" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="submitReply">提交回复</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// import catlist from '@/assets/city_data2017_element.js'
export default {
  data() {
    return {
      list: [],
       input: '',
       form2:{
           content:""
       },
      form: {
        foreignType: "STU",
        content: "",
        replyFlag: ""
      },
      dialogVisible: false,
      dialogdata: "",
      lastqusetionId:null
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
      const res = await this.$http.post("contectAdmin/qsqft");
      console.log(res)
      // if (res.status == 200) {
      this.list = res.data.contectAdminList;
      // }
    },
    async onSubmit2() {
      console.log(this.form2);
      const res = await this.$http.post("contectAdmin/teaSysQuestion", this.form2);
      console.log(res.data)
      if(res.data.retCode == 'CONADM0000'){
          this.getMsgList()
          this.$message.success(res.data.retMsg);
      }else {
          this.$message.warning(res.data.retMsg);
      }
      
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
      this.dialogVisible = true;
      const status = rows[index].status;
      const replyFlag = rows[index].contectAdmin.replyFlag;
      const pid = rows[index].contectAdmin.id;
      if (replyFlag == "0") {
        this.$message.warning("暂无回复内容");
        return false;
      }
      const formdata = {
        pid: pid
      };
      const res = await this.$http.post("contectAdmin/qsqr", formdata);
      this.dialogdata = res.data.contectAdminList;
      const lastqusetionId = res.data.contectAdminList[0].contectAdmin.id
      this.lastqusetionId = lastqusetionId
    },
    async submitReply(){
      const formdata = {
        pid: this.lastqusetionId,
        content:this.input
      };
      console.log(formdata)
      const res = await this.$http.post(
            "contectAdmin/teaReplySysMsg",
            formdata
          );
       this.dialogVisible = false;
       if(res.data.retCode == 'CONADM0000'){
          this.$message.warning("消息发送成功");
          this.input = ''
          this.getMsgList();
       }else {
         this.$message.warning("回复失败");
       }
        
    }
  },
  created() {
    this.getMsgList();
  }
};
</script>

<style>
</style>