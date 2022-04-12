<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header class="home-header">
        <div class="home-header-left">
          <div class="title">电商后台管理系统</div>
        </div>
        <div class="home-header-rigth">
          <el-button type="info" @click="loginOut">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 折叠或者展开按钮 -->
          <div class="fold" @click="collapseClick"><i :class="isCollapseIcon"></i></div>
          <el-menu
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409Eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath">
            <el-submenu :index="item.id + ''" v-for="item in munusList" :key="item.id">
              <!-- 一级菜单 -->
              <template slot="title">
                <i :class="iconObj[item.id] + ''"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :index="'/' + subItem.path" 
                            v-for="subItem in item.children" 
                            :key="subItem.id"
                            @click="saveNavPath('/' + subItem.path)">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主题区域 -->
        <el-main>
          <!-- 路由显示页面 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import {getMunus} from 'network/menus.js'

export default {
  name: 'Home',
  data() {
    return {
      munusList: [],
      iconObj: {
        '125' : 'el-icon-user-solid',
        '103' : 'el-icon-s-help',
        '101' : 'el-icon-s-goods',
        '102' : 'el-icon-s-order',
        '145' : 'el-icon-s-marketing'
      },
      isCollapse: false,
      isCollapseIcon: 'el-icon-s-fold',
      activePath: ''
    }
  },
  methods: {
    // 点击实现退出功能
    loginOut() {
      window.localStorage.clear()
      this.$router.push('/login')
    },
    // 获取侧边栏菜单数据
    getMunus() {
      getMunus().then(res => {
        // console.log(res.data.data)
        this.munusList = res.data.data
      })
    },
    // 判断侧边栏是否折叠
    collapseClick() {
      this.isCollapse = !this.isCollapse
      if(this.isCollapse) {
        this.isCollapseIcon = 'el-icon-s-unfold'
      }else {
        this.isCollapseIcon = 'el-icon-s-fold'
      }
    },
    // 保存当前点击页面的路径
    saveNavPath(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  mounted () {
    // 调用函数获取侧边栏数据
    this.getMunus()
    // 刷新页面对应的模块高亮显示
    this.activePath = window.sessionStorage.getItem('activePath')
  }
};
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
    width: 100%;
  }

  .home-container {
    height: 100%;
  }

  .el-header {
    box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    background-color: rgb(48 65 86);
    color: #fff;
    display: flex;
    justify-content: space-between;
    .home-header-left {
      display: flex;
      align-items: center;
      .title {
        font-size: 22px;
      }
    }
    .home-header-rigth {
      display: flex;
      align-items: center;
    }
  }

  .el-aside {
    background-color: rgb(48, 65, 86);
    .fold {
      color: #fff;
      background-color: #4A5064;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
</style>