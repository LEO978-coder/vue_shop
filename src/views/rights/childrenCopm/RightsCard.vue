<template>
  <div class="rights-card">
    <el-card class="box-card">
      <el-table
        :data="rightsList"
        border
        style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径">
        </el-table-column>
        <el-table-column
          prop="level"
          label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RightsCard',
  props: {
    rightsList: {
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