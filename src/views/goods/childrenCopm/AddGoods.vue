<template>
  <div class="add-goods">
    <!-- 面包屑区域 -->
    <breadcrumb-copm :breadcrumbList="breadcrumbList" />
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 文本提示框 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :active="activeIndex" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <el-tabs :tab-position="'left'" style="height: 200px;">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>

import BreadcrumbCopm from '../../../components/breadcrumbCopm/BreadcrumbCopm.vue'

export default {
  name: 'AddGoods',
  components: {
    BreadcrumbCopm
  },
  data() {
    return {
      breadcrumbList: ['商品管理', '添加商品'],
      activeIndex: 0
    };
  }
};
</script>

<style lang="less" scoped>

</style>