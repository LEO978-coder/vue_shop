<template>
  <div class="roles-list">
    <el-card class="roles-card">
      <!-- 添加角色区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表展示区域 -->
      <el-table
        :data="rolesList"
        border
        scripe
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-show="scope.row.children.length != 0" :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, index1) in scope.row.children" :key="item1.id">
              <!-- 一级菜单 -->
              <el-col :span="6">
                <el-tag closable 
                        @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级菜单 -->
              <el-col :span="18">
                <el-row :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, index2) in item1.children" :key="item2.id">
                  <!-- 二级菜单 -->
                  <el-col :span="6">
                    <el-tag type="success" 
                            closable 
                            @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级菜单 -->
                  <el-col :span="18">
                    <el-tag v-for="item3 in item2.children" 
                            :key="item3.id" 
                            type="warning" 
                            closable 
                            @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- {{scope.row}} -->
            <el-row v-show="scope.row.children.length == 0">
              <el-col>本角色暂无权限管理</el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" style="width: 300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-search">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-search">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-search" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%"
        @close="rightDialogClose">
        <el-tree
          :data="rightsList"
          :props="rightProps"
          :default-checked-keys="defaultCheckedRight"
          node-key="id"
          show-checkbox
          ref="treeRef">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRightDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitRightDialog">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>

import {getRemoveRight, getRightsList, submitRightList} from 'network/roles.js'

export default {
  name: 'RolesList',
  props: {
    rolesList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 角色ID
      rolesId: '',
      // 分配权限对话框的显示或隐藏
      setRightDialogVisible: false,
      // 所有权限数据
      rightsList: [],
      // 分配权限下的树形控制对象
      rightProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点ID值
      defaultCheckedRight: []
    };
  },
  methods: {
    // 移除权限
    removeRightById(roleId, rightId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送删除权限的网络请求
          getRemoveRight(roleId.id, rightId).then(res => {
            console.log(res)
            if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg);
            this.$message.success(res.data.meta.msg)
            roleId.children = res.data.data
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 分配权限对话框的展示
    showSetRightDialog(roles) {
      // 获取当前角色已有的权限
      getRightsList().then(res => {
        if(res.data.meta.status !== 200) return this.$message.error("获取权限失败")
        this.rightsList = res.data.data
      })
      // 递归获取三级节点的ID
      this.getLeafright(roles, this.defaultCheckedRight) 
      // 获取当前角色的ID
      this.rolesId = roles.id
      console.log(roles.id)
      // 点击显示分配权限对话框
      this.setRightDialogVisible = true
    },
    // 通过递归的形式，获取角色下所有三级权限id，并保存到defaultCheckedRight数组中
    getLeafright(node, arr) {
      // 如果当前 node 节点不包含children属性，则是三级节点
      if(!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafright(item, arr))
    },
    // 对分配权限进行重新赋值
    rightDialogClose() {
      this.defaultCheckedRight = []
    },
    // 点击提交分配权限按钮
    submitRightDialog() {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      const keysStr = keys.join(',')
      submitRightList(this.rolesId, keysStr).then(res => {
        console.log(res)
        if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        this.$message.success(res.data.meta.msg)
        this.$emit('submitRight')
        this.setRightDialogVisible = false
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .el-tag {
    margin: 8px;
  }

  .bdtop {
    border-top: 1px solid #eee;
  }

  .bdbottom {
    border-bottom: 1px solid #eee;
  }

  .vcenter {
    display: flex;
    align-items: center;
  }
</style>