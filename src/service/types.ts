
export interface IResponse<T> {
    code: number;
    data: T;
}
// 基础配置信息
// 城市信息
export interface ICityData {
    id: number;
    name: string;
    short_name: string;
    province_name: string;
    city_name: string;
    city_code: number;
    company_full_name: string;
    payment_company_name: string;
    mlw_company_name: string;
}


// 首页
// 房源列表参数

export interface IRoomListParams {
    city_id: number;
    page_size: number;
    page: number;

    build_area?: string; // 建筑面积
    order?: string; // 排序   ASC/DESC
    keyword?: string; //关键字
    rent_type?: string; // 租赁类型
    room?: string; // 房间数
    sort?: string; // 排序 build_area/rent_price
    is_expect?: string; // 房源预定状态
    base_price?: string; // 价格区间
    room_features?: string; // 房间布局
    direction?: string; // 房间朝向
    rent_status?: string; // 出租状态
    station_id?: string; // 选择地铁时
    line_id?: string; // 选择地铁时
    district_id?: string; // 选择区域时
    biz_area_id?: string; // 选择区域时
    community_id?: string; // 搜索点击下拉时所传
}
