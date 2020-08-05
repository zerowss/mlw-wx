import { get, post } from '@/plugin/request'
// 收藏接口
class Collection {
    // 获取收藏列表
    async getList(): Promise<any> {
        return await get({
            url: '/customer/getRentRoomFavorite',
            data: {},
            flag: true
        })
    }
    // 取消、添加收藏
    async changeFavorite(id:string):Promise<any>{
        const res = await get({
            url: '/customer/addRentRoomFavorite',
            data: {
                document_id:id
            },
            flag: true
        })
        return res
    }
}

export default new Collection()
