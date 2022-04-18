<template>
  <div class="params">
    <!-- 面包屑导航区域 -->
    <breadcrumb-copm :breadcrumbList="breadcrumbList"/>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 头部警告区域 -->
       <el-alert title="注意：只允许为第三级分类设置相关的参数！" type="warning" show-icon :closable="false"></el-alert>
       <!-- 选择商品分类区域 -->
       <el-row class="cat_pot">
         <el-col>
           <span>选择商品分类：</span>
           <el-cascader
              v-model="selectdKeys"
              :options="cateList"
              :props="cascaderProps"
              @change="handleChange">
            </el-cascader>
         </el-col>
       </el-row>
       <!-- tabs 标签页区域 -->
       <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <!-- 动态参数显示区域 -->
          <el-tab-pane label="动态参数" name="many">
            <el-button size="mini" type="primary" :disabled="isBrnDisabled" @click="showAddDialog">添加参数</el-button>
            <!-- 动态参数表格区域 -->
            <el-table :data="manyTableData" border>
              <!-- 展开 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <!-- 循环渲染tag标签 -->
                  <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable>{{item}}</el-tag>
                  <!-- 新增的文本框 -->
                  <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput"
                    size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                  </el-input>
                  <!-- 新增的按钮 -->
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <!-- 序号 -->
              <el-table-column type="index"></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column prop="attr_name" label="参数名称"></el-table-column>
              <el-table-column label="操作">
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delect">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 静态属性显示区域 -->
          <el-tab-pane label="静态属性" name="only">
            <el-button size="mini" type="primary" :disabled="isBrnDisabled" @click="showAddDialog">添加参数</el-button>
            <!-- 静态属性表格数据区域 -->
            <el-table :data="onlyTableData" border>
              <!-- 展开 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <!-- 循环渲染tag标签 -->
                  <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable>{{item}}</el-tag>
                  <!-- 新增的文本框 -->
                  <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput"
                    size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                  </el-input>
                  <!-- 新增的按钮 -->
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <!-- 序号 -->
              <el-table-column type="index"></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column prop="attr_name" label="参数名称"></el-table-column>
              <el-table-column label="操作">
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delect">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
    </el-card>

    <!-- 添加参数对话框 -->
    <el-dialog
      :title="'添加' + addDialogTitle"
      :visible.sync="addDialogVisible"
      width="50%">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRed" label-width="100px">
        <el-form-item :label="addDialogTitle" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParamsVisible">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import BreadcrumbCopm from '../../components/breadcrumbCopm/BreadcrumbCopm.vue'

import { getShopList, getParamsList, addParams, editParams } from 'network/params.js'

export default {
  name: 'Params',
  components: {
    BreadcrumbCopm
  },
  data() {
    return {
      breadcrumbList: ['商品管理', '参数列表'],
      // 商品分类 列表
      cateList: [],
      // 级联选择器的配置选项
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定的数组
      selectdKeys: [],
      // 被激活的标签页
      activeName: 'many',
      // 动态参数的数据
      manyTableData: [],
      // 静态属性的数据
      onlyTableData: [],
      // 添加参数对话框的显示或者隐藏
      addDialogVisible: false,
      // 添加参数对话框的数据
      addForm: {
        attr_name: ''
      },
      // 添加参数对话框的验证规则
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    // 当联机选择框参数为真时，添加按钮可用
    isBrnDisabled() {
      if(this.selectdKeys.length == 3) {
        return false
      } else {
        return true
      }
    },
    // 当前选中的三级分类ID
    cateId() {
      if(this.selectdKeys.length === 3) {
        return this.selectdKeys[2]
      }else {
        return null
      }
    },
    // 添加参数的标题
    addDialogTitle() {
      if(this.activeName === 'many') {
        return '动态参数'
      }else{
        return '静态属性'
      }
    }
  },
  methods: {
    getShopList() {
      getShopList().then(res => {
        // console.log(res.data.data)
        if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        this.cateList = res.data.data
      })
    },
    // 当级联选择框发生变化，触发函数
    handleChange() {
      // console.log(this.selectdKeys)
      // 选中的不是三级分类
      if(this.selectdKeys.length !== 3) {
        this.selectdKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        this.$message.error('请选择三级分类')
        return
      }
      // 选中的是三级分类
      console.log(this.selectdKeys)
      this.getParamsList()
    },
    // tab 页签点击事件的处理函数
    handleTabClick() {
      // console.log(this.activeName)
      this.getParamsList()
    },
    // 获取动态参数 或 静态属性的 数据
    getParamsList() {
      getParamsList(this.cateId, this.activeName).then(res => {
        if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        res.data.data.forEach(item => {
           item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
           // 控制文本框的显示或隐藏
           item.inputVisible = false
           // 文本框中输入的值
           item.inputValue = ''
        })
        console.log(res.data.data)
        if(this.activeName === 'many') {
          this.manyTableData = res.data.data
        } else {
          this.onlyTableData = res.data.data
        }
      })
    },
    // 点击显示添加参数对话框
    showAddDialog() {
      this.addDialogVisible = true
    },
    // 点击提交添加参数
    addParamsVisible() {
      addParams(this.cateId, this.addForm.attr_name, this.activeName).then(res => {
        console.log(res)
        if(res.data.meta.status !== 201) return this.$message.error(res.data.meta.msg)
        this.$message.success(res.data.meta.msg)
      })
    },
    // 键盘按下 enter键 或者 光标离开 文本框触发事件
    handleInputConfirm(row) {
      if(row.inputValue.trim().length === 0) {
        row.inputVisible = false
        row.inputValue = ''
        return
      }
      // 如果没有ruturn，则说明输入的内容需要做后续的操作
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      console.log(row.attr_sel)
      // 需要发送请求，保存这次操作
      editParams(this.cateId, row.attr_id, row.attr_name, row.attr_sel, row.attr_vals.join(' ')).then(res => {
        console.log(res)
        if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        this.$message.success(res.data.meta.msg)
      })
    },
    //点击显示文本框
    showInput(row) {
      row.inputVisible = true
      // 让文本框获取焦点
      // $nextTick方法的作用， 当页面上的元素被重新渲染之后， 才会执行回调中的函数
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    }
  },
  created () {
    this.getShopList()
  }
};
</script>

<style lang="less" scoped>
  .cat_pot {
    margin: 15px 0;
    font-size: 17px;
  }
  
  .el-cascader {
    width: 280px;
  }

  .el-tag {
    margin: 0 8px;
  }

  .input-new-tag {
    width: 150px;
  }
</style>