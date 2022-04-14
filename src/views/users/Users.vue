<template>
  <div class="users">
    <!-- 面包屑视图模块 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域试图模块 -->
    <el-card class="box-card">

      <!-- 搜索与添加用户区域 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="queryInfo.query" placeholder="请输入内容" class="input-with-select" clearable @clear="getUsers">
            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize" 
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加新用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClose">
      <!-- 添加用户信息区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addForm.mobile" clearable></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogSbumit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
        title="提示"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClose">
        <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 角色分配对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="setRoledialogVisible"
      width="50%"
      @close="setRoleDialogClose">
      <div>
        <p class="setRoleP">当前的用户：{{userInfo.username}}</p>
        <p class="setRoleP">当前的角色：{{userInfo.role_name}}</p>
        <p class="setRoleP">分配新角色：
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import { getUsers, getState, getAddUser, getEditUser, getEditUserInfo, getDeleteUser, getSetRoleList, getSetNewRole} from 'network/users'

export default {
  name: 'Users',
  components: {
  },
  data() {
    // 验证邮箱的规则
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(regEmail.test(value)) {
        return callback()
      }
      callback(new Error("请输入合法的邮箱"))
    }
    // 验证手机号码的规则
    const checkMobile = (rule, value, callback) => {
      const regEmail = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/
      if(regEmail.test(value)) {
        return callback()
      }
      callback(new Error("请输入合法的手机号码"))
    }
    return {
      queryInfo: {
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 2
      },
      userList: [],
      total: 0,
      // 监听添加用户提示框的显示或隐藏
      dialogVisible: false,
      addForm: {
        username: '12311',
        password: '1231111',
        email: '12312312@qq.com',
        mobile: '13888888888'
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 监听修改用户提示框的显示或隐藏
      editDialogVisible: false,
      // 查询到用户信息对象
      editForm: {},
      // 修改用户提示框的校验规则
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 分配角色对话框
      setRoledialogVisible: false,
      // 需要分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 分配角色选中的id
      selectRoleId: ''
    }
  },
  methods: {
    // 获用户表单数据
    getUsers() {
      getUsers(this.queryInfo.query, this.queryInfo.pagenum, this.queryInfo.pagesize).then(res => {
        // console.log(res)
        if(res.data.meta.status !== 200) return this.$message.error("Failed to obtain user data")
        this.userList = res.data.data.users
        this.total = res.data.data.total
      })
    },
    // 监听 pagesize 改变的事件 pageSize 改变时会触发
    handleSizeChange(newPageSize) {
      console.log(newPageSize)
      this.queryInfo.pagesize = newPageSize
      this.getUsers()
    },
    // 监听 页码值 改变的事件 currentPage 改变时会触发
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUsers()
    },
    // 监听用户状态的改变
    userStateChange(userInfo) {
      console.log(userInfo)
      getState(userInfo.id, userInfo.mg_state).then(res => {
        console.log(res)
        if(res.data.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error("修改用户状态失败")
        }
        this.$message.success("修改用户状态成功")
      })
    },
    // 监听添加用户对话框关闭事件
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    // 监听添加用户对话框的提交事件
    addDialogSbumit() {
    //   this.$refs.addFormRef.validate(valid => {
    //     if(!valid) return
    //     // 发送添加用户的网络请求
    //     getAddUser(this.addForm.username, this.addForm.password, this.addForm.email, this.addForm.mobile).then(res => {
    //       console.log(res.data)
    //     })
    //   })
        getAddUser(this.addForm.email, this.addForm.mobile, this.addForm.password, this.addForm.username).then(res => {
          console.log(res.data)
        })
        console.log(this.addForm)
    },
    // 监听修改用户对话框
    editDialog(id) {
      // 打开修改用户对话框
      this.editDialogVisible = true
      // 发送网络请求
      getEditUser(id).then(res => {
        if(res.data.meta.status !== 200) return this.$message.error("点击失败")
        this.editForm = res.data.data
        console.log(res)
      })
    },
    //关闭修改用户模态框对数据进行重定向
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    // 提交修改用户的信息
    editUserInfo() {
      this.$refs.editFormRef.validate(valid => {
        if(!valid) return;
        // 验证通过，发送请求
        getEditUserInfo(this.editForm.id, this.editForm.email, this.editForm.mobile).then(res => {
          if(res.data.meta.status !== 200) return this.$message.error("修改用户失败");
          // 关闭对话框
          this.editDialogVisible = false
          // 刷新数据列表
          this.getUsers()
          // 提示用户更新数据成功
          this.$message.success("修改成功")
        })
      })
    },
    // 删除当前用户数据信息
    deleteUser(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteUser(id).then(res => {
            console.log(res)
            if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
            this.getUsers()
            this.$message.success(res.data.meta.msg)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 点击显示分配角色对话框
    setRole(userInfo) {
      this.userInfo = userInfo
      getSetRoleList().then(res => {
        console.log(res)
        if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        this.rolesList = res.data.data
      })
      this.setRoledialogVisible = true
    },
    // 关闭分配角色对话框时对内容重置
    setRoleDialogClose() {

    },
    // 点击按钮分配角色
    saveRoleInfo() {
      if(!this.selectRoleId){
        return this.$message.error('请选择用户角色')
      }
      getSetNewRole(this.userInfo.id, this.selectRoleId).then(res => {
        console.log(res)
        if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        this.$message.success(res.data.meta.msg)
        this.getUsers()
        this.setRoledialogVisible = false
      })
      console.log(this.userInfo.id, this.selectRoleId)
    }
  },
  created () {
    this.getUsers()
  }
};
</script>

<style lang="less" scoped>
  .setRoleP {
    margin: 8px 0;
  }
</style>