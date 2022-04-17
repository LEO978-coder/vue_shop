<template>
  <div class="categories">
    <!-- 面包屑导航区域 -->
    <breadcrumb-Copm :breadcrumbList="breadcrumbList" />
    <!-- 卡片试图区域 -->
    <el-card>
      <!-- 添加按钮 -->
      <el-row>
        <el-col>
           <el-button type="primary" @click="addCate">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 商品表格 -->
      <zk-table :data="cateList" class="zk-table"
                :columns="columns" :border="true" 
                :show-row-hover="false" :show-index="true" 
                :selection-type="false" :expand-type="false">
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt">
          <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </zk-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    
    <!-- 添加分类 -->
    <el-dialog
      title="提示"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClose">
      <el-form ref="addCateFormRef" :rules="addCateFormRules" :model="addCateForm" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
           <el-cascader
            v-model="cascaderKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
            clearable
            change-on-select>
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import BreadcrumbCopm from '../../components/breadcrumbCopm/BreadcrumbCopm.vue'

import {getCategoriesDataList, getParentCateList, subCate} from 'network/categories.js'

export default {
  name: 'Categories',
  components: {
    BreadcrumbCopm
  },
  data() {
    return {
      // 面包屑数据
      breadcrumbList: ['商品管理', '商品分类'],
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类数据列表， 默认为空
      cateList: [],
      // 总数居条款
      total: 0,
      // 为table表格指定列定义
      columns: [
        {
          label: '分类名称',
          prop: "cat_name"
        },{
          label: '是否有效',
          // 表示将当前列定义为模板列
          type: 'template',
          // 表示当前列的模板名称
          template: 'isok'
        },{
          label: '排序',
          // 表示将当前列定义为模板列
          type: 'template',
          // 表示当前列的模板名称
          template: 'order'
        },{
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      // 显示或者隐藏添加分类对话框
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: '',
        // 父类分类的ID
        cat_pid: 0,
        // 分类层级
        cat_level: 0
      },
      // 添加分类的验证规则
      addCateFormRules:{
        cateName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 保存父级分类的信息
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 选中的父级分类的ID数组
      cascaderKeys: []
    }
  },
  methods: {
    getCategoriesDataList() {
      getCategoriesDataList(this.queryInfo.type, this.queryInfo.pagenum, this.queryInfo.pagesize).then(res => {
        // console.log(res)
        if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        this.cateList = res.data.data.result
        this.total = res.data.data.total
      })
    },

    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getCategoriesDataList()
    },
    handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getCategoriesDataList()
    },
    // 点击显示添加分类
    addCate() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    // 获取父级分类的列表
    getParentCateList() {
      getParentCateList().then(res => {
        console.log(res.data.data)
        if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        this.parentCateList = res.data.data
      })
    },
    // 选项发生变化时触发这个函数
    parentCateChanged() {
      console.log(this.cascaderKeys)
      // 如果cascaderKeys 数组中的 length 大于 0，证明选中的父级分类
      // 反之，就说明没有选中任何父级分类
      if(this.cascaderKeys.length > 0) {
        // 父级分类的ID
        this.addCateForm.cat_pid = this.cascaderKeys[this.cascaderKeys.length - 1]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.cascaderKeys.length
        return
      } else {
        // 父级分类的ID
        this.addCateForm.cat_pid = 0
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    // 点击提交分类表单
    submitCate() {
      console.log(this.addCateForm)
      subCate(this.addCateForm.cat_pid, this.addCateForm.cat_name, this.addCateForm.cat_level).then(res => {
        console.log(res)
        if(res.data.meta.status !== 201) return this.$message.error(res.data.meta.msg)
        this.$message.success(res.data.meta.msg)
      })
    },
    // 监听对话框的关闭事件，重置表单数据
    addCateDialogClose() {
      this.$refs.addCateFormRef.resetFields()
      this.cascaderKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    }
  },
  created () {
    this.getCategoriesDataList()
  }
};
</script>

<style lang="less" scoped>
  .zk-table {
    margin-top: 15px;
  }
</style>