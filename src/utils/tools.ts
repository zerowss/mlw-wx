import { _cdnUrl } from '@/config'
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
