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

      <el-descriptions title="Customized style list" :column="1" border>
        <el-descriptions-item
            label="Username"
            label-align="right"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            width="150px"
        >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone" label-align="right" align="center"
        >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place" label-align="right" align="center"
        >Suzhou</el-descriptions-item
        >
        <el-descriptions-item label="Remarks" label-align="right" align="center">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address" label-align="right" align="center"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province</el-descriptions-item
        >
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


    return{
      value,
      options,
      handleChange,
      pageSwap,

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
