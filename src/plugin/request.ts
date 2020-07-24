
import { domain } from '@/config'

type TMethod = 'GET' | 'POST'
export interface IParams {
  readonly url: string;
  method?: TMethod;
  data?: any;
  flag?: boolean;
}

function request(params: IParams) {
  const { url, method, data, flag = false } = params
  flag ? wx.showLoading({
    title: 'loading...',
  }) : '';
  return new Promise((resolve, reject) => {
    wx.request({
      url: domain + url,
      method,
      data,
      dataType: 'json',
      header: {
        'content-type': 'application/json',  // 默认值
        'token': wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
      },
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        flag ? wx.nextTick(() => {
          wx.hideLoading();
        }) : '';
      }
    })
  })
}

function get(obj: IParams) {
  return request({
    url: obj.url,
    method: 'GET',
    data: obj.data,
    flag: obj.flag
  });
}

function post(obj: IParams) {
  return request({
    url: obj.url,
    method: 'POST',
    data: obj.data,
    flag: obj.flag
  });
}


export default function install(proxyMPX: any) {
  proxyMPX.prototype.$fetch = request
  proxyMPX.prototype.$get = get
  proxyMPX.prototype.$post = post
}


export {
  request,
  get,
  post
}
