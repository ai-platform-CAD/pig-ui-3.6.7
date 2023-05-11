<template>
  <toolBar/>
</template>

<script lang="ts">
import toolBar from "../../../components/DragAble/toolBar.vue";
import {defineComponent, ref, onMounted, UnwrapRef, reactive, watch} from 'vue'
import FlowGraph from "src/components/Graph"

export default defineComponent({
  name:'homeMain',
  components:{
    toolBar,
  },
  setup(){
    //总的用户信息

    //必选项与可选项 done
    //空值不传
    //‘’号问题->“”  done
    //数组
    const toJS = () => {
      // const {graph} = FlowGraph;
      // console.log(graph.toJSON())

      // console.log(info);
      // console.log(userM);



      }




    return{

      toJS,
    };
  },
});

</script>



<!--<script>-->
<!--import { fetchList, delObj } from "@/api/gendatasourceconf";-->
<!--import TableForm from "./gendatasourceconf-form.vue";-->
<!--import { mapGetters } from "vuex";-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      dataForm: {-->
<!--        key: "",-->
<!--      },-->
<!--      dataList: [],-->
<!--      pageIndex: 1,-->
<!--      pageSize: 10,-->
<!--      totalPage: 0,-->
<!--      dataListLoading: false,-->
<!--      addOrUpdateVisible: false,-->
<!--    };-->
<!--  },-->
<!--  components: {-->
<!--    TableForm,-->
<!--  },-->
<!--  created() {-->
<!--    // this.getDataList();-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapGetters(["permissions"]),-->
<!--  },-->
<!--  methods: {-->
<!--    // 获取数据列表-->
<!--    getDataList() {-->
<!--      this.dataListLoading = true;-->
<!--      fetchList(-->
<!--        Object.assign({-->
<!--          current: this.pageIndex,-->
<!--          size: this.pageSize,-->
<!--        })-->
<!--      ).then((response) => {-->
<!--        this.dataList = response.data.data.records;-->
<!--        this.totalPage = response.data.data.total;-->
<!--      });-->
<!--      this.dataListLoading = false;-->
<!--    },-->
<!--    // 每页数-->
<!--    sizeChangeHandle(val) {-->
<!--      this.pageSize = val;-->
<!--      this.pageIndex = 1;-->
<!--      this.getDataList();-->
<!--    },-->
<!--    // 当前页-->
<!--    currentChangeHandle(val) {-->
<!--      this.pageIndex = val;-->
<!--      this.getDataList();-->
<!--    },-->
<!--    // 新增 / 修改-->
<!--    addOrUpdateHandle(id) {-->
<!--      this.addOrUpdateVisible = true;-->
<!--      this.$nextTick(() => {-->
<!--        this.$refs.addOrUpdate.init(id);-->
<!--      });-->
<!--    },-->
<!--    // 删除-->
<!--    deleteHandle(id) {-->
<!--      this.$confirm("是否确认删除ID为" + id, "提示", {-->
<!--        confirmButtonText: "确定",-->
<!--        cancelButtonText: "取消",-->
<!--        type: "warning",-->
<!--      })-->
<!--        .then(function () {-->
<!--          return delObj(id);-->
<!--        })-->
<!--        .then((data) => {-->
<!--          this.$message.success("删除成功");-->
<!--          this.getDataList();-->
<!--        })-->
<!--        .catch(() => {});-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
