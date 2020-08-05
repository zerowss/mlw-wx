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
export const domain = process.env.NODE_ENV !== "production" ? 'https://thirdtest.mlwplus.com' : 'https://third.mlwplus.com'

// cdn域名
export const _cdnUrl = 'http://xeme.oss-cn-shanghai.aliyuncs.com'

// 区分h5测试/线上域名
// export const _h5 = process.env.NODE_ENV !== "production" ? 'http://bj.m.t.iron.mlwplus.com' : 'http://m.meiliwu.com'
export const _h5 = 'https://w.mlwplus.com'

// 统一管理web-view引入路径
interface IH5PagesUrl {
    readonly [key: string]: string
}
export const _h5pagesurl: IH5PagesUrl = {
    customizedHousing: _h5 + '/app/lkathouse', // 定制房源
    landlordJoining: _h5 + '/owner', // 房东加盟
    serviceAgreement: _h5 + '/app/userservice', // 用户服务协议
    privacyPolicy: _h5 + '/app/privacypolicy', // 隐私政策
    companyProfile: _h5 + '/index/aboutus', // 公司简介
}

// 百度地图api
export const _BAIDU = {
    url: 'http://api.map.baidu.com/geocoder/v2/',  // 根据坐标解析城市api
    ak: 'zmVwTKkuEXmcbmEtznL6Ip4EMspC2DWH',
    // ak: 'L72bAq4FTA4LMak2AVPg2bTtS22S3w1K'
}

// 腾讯地图api
export const _TX = {
    key: 'GFTBZ-A3XHF-6OQJI-NY3RS-7BDLV-RPFTF' // 公司
    // key: 'MTOBZ-M5A3P-LU2DF-LDW3B-KU54V-3LB55' // 个人测试

}

// 房屋状态
export const _statusColors = [
    {
        name: '出租中',
        color: '#069991'
    },
    {
        name: '无效',
        color: '#999999'
    },
    {
        name: '已出租',
        color: '#F11400'
    }
]
