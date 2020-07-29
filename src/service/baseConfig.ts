import { get, post } from '@/plugin/request'
// 配置信息接口
class Baseconfig {
    // 获取城市信息
    async getCityData(): Promise<any> {
        const res = await get({
            url: '/data/getCityData'
        })
        return res
    }
    // 获取搜索配置
    async getSearchConfig(): Promise<any> {
        const res = await get({
            url: '/customer/getSearchConfig'
        })
        console.log('res-search', res);

        return res
    }
}

export default new Baseconfig()
