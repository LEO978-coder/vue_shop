<template>
  <div class="rights">
    <breadcrumb-copm :breadcrumbList="breadcrumbList" />
    <rights-card :rightsList="rightsList"></rights-card>
  </div>
</template>

<script>

import BreadcrumbCopm from '../../components/breadcrumbCopm/BreadcrumbCopm.vue'

import RightsCard from './childrenCopm/RightsCard.vue'

import {getRights} from 'network/rights.js'

export default {
  name: 'Rights',
  components: {
    BreadcrumbCopm,
    RightsCard
  },
  data() {
    return {
      breadcrumbList: ['权限管理', '权限列表'],
      rightsList: []
    };
  },
  created() {
    getRights().then(res => {
      this.rightsList = res.data.data
      console.log(this.rightsList)
    })
  }
};
</script>

<style lang="less" scoped>

</style>