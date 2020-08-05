/// <reference path="./type/types.d.ts" />
import mpx, { createApp } from '@mpxjs/core'
import apiProxy from '@mpxjs/api-proxy'

import fetch from '@/plugin/request'
import { getUserLocation, getUserInfo } from '@/utils/weChatAuth'
import '@/utils/expand'

mpx.use(apiProxy, { usePromise: true })
mpx.use(fetch);
// app.js
createApp({
  globalData: {
    employId: ''
  },
  async onLaunch() {
    // wx.hideTabBar({})
    console.log('0');
    // 获取定位 拒绝授权默认北京
    await getUserLocation()

    this.globalData.employId = '1'
    // @ts-ignore
    if(this.employIdCallback){
      // @ts-ignore
      this.employIdCallback()
    }
    // 获取用户信息 授权过再此获取, 未授权需在登录页去授权
    getUserInfo()

  },
  onPageNotFound(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
