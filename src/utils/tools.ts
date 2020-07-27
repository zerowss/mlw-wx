import { _cdnUrl } from '@/config'
export const getCdnUrl = (u: string, suffix: string = '.png') => {
    // http://xeme.oss-cn-shanghai.aliyuncs.com/wechat/background_coupon_disabled.png
    return `${_cdnUrl}/wechat/${u}${suffix}`
}
