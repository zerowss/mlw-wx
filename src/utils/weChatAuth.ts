import { AuthSettingOption, _BAIDU } from '@/config'
export interface AuthResult {
  readonly status: number,
  readonly msg: string
}
// 查询是否授权
export const isAuth = (auth: AuthSettingOption) => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res: WechatMiniprogram.OpenSettingSuccessCallbackResult) {
        if (res.errMsg === 'getSetting:ok') {
          if (res.authSetting[auth]) {
            resolve({ status: 1, msg: '已授权' })
          } else {
            resolve({ status: 0, msg: '未授权' })
          }
        } else {
          resolve({ status: 0, msg: '未授权' })
        }
      },
      fail() {
        reject({ status: 0, msg: 'API调用失败' })
      }
    })
  })
}

// 授权
export const authorize = (auth: AuthSettingOption) => {
  return new Promise((resolve, reject) => {
    isAuth(auth).then((res: AuthResult) => {
      if (res.status === 0) {
        // wx.authorize({scope: "scope.userInfo"})，不会弹出授权窗口，需使用按钮唤起
        if (auth === AuthSettingOption.USERINFO) {
          return resolve({ status: 0, msg: "authorize:fail 系统错误，错误码：-12007,scope unauthorized" })
        }
        // 未曾授权过
        wx.authorize({
          scope: auth,
          success(res) {
            // 授权成功
            resolve({ status: 1, msg: "授权成功" });
            // 调用授权api 不会弹窗询问
          },
          fail() {
            // 拒绝授权
            reject({ status: 0, msg: "拒绝授权" })
          }
        })
      } else {
        resolve({ status: 1, msg: '已授权' })
      }
    })
  })
}

// 根据百度地图api获取城市
export const getCity = (res: any) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: _BAIDU.url,
      data: {
        ak: _BAIDU.ak,
        coord_type: 'wgs84',
        location: `${res.latitude},${res.longitude}`,
        output: 'json'
      },
      header: {
        'content-type': 'application/json',  // 默认值
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
