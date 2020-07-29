import Baseconfig from '@/service/baseConfig'
import { IMixin } from '@mpxjs/core';
export const mixinBase: IMixin = {
    data: {
        cityList: [],
        searchForm: {
            conditions: {},
            districts: [],
            sorters: [],
            subways: []
        }
    },
    onLoad() {
        this.getCityList()
        this.getSearchConfig()
    },
    methods: {
        getCityList(): any {
            Baseconfig.getCityData().then(res => {
                this.cityList = res.data.data
                // this.globalData['cityList'] = res.data.data
            })
        },
        getSearchConfig() {
            Baseconfig.getSearchConfig().then(res => {
                this.searchForm = res.data.data
            })
        }
    }
};
