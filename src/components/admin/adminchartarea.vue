<template>
  <el-card>
    <my-bread level1="课程管理" level2="讨论区"></my-bread>
    
    <h4>讨论区详情</h4>
    <div class="chart">
        <div class="chartitem" v-for="item in list" :key="item.discuss.id">
            <div class="itemleft" v-if="item.role.role == 'STU'">{{item.role.stuStudyNumber}}(学号)：</div>
            <div class="itemleft" v-else>{{item.role.name}}(老师):</div>
            <div class="itemright">{{item.discuss.content}}</div>
            <div class="delbtn" @click.prevent="deleteitem(item.discuss.id)">删除</div>
        </div>
    </div>
  </el-card>
</template>

<script>
// import catlist from '@/assets/city_data2017_element.js'
export default {
  data() {
    return {
      list: [],
      input:'',
      cuId:null
    };
  },
  methods: {
    // 获取列表数据
    async getMsgList() {
        const formdata = {
            cuId:this.cuId
        }
        console.log(formdata)
      const res = await this.$http.post("discuss/queryDiscuss", formdata);
      console.log(res.data)
      // if (res.status == 200) {
      this.list = res.data.dtoList;
      // }
    },
    async deleteitem(id){
        const formdata = {
            disId:id
        }
        console.log(id)
         const res = await this.$http.post("/discuss/delDiscuss", formdata);
      console.log(res.data)
    }
   
  },
  created() {
    this.cuId = this.$route.params.cuId;
  },
  mounted(){
    this.getMsgList();
  }
};
</script>

<style>
.chart {
    max-height: 80vh;
    overflow-y: auto;
}
.chartitem {
    display: flex;
    align-content: flex-start;
    min-height: 30px;
    line-height: 30px;
    padding: 10px 20px;
    margin: 20px 0;
    border-radius: 12px;
    background-color: #f2f2f2;
    position: relative;
}
.itemleft {
    padding-right: 20px;
    font-weight: bold;
    min-width: 160px;
    width:160px;
}
.chart {
    background-color: #ddd;
    padding: 20px;
    border-radius: 12px;
}
.itemright {
    line-height: 24px;
    padding-right: 2em;
}
.delbtn {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    position: absolute;
    bottom: 1em;
    right: 1em;
}
.delbtn:hover {
    color: rgb(243, 33, 33);
}
</style>