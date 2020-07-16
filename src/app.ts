import mpx, { createApp } from '@mpxjs/core'
import apiProxy from '@mpxjs/api-proxy'

import fetch from '@/plugin/request'
import { authorize, AuthResult, getCity } from '@/utils/weChatAuth'
import { AuthSettingOption } from '@/config'
import { IGlobData } from '@/common/types'
import '@/utils/expand'

mpx.use(apiProxy, { usePromise: true })
mpx.use(fetch);


// app.js
createApp({
  globalData: {} as IGlobData,
  onLaunch() {
    const _that = this;
    console.log('0');

    // 获取定位 拒绝授权默认北京
    authorize(AuthSettingOption.USER_LOCATION).then((res: AuthResult) => {
      console.log('1');

      if (res.status === 1) {
        wx.getLocation({
          success(result) {
            console.log(result, 'location');
            getCity(result).then((cityInfo: any) => {
              const city_name = cityInfo.data.result.addressComponent.city as string
              _that.globalData.cityName = city_name
              wx.setStorageSync('cityName', city_name)
            }).catch(err => {
              // 接口调用失败 默认北京
              wx.showToast({
                title: '无法定位您的位置，请手动选择城市切换',
                icon: 'none',
              });
              _that.globalData.cityName = '北京'
              wx.setStorageSync('cityName', '北京')
            });
          }
        })
      } else {
        // 拒绝授权默认北京
        _that.globalData.cityName = '北京'
        wx.setStorageSync('cityName', '北京')
      }
    })

    // 获取用户信息 授权过再此获取, 未授权需在登录页去授权
    authorize(AuthSettingOption.USERINFO).then((res: AuthResult) => {
      console.log('2');

      if (res.status === 1) {
        wx.getUserInfo({
          success(result: WechatMiniprogram.GetUserInfoSuccessCallbackResult) {
            console.log(result, 'userinfo');
            const userInfo = result.userInfo
            _that.globalData.userInfo = userInfo
            wx.setStorageSync('userInfo', userInfo)
          }
        })
      }
    })
  }
})
