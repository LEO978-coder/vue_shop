<template>
  <div class="roles">
    <!-- 面包屑 -->
    <breadcrumb-copm :breadcrumbList="breadcrumbList" />
    <!-- 角色列表区域 -->
    <roles-list :rolesList="rolesList" @submitRight="submitRight"></roles-list>
  </div>
</template>

<script>

import BreadcrumbCopm from '../../components/breadcrumbCopm/BreadcrumbCopm.vue'

import RolesList from './childrenCopm/RolesList.vue'

import {getRolesList} from 'network/roles.js'

export default {
  name: 'Roles',
  components: {
    BreadcrumbCopm,
    RolesList
  },
  data() {
    return {
      breadcrumbList: ['权限管理', '角色管理'],
      rolesList: []
    };
  },
  methods: {
    submitRight() {
      getRolesList()
    }
  },
  created () {
    getRolesList().then(res => {
      this.rolesList = res.data.data
      // console.log(this.rolesList)
    })
  }
};
</script>

<style lang="less" scoped>

</style>