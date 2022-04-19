<template>
  <div class="goods">
    <!-- 面包屑导航区域 -->
    <breadcrumb-copm :breadcrumbList="breadcrumbList" />
    <!-- 卡片主题区域 -->
    <el-card>
      <!-- 搜索和添加商品区域 -->
      <el-row :gutter="20">
        <!-- 搜索 -->
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <!-- 添加商品 -->
        <el-col :span="4">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品表格区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="120"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="100"></el-table-column>
        <el-table-column label="创建时间" prop="upd_time" width="160">
          <template slot-scope="scope">{{scope.row.upd_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoods(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 商品分页功能区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>

import BreadcrumbCopm from '../../components/breadcrumbCopm/BreadcrumbCopm.vue'

import { getGoodsList, deleteGoodsListItem } from '../../network/goods'

import { formatDate } from '../../common/untils'

export default {
  name: 'Goods',
  components: {
    BreadcrumbCopm
  },
  data() {
    return {
      breadcrumbList: ['商品管理', '商品列表'],
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodsList: [],
      // 商品总数
      total: 0
    };
  },
  filters: {
    dateShow (value) {
      let date = new Date(value * 1000);
			return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    getGoodsList() {
      getGoodsList(this.queryInfo.query, this.queryInfo.pagenum, this.queryInfo.pagesize).then(res => {
        console.log(res)
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    // 点击删除商品
    deleteGoods(goods_id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGoodsListItem(goods_id).then(res => {
            console.log(res)
            if(res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
            this.$message.success(res.data.meta.msg)
            this.getGoodsList()
          })
        }).catch(() => {
            this.$message.info('已取消删除')
        });
    },
    // 点击跳转到添加商品页面
    addGoods() {
      this.$router.push('/goods/add')
    }
  },
  created () {
    this.getGoodsList()
  }
};
</script>

<style lang="less" scoped>

</style>