/**
 *  枚举微信可以获取的授权
 */
export enum AuthSettingOption {
    'USERINFO' = 'scope.userInfo', // 用户信息
    'USER_LOCATION' = 'scope.userLocation', // 地理位置
    // 'USER_LOCATIONBACKGROUND' = 'scope.userLocationBackground', // 后台定位
    'ADDRESS' = 'scope.address', // 通讯地址
    'INVOICETITLE' = 'scope.invoiceTitle', // 发票抬头
    'INVOICE' = 'scope.invoice', // 获取发票
    'WERUN' = 'scope.werun', // 微信运动步数
    'RECORD' = 'scope.record', // 录音功能
    'WRITEPHOTOSALBUM' = 'scope.writePhotosAlbum', // 保存到相册
    'CAMERA' = 'scope.camera' // 摄像头
}

// 区分测试/线上接口
export const domain = process.env.NODE_ENV !== "production" ? 'https://third.mlwplus.com' : 'https://third.mlwplus.com'

// 百度地图api
export const _BAIDU = {
    url: 'http://api.map.baidu.com/geocoder/v2/',
    ak: 'zmVwTKkuEXmcbmEtznL6Ip4EMspC2DWH',
    // ak: 'L72bAq4FTA4LMak2AVPg2bTtS22S3w1K'
}



