<template>
  <div class="bar">
    <el-tooltip placement="bottom">
      <el-button @click="copy" class="item-space">复制</el-button>
    </el-tooltip>
    <el-tooltip placement="bottom">
      <el-button @click="cut" class="item-space">剪切</el-button>
    </el-tooltip>
    <el-tooltip placement="bottom">
      <el-button @click="paste" class="item-space">粘贴</el-button>
    </el-tooltip>
    <el-tooltip placement="bottom">
      <el-button @click="undo" class="item-space">撤回</el-button>
    </el-tooltip>
    <el-tooltip placement="bottom">
      <el-button @click="toJS" class="item-space">导出为JSON</el-button>
    </el-tooltip>
    <el-tooltip placement="bottom">
      <el-button @click="toSVG" class="item-space">导出为SVG</el-button>
    </el-tooltip>
    <el-tooltip placement="bottom">
      <el-button @click="toPNG" class="item-space">导出为PNG</el-button>
    </el-tooltip>
    <el-button @click="post1">post</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {DataUri} from "@antv/x6";
import axios from "axios";
import FlowGraph from "../Graph";

export default defineComponent({
  name: 'toolBar',
  components: {},
  setup() {
    //记录初始画布和最初状态
    const {graph} = FlowGraph;
    const {history} = graph;

    const canUndo = ref(history.canUndo());
    const canRedo = ref(history.canRedo());

    //复制
    const copy = () => {
      const {graph} = FlowGraph;
      const cells = graph.getSelectedCells();
      if (cells.length) {
        console.log('888888888');
        graph.copy(cells);
      }
      return false;
    };

    //剪切
    const cut = () => {
      const {graph} = FlowGraph;
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.cut(cells);
      }
      return false;
    };
    //粘贴
    const paste = () => {
      const {graph} = FlowGraph;
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({offset: 32});
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    };
    //导出toJSON
    const toJS = () => {
      const {graph} = FlowGraph;
      console.log(graph.toJSON())
      // clearData();
    }
    //撤回
    const undo = () => {
      const {graph} = FlowGraph;
      graph.history.undo();
    }
    //导出为PNG
    const toPNG = () => {
      const {graph} = FlowGraph;
      graph.toPNG((dataUri: string) => {
            DataUri.downloadDataUri(dataUri, 'now.png');
          },
          {
            backgroundColor: 'white',
            padding: {
              top: 20,
              right: 30,
              bottom: 40,
              left: 50,
            },
            quality: 1,
          },
      )
    }
    //导出为SVG
    const toSVG = () => {
      const {graph} = FlowGraph;
      graph.toSVG(
          (dataUri: string) => {
            DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'now.svg')
          }
      )
    }

    //input里面是数组
    const testTry =() =>{
      const x = {
        "user_id": "sjh",
        "external_name": "mnist",
        "service_account": "argo",
        "secrets": "sjh-sa1",
        "nodes": [
          {
            "name": "mnist",
            "container": {
              "image": "registry.cn-hangzhou.aliyuncs.com/hrtmiv2xok4kiw/k8s:cpu",
              "command": [
                "python"
              ],
              "args": [
                "main.py"
              ]
            },
            "inputs": {
              "artifacts": [
                {
                  "name": "name1",
                  "path": "/app/data",
                  "s3": {
                    "endpoint": "minio.argo:9000",
                    "bucket": "sjh-bucket1",
                    "key": "data"
                  }
                }
              ]
            },
            "outputs": {
              "artifacts": [
                {
                  "name": "name2",
                  "path": "/app/data/output.pt",
                  "archive": {
                    "none": {}
                  },
                  "s3": {
                    "endpoint": "minio.argo:9000",
                    "bucket": "sjh-bucket2",
                    "key": "output.pt"
                  }
                }
              ]
            }
          },
          {
            "name": "list",
            "container": {
              "image": "alpine:latest",
              "command": [
                "ls"
              ],
              "args": [
                "/data"
              ]
            },
            "inputs": {
              "artifacts": [
                {
                  "name": "name2",
                  "path": "/data"
                }
              ]
            }
          }
        ],
        "edges": [
          {
            "source": "mnist",
            "target": "list"
          }
        ]
      }
      return x;
    }


    const post1 = () => {
      const {graph} = FlowGraph;
      axios.post('http://10.128.185.236:7005/sendWorkflow', testTry()).then(res => {
        console.log(res)
      }).catch(function (error) {
        console.log(error)});
    }
    return {
      copy,
      cut,
      paste,
      toJS,
      undo,
      toSVG,
      toPNG,
      post1,
      testTry
    }
  }
})

</script>

<style lang="less" scoped>
.bar {
  margin-right: 16px;
}

.item-space {
  margin-left: 16px;
}
</style>
