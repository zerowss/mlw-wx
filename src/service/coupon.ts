import { get, post } from '@/plugin/request'
// 优惠券接口
class Coupon {
    // 获取优惠券列表
    async getList(): Promise<any> {
        const res = await get({
            url: '/coupon/couponList',
            flag: true
        })
        return res
    }
    //获取历史优惠券
    async getHistoryList(): Promise<any> {
        return await get({
            url: '/coupon/couponHistory',
            flag: true
        })
    }
}

export default new Coupon()
