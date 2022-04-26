<template>
  <div class="reports">
    <!-- 头部导航栏 -->
    <breadcrumb-com :breadcrumbList="breadcrumbList"/>
    <!-- 卡片视图 -->
    <el-card>
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
  import BreadcrumbCom from '../../components/breadcrumbCopm/BreadcrumbCopm.vue'

  import {getReportsData} from '../../network/reports'

  import _ from 'lodash'

  import * as echarts from 'echarts';

  export default {
    name: 'Reports',
    components: {
      BreadcrumbCom
    },
    data() {
      return {
        breadcrumbList: ['数据统计', '数据报表'],
        data: null,
        options: {
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
      };
    },
    created () {
      // getReportsData(1).then(res => {
      //   console.log(res.data.data)
      //   this.data = res.data.data
      // })
    },
    mounted() {
      var myChart = echarts.init(document.getElementById('main'))

      // var option = {
      //   title: {
      //     text: 'ECharts 入门示例'
      //   },
      //   tooltip: {},
      //   legend: {
      //     data: ['销量']
      //   },
      //   xAxis: {
      //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      //   },
      //   yAxis: {},
      //   series: [
      //     {
      //       name: '销量',
      //       type: 'bar',
      //       data: [5, 20, 36, 10, 10, 20]
      //     }
      //   ]
      // };

      getReportsData(1).then(res => {
        console.log(res.data.data)
        // const result = Object.assign(res.data.data, this.options)
        const result = _.merge(res.data.data, this.options)
        myChart.setOption(result);
      })


    }
  };
</script>

<style lang="less" scoped>

</style>