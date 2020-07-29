import { createComponent } from '@mpxjs/core'
import TabbarMenus from '@/config/tabbarMenu.config'

createComponent({
    data: {
        active: 0,
        color: "#333333",
        selectedColor: "#069991",
        list: TabbarMenus
    },
    methods: {
        onChange(e: any) {
            const index = e.detail
            const path = this.list[index]['pagePath']
            wx.switchTab({ url: path })
            this.active = index
        },
        init(index: number) {
            console.log('index','111');
            this.active = index
        }
    }
})
