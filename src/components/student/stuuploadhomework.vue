
<template>
  <el-card>
    <my-bread level1="课程管理" level2="提交作业"></my-bread>
    <div class="mr_top">
      <h4>作业</h4>
      <form id="form1" enctype="application/json;charset=UTF-8">
        <input type="file" name="myfile" />
        <br />
        <button type="button" @click="addFile()" class="mr_top">点击上传作业</button>
      </form>
      <meter value="0" max="1000" style="width:500px" id="myMeter"></meter>
     
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      currimlumLogId: null
    }
  },
  methods: {
    addFile: function () {
      var form = $('#form1')[0]
      var formData = new FormData(form)
      formData.append('currimlumLogId', this.currimlumLogId)
      formData.append('stuCommitState', '提交')
      $.ajax({
        url: 'api/fileStream/fileStuCommit',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
          console.log(res.data)
        },
        xhr: function () {
          // 进度条
          var myXhr = $.ajaxSettings.xhr() // ajax的对象xmlHttpRequest
          if (myXhr.upload) {
            myXhr.upload.addEventListener('progress', function (e) {
              console.log(e.loaded, e.total)
              $('#myMeter').attr('max', e.total)
              $('#myMeter').val(e.loaded)
            })
          }
          return myXhr
        },
        error: function (err) {
          console.log(err)
        }
      })
    }
    
  },
  created () {
    this.currimlumLogId = this.$route.params.cuId
    console.log(this.$route.params.cuId)
  }
}
</script>

<style>
.mr_top {
  margin-top: 20px;
}
</style>
