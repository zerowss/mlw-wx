import { _cdnUrl } from '@/config'
import { ICityData } from '@/service/types';
// 获取cdn地址
export const getCdnUrl = (u: string, suffix: string = '.png') => {
  // http://xeme.oss-cn-shanghai.aliyuncs.com/wechat/background_coupon_disabled.png
  return `${_cdnUrl}/wechat/${u}${suffix}`
}

// 提示框
export function toast(title: string) {
  wx.showToast({
    title: title,
    icon: "none",
    duration: 1000
  });
}

// 没有登录去登录
export const isLogin = () => {
  const userInfo = wx.getStorageSync('userInfo')
  if (!userInfo) {
    wx.navigateTo({
      url: '/pages/login/index'
    })
    return false
  }
  return true
}

export const getCityId = (cityname: string) => {
  const cityList = wx.getStorageSync('citylist')
  const city = cityList.find((v: ICityData) => cityname.indexOf(v.name) > -1)
  return city ? city.id : ''
}

// 对象是否为空
export const isEmptyObject = (obj: any): boolean => {
  return JSON.stringify(obj) === "{}"
}
// 过滤对象空值
export const filterObjEmptyAttr = (obj: any) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (!element) {
        delete obj[key]
      }
    }
  }
  return obj
}
/*函数节流*/
export const throttle = (fn: any, interval: number) => {
  let enterTime = 0
  const gapTime = interval || 300
  return function () {
    // @ts-ignore
    const context = this
    const backTime: number = +new Date()
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime;
    }
  };
}

/*函数防抖*/
export const debounce = (fn: any, interval?: number) => {
  let timer: any
  const gapTime = interval || 1000;

  return function () {
    clearTimeout(timer);
    // @ts-ignore
    const context = this;
    const args = arguments
    timer = setTimeout(function () {
      fn.call(context, args);
    }, gapTime);
  };
}
