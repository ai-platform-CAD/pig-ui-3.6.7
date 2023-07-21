<template>
  <el-dialog
      :close-on-click-modal="false"
      :title="!dataForm.secretId ? '新增' : '修改'"
      :visible.sync="visible"
      @close="closeDialog()">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
             @keyup.enter.native="dataFormSubmit()">
      <el-form-item v-if="dataForm.operatorId" label="算子ID" prop="operatorId">
        <el-input v-model="dataForm.operatorId" disabled placeholder="算子ID"></el-input>
      </el-form-item>
      <el-form-item label="算子名称" prop="operatorName">
        <el-input v-model="dataForm.operatorName" placeholder="算子名称"></el-input>
      </el-form-item>
      <el-form-item label="JSON内容" prop="jsonContent">
        <el-input v-model="dataForm.jsonContent" placeholder="JSON内容"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.operatorId" label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" disabled placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.operatorId" label="创建人" prop="createBy">
        <el-input v-model="dataForm.createBy" disabled placeholder="创建人"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.operatorId" label="修改时间" prop="updateTime">
        <el-input v-model="dataForm.updateTime" disabled placeholder="修改时间"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.operatorId" label="更新人" prop="updateBy">
        <el-input v-model="dataForm.updateBy" disabled placeholder="更新人"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="canSubmit" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {addObj, getObj, putObj, validateOperatorName} from '@/api/operator_manage'

export default {
  data() {
    return {
      visible: false,
      canSubmit: false,
      dataForm: {
        operatorId: '',

        operatorName: '',

        jsonContent: '',

        createTime: '',

        createBy: '',

        updateTime: '',

        updateBy: '',

      },
      dataRule: {
        namespace: [
          {
            required: true,
            message: '命名空间不能为空',
            trigger: 'blur'
          },
        ],

        secretName: [
          {
            required: true,
            message: 'SecretName不能为空',
            trigger: 'blur'
          },
          {
            validator: validateOperatorName,
            trigger: 'blur'
          }
        ],

        accessKey: [
          {required: true, message: 'accessKey不能为空', trigger: 'blur'}
        ],

        secretKey: [
          {required: true, message: 'secretKey不能为空', trigger: 'blur'}
        ],

      }
    }
  },
  methods: {
    init(id) {
      this.visible = true;
      this.canSubmit = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (id) {
          getObj(id).then(response => {
            this.dataForm = response.data.data
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.canSubmit = false;
          if (this.dataForm.secretId) {
            putObj(this.dataForm).then(data => {
              this.$notify.success('修改成功')
              this.visible = false
              this.$emit('refreshDataList')
            }).catch(() => {
              this.canSubmit = true;
            });
          } else {
            addObj(this.dataForm).then(data => {
              this.$notify.success('添加成功')
              this.visible = false
              this.$emit('refreshDataList')
            }).catch(() => {
              this.canSubmit = true;
            });
          }
        }
      })
    },
    //重置表单
    closeDialog() {
      this.$refs["dataForm"].resetFields()
    }
  }
}
</script>
