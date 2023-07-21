<template>
  <div class="common-layout">
    <el-card class="box-card">
      <template #header>
        <div class="row-container">
          <el-card shadow="hover">project</el-card>
          <el-card style="margin-left: auto;"><el-cascader v-model="value" :options="options" @change="handleChange" placeholder="实例状态" /></el-card>
          <el-button type="primary" class="first_buttun" @click="pageSwap">在线编辑</el-button>
        </div>
      </template>

      <el-descriptions title="设备详细信息" :column="1" direction="horizontal" border>
        <el-descriptions-item
            label="实例状态"  label-align="left" align="center" label-class-name="my-label" class-name="my-content" width="5px">
            working
            </el-descriptions-item>
        <el-descriptions-item label="深度学习框架" label-align="left" align="center">eslinst</el-descriptions-item>
        <el-descriptions-item label="关联数据集" label-align="left" align="center">L1</el-descriptions-item>
        <el-descriptions-item label="实例描述" label-align="left" align="center">
          <el-tag size="small">test</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="编码资源" label-align="left" align="center">123Province</el-descriptions-item>
        <el-descriptions-item label="训练资源" label-align="left" align="center">1</el-descriptions-item>
        <el-descriptions-item label="创建时间" label-align="left" align="center">{{currentTime}}</el-descriptions-item>
        <el-descriptions-item label="更新时间" label-align="left" align="center">{{currentTime}}</el-descriptions-item>
      </el-descriptions>

      <div class="divide-container"></div>
      <el-descriptions title="训练套件" :column="1" direction="horizontal" border>
        <el-descriptions-item
            label="实例状态"  label-align="left" align="center" label-class-name="my-label" class-name="my-content" width="5px">
            working
            </el-descriptions-item>
        <el-descriptions-item label="深度学习框架" label-align="left" align="center">eslinst</el-descriptions-item>
        <el-descriptions-item label="关联数据集" label-align="left" align="center">L1</el-descriptions-item>
        <el-descriptions-item label="实例描述" label-align="left" align="center">
          <el-tag size="small">test</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="编码资源" label-align="left" align="center">123Province</el-descriptions-item>
        <el-descriptions-item label="训练资源" label-align="left" align="center">1</el-descriptions-item>
        <el-descriptions-item label="创建时间" label-align="left" align="center">{{currentTime}}</el-descriptions-item>
        <el-descriptions-item label="更新时间" label-align="left" align="center">{{currentTime}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import { ElNotification } from 'element-plus'
export default defineComponent({
  name: "index",
  components:{

  },
  setup(){
    const value = ref([]);
    // 多选状态提交
    const options = [
      {
        value: '创建',
        label: '创建',
      },
      {
        value: '启动',
        label: '启动',
      },
      {
        value: '停止',
        label: '停止',
      },
      {
        value: '重建',
        label: '重建',
      },
    ]

    const showPopup = ref(false);
    const handleChange = (value) => {
      showPopup.value = true
      // 可以从后端获取相关数据来进行判断是否成功
      ElNotification({
        title: 'Success',
        message: '执行成功',
        type: 'success',
        duration: 2000,
      })
      console.log(value)
    }

    const pageSwap = () =>{
      console.log('页面跳转')
    }

// 创建一个展示时间
    const currentTime = ref<string>('');
    // Update the current time every second
    const date = new Date();
    currentTime.value = date.toLocaleTimeString();

    return{
      value,
      options,
      handleChange,
      pageSwap,
      currentTime,
      showPopup,
    }
  }

})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.first_buttun {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  margin-top: 2%;
  margin-left: 1%;
  width: 70%;
  height: 60%;
}
.divide-container{
  margin-bottom: 20px;
}
.row-container {
  display: flex;
  justify-content: flex-start;
}
.row-container2 {
  display: flex;
  justify-content:  flex-end;
}
</style>

