<template>
  <div class="config">
    <node v-show="type === 'node'" />
    <!--    <config-edge v-show="type === 'edge'" />-->
  </div>
</template>

<script lang="ts">
import node from "../changeNode/node/index.vue";
import FlowGraph from "../../Graph";
import { defineComponent, ref, provide } from 'vue';
import {globalGridAttr} from "../../Graph/global";

export default defineComponent({
  name: 'inDex',
  components: {
    node,
  },
  setup() {
    const type = ref('grid');
    const id = ref('');
    const boundEvent = function (): void {
      const { graph } = FlowGraph;
      graph.on('blank:click', () => {
        type.value = 'grid';
      });
      graph.on('cell:click', ({ cell }) => {
        type.value = cell.isNode() ? 'node' : 'edge';
        id.value = cell.id;
        // console.log(type.value,'99999999999999999999999999999');
      });
    };
    boundEvent();
    //全局通信
    provide('globalGridAttr', globalGridAttr);
    provide('id', id);

    return {
      type,
      id,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    padding-left: 16px;
    padding-right: 32px;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
    position: relative;
    color: rgb(0 0 0 / 45%);
  }

  .content {
    display: flex;
    height: calc(100% - 48px);

    .sider {
      position: relative;
      width: 290px;
      //height: 100%;
      height: 650px;
      border-right: 1px solid rgb(0 0 0 / 8%);
    }

    .panel {
      height: 100%;

      .toolbar {
        display: flex;
        align-items: center;
        height: 38px;
        background-color: #f7f9fb;
        border-bottom: 1px solid rgb(0 0 0 / 8%);
      }
    }

    .config {
      box-sizing: border-box;
      width: 290px;
      height: 100%;
      padding: 0 10px;
      border-left: 1px solid rgb(0 0 0 / 8%);
    }
  }
}


</style>
