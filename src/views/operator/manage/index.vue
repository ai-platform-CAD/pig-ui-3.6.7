<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <!--修改权限-->
          <el-button v-if="permissions.operator_manage_add" icon="el-icon-plus" type="primary"
                     @click="addOrUpdateHandle()">新增
          </el-button>
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table
            v-loading="dataListLoading"
            :data="dataList"
            border>
          <el-table-column
              align="center"
              header-align="center"
              label="序号"
              prop="index">
          </el-table-column>
          <el-table-column
              align="center"
              header-align="center"
              label="算子名称"
              prop="operatorName">
          </el-table-column>
          <el-table-column
              align="center"
              header-align="center"
              label="JSON内容"
              prop="jsonContent">
          </el-table-column>
          <el-table-column
              align="center"
              header-align="center"
              label="创建时间"
              prop="createTime">
          </el-table-column>
          <el-table-column
              align="center"
              header-align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button v-if="permissions.operator_manage_edit" icon="el-icon-edit" size="small" type="text"
                         @click="addOrUpdateHandle(scope.row.secretId)">修改
              </el-button>
              <el-button v-if="permissions.operator_manage_del" icon="el-icon-delete" size="small" type="text"
                         @click="deleteHandle(scope.row.secretId)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="avue-crud__pagination">
        <el-pagination
            :current-page="pageIndex"
            :page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="totalPage"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle">
        </el-pagination>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></table-form>
    </basic-container>
  </div>
</template>

<script>
import {delObj, fetchList} from '@/api/operator_manage'
import TableForm from './operator-form.vue'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  components: {
    TableForm
  },
  created() {
    this.getDataList()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      fetchList(Object.assign({
        current: this.pageIndex,
        size: this.pageSize
      })).then(response => {
        this.dataList = response.data.data.records
        this.totalPage = response.data.data.total
      })
      this.dataListLoading = false
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm('是否确认删除ID为' + id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(id)
      }).then(data => {
        this.$message.success('删除成功')
        this.getDataList()
      }).catch(() => {
      })
    }
  }
}
</script>
