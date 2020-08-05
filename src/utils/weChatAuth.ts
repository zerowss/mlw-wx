import { AuthSettingOption, _BAIDU } from '@/config'
import { _TX } from '@/config'
import { get } from '@/plugin/request'
import QQMapWX from '@/lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min'
const qqmapsdk = new QQMapWX({
  key: _TX.key
});
export interface AuthResult {
  readonly status: number,
  readonly msg: string
}
// 查询是否授权-权限
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
            resolve({ status: 0, msg: "拒绝授权" })
          }
        })
      } else {
        resolve({ status: 1, msg: '已授权' })
      }
    })
  })
}

// 获取定位 拒绝授权默认北京
export const getUserLocation = async () => {
  const res = await authorize(AuthSettingOption.USER_LOCATION).then((res: AuthResult) => {
    if (res.status === 1) {
      wx.getLocation({
        success(result) {
          reverseGeocoder().then((res: any) => {
            if (res.message === "query ok") {
              const result = res.result
              const cityname = result.address_component.city.replace('市', '')
              wx.setStorageSync('cityName', cityname)
            }
          }).catch((err: any) => {
            // 接口调用失败 默认北京
            wx.showToast({
              title: '无法定位您的位置，请手动选择城市切换',
              icon: 'none',
            });
            wx.setStorageSync('cityName', '北京')
          })
        }
      })
    } else {
      // 拒绝授权默认北京
      wx.setStorageSync('cityName', '北京')
    }
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
      success(result) {
        resolve(result)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 根据腾讯地图api逆解析坐标
export const reverseGeocoder = () => {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      success(res: any) {
        resolve(res)
      },
      fail(error: any) {
        reject(error)
      }
    })
  })
}

// 根据地址解析坐标-腾讯地图api
// address:地址（注：地址中请包含城市名称，否则会影响解析效果），如：‘北京市海淀区彩和坊路海淀西大街74号’
export const geocoder = (address: string) => {
  return new Promise((resolve, reject) => {
    qqmapsdk.geocoder({
      address,
      region: wx.getStorageSync('cityName'),
      success(res: any) {
        resolve(res)
      },
      fail(error: any) {
        reject(error)
      }
    })
  })
}

// 查询是否授权-登录过期
export const isAuthLogin = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        resolve({ status: 1, msg: "登录未过期" })
      },
      fail() {
        // session_key 已经失效，需要重新去登录界面登录
        resolve({ status: 0, msg: "登录过期" })
      }
    })
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    isAuthLogin().then((resAuth: AuthResult) => {
      if (resAuth.status === 1) {
        wx.login({
          success(resLogin: any) {
            wx.getUserInfo({
              withCredentials: true,
              success(resUser: WechatMiniprogram.GetUserInfoSuccessCallbackResult) {
                get({
                  url: '/customer/checkUserHasRegister',
                  data: {
                    encryptedData: resUser.encryptedData,
                    iv: resUser.iv,
                    code: resLogin.code
                  }
                }).then((result: any) => {
                  console.log(result, 'userinfo');
                  const userInfo = result.data.data.wx_info
                  wx.setStorageSync('userInfo', userInfo)
                  wx.setStorageSync('token', result.data.data.token_info.token_seed)
                  resolve(result)
                })
              },
              fail() {
                resolve({ status: 0, msg: "获取用户信息失败" })
              }
            })
          }
        })


      } else {
        resolve({ status: 0, msg: "获取用户信息失败" })
      }
    })
  })
}
