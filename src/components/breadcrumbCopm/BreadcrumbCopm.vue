<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbCopm',
  props: {
    breadcrumbList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      
    };
  }
};
</script>

<style lang="less" scoped>

</style>