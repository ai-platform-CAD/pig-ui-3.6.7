<template>
  <div class="wrap">

    <div class="content">
      <!--      左侧工具栏-->
      <div class="monitorTop">
        <el-tabs>
          <el-space wrap>
            <el-card v-for="i in 1" :key="i" class="box-card" style="width: 290px">
              <div class="text item" style="line-height: 200%">
                user_id
                <el-input style="width: 100%" v-model="userM.userID" ></el-input>
              </div>
              <div class="text item" style="line-height: 200%">
                external_name
                <el-input style="width: 100%" v-model="userM.externalName"></el-input>
              </div>
              <div class="text item" style="line-height: 200%">
                service_account
                <el-input style="width: 100%" v-model="userM.serviceAccount"></el-input>
              </div>
              <div class="text item" style="line-height: 200%">
                secrets
                <el-input style="width: 100%" v-model="userM.secrets"></el-input>
              </div>
              <div style="text-align: center;margin-top:10px;">
                <el-button  type="primary" @click="toJS" class="item-space">提交给后台</el-button>
              </div>
            </el-card>
            <div id="stencil" class="sider"></div>
          </el-space>
        </el-tabs>
        </div>
      <!--      流程图工具栏-->
      <div class="panel">
        <div class="toolbar">
          <tool-bar v-if="isReady"></tool-bar>
        </div>
        <!--      画板-->
        <div id="container" class="x6-graph"></div>
      </div>
      <!--      右侧工具栏-->
      <div class="config">
        <change-node v-if="isReady"></change-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '../css/reset.less'
import '../css/global.css'
import '../css/main.less'
import toolBar from "../../../components/DragAble/toolBar.vue";
import changeNode from  "../../../components/DragAble/changeNode/index.vue"
import {defineComponent, ref, onMounted, UnwrapRef, reactive, watch} from 'vue'
import FlowGraph from "../../../components/Graph"
import {clearData} from "../../../components/DragAble/dataClear";
import axios from "axios";


interface UserMessage {
  userID:any;
  externalName:any;
  serviceAccount:any;
  secrets:any;
}

const getContainerSize = () => {
  return {
    width: document.body.offsetWidth - 590,
    height: document.body.offsetHeight - 110,
  };
};

export default defineComponent({
  name:'homeMain',
  components:{
    toolBar,
    changeNode,
  },
  setup(){
    //总的用户信息
    const userM:UnwrapRef<UserMessage> = reactive({
      userID:'sjh',
      externalName:'mnist',
      serviceAccount:'argo',
      secrets:'sjh-sa1',
    })

    const isReady = ref(false);
    const initGraph = function Function(){
      const graph = FlowGraph.init();
      isReady.value = true;
      const resizeFn =() =>{
        const {width,height} = getContainerSize();
        graph.resize(width,height);
      };
      resizeFn();
      window.addEventListener('resize',resizeFn);
      return ( ) =>{
        window.removeEventListener('resize',resizeFn);
      };
    };

    onMounted(()=>{
      initGraph();
    });

    console.log(userM);
    let a = userM;
    watch([],
        ()=>{
          console.log('1')
          a.userID = userM.userID
          // console.log('88888888');
          // console.log(a);
          // console.log('888888');
        },
    )

    //必选项与可选项 done
    //空值不传
    //‘’号问题->“”  done
    //数组
    const toJS = () => {
      // const {graph} = FlowGraph;
      // console.log(graph.toJSON())
      var info = clearData();
      // console.log(info);
      // console.log(userM);

      const x= {
        "user_id":userM.userID,
        "externalName":userM.externalName,
        "serviceAccount":userM.serviceAccount,
        "secrets":userM.secrets,
        "node":info.node,
        "edge":info.edge,
      }
      console.log(x)

      //带上双引号
      var myJson = JSON.stringify(x)
      console.log(myJson)
      axios.post('http://10.128.185.236:7005/sendWorkflow',myJson).then(res =>{
        console.log(res)
      }).catch(function (error){
        console.log(error)
      })
    }

    return{
      userM,
      isReady,
      toJS,
    };
  },
});

</script>

<style lang="less" scoped>

.monitorTop {
  position: relative;
  /*vw是width of view(port)的缩写；
100vw表示百分之百的视图宽度；
123px是需要减去的宽度；
减号的两边必须都有至少一个空格*/
  height: calc(100% - 123px);
}

.monitorTop .el-tabs__item {
  font-size: 17px !important;
}
</style>
