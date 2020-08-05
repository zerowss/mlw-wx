import { get, post } from '@/plugin/request'
import { IMyAppointment, IAddMyAppointment } from './types'
// 预约接口
class MyAppointment {
    // 获取预约列表
    async getList(data: IMyAppointment): Promise<any> {
        const res = await get({
            url: '/customer/reservehouselist',
            data,
            flag: true
        })
        return res
    }
    // 预约看房
    async reserveHouse(data: IAddMyAppointment): Promise<any> {
        const res = await get({
            url: '/customer/reserveHouse',
            data
        })
        return res
    }
    // 取消预约看房
    async reserveHouseCancel(data: any): Promise<any> {
        const res = await get({
            url: '/customer/reserveHouseCancel',
            data
        })
        return res
    }
}

export default new MyAppointment()
