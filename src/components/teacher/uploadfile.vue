
<template>
  <el-card>
    <my-bread level1="课程管理" level2="文件上传"></my-bread>
    <div class="mr_top">
      <form id="form1" enctype="application/json;charset=UTF-8">
        <input type="file" name="myfile" />
        <br />
        <button type="button" @click="addFile()">上传</button>
      </form>
      <meter value="0" max="1000" style="width:500px" id="myMeter"></meter>
      <h1>文件下载</h1>
      <a href="file/fileDownload?filename=c7bccc4f-6a87-4c68-9307-9175045930f7.mp4">下载</a>
      <div id="asd">内容获取了</div>
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
      console.log($('#asd').text())
      // eslint-disable-next-line no-undef
      var form = $('#form1')[0]
      var formData = new FormData(form)
      formData.append('currimlumLogId', this.currimlumLogId)
      formData.append('fileType', '作业')
      console.log(this.currimlumLogId)
      console.log(form)
      $.ajax({
        url: 'api/fileStream/fileUpload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        // contentType: 'application/json;charset=UTF-8',
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
