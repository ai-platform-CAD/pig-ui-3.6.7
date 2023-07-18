<template>
  <div class="common-layout">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">project</el-card>
            </el-col>
            <el-col :span="8">
                <el-cascader v-model="value" :options="options" @change="handleChange" />
            </el-col>
            <el-col :span="8">
              <el-card>
                <el-button type="primary" class="first_buttun" @click="pageSwap">在线编辑</el-button>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </template>

      <el-descriptions title="设备详细信息" :column="1" direction="horizontal" border>
        <el-descriptions-item
            label="实例状态"
            label-align="left"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            width="5px"
        >working</el-descriptions-item
        >
        <el-descriptions-item label="深度学习框架" label-align="left" align="center"
        >eslinst</el-descriptions-item
        >
        <el-descriptions-item label="关联数据集" label-align="left" align="center"
        >L1</el-descriptions-item
        >
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
export default defineComponent({
  name: "index",
  components:{

  },
  setup(){
    const value = ref([]);
    // 多选状态提交
    const options = [
      {
        value: '状态1',
        label: '状态1',
        children: [
          {
            value: '状态1-1',
            label: '状态1-1',
          },
        ],
      },
      {
        value: '状态2',
        label: '状态2',
      },
      {
        value: '状态3',
        label: '状态3',
      },
    ]

    const handleChange = (value) => {
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
    }
  }

})
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.radius {
  height: 50px;
  width: 12%;
  border:solid 2px gray;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 30px;
}

.first_buttun {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin-top: 2%;
  margin-left: 1%;
  width: 70%;
  height: 60%;
}

.container {
  display: flex;
  margin: 20px;
  height: 500px;
}

.nav {
  flex: 1;
}

.nav ul {
  list-style: none;
  padding: 0;
}

.nav li {
  margin-bottom: 10px;
}

.nav a {
  text-decoration: none;
}

.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
</style>
