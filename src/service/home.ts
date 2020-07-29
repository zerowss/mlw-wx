import { IRoomListParams } from './types'
import { get, post } from '@/plugin/request'

// 首页
class Homepage {
    // 获取列表数据
    async getList(params: IRoomListParams): Promise<any> {
        const res = await get({
            url: '/customer/getRentRoomList',
            data: params,
            flag: true
        })
        return res
    }
    // 获取首页banner
    async getHomeContent(city_id: number): Promise<any> {
        const res = await get({
            url: '/customer/getHomeContent',
            data: {
                city_id
            }
        })
        return res;
    }
}

export default new Homepage();
