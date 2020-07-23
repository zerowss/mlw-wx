
import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        title: {
            type: String,
            value: ''
        }
    },
    data: {
        // 状态栏高度
        statusBarHeight: 0,
        // 导航栏高度
        navigationBarHeight: 0,
        // 胶囊按钮高度
        menuButtonHeight: 0,
        // 导航栏和状态栏高度
        navigationBarAndStatusBarHeight: 0,
    },
    methods: {
        navigateBack() {
            wx.navigateBack()
        },
        navigateBackHome() {
            wx.switchTab({
                url: '/pages/index/index'
            })
        }
    },
    lifetimes: {
        attached() {
            console.log('attached')
            const { statusBarHeight, platform } = wx.getSystemInfoSync()
            const { top, height } = wx.getMenuButtonBoundingClientRect()

            // 状态栏高度
            this.statusBarHeight = statusBarHeight
            // 胶囊按钮高度 一般是32 如果获取不到就使用32
            this.menuButtonHeight = height ? height : 32

            // 判断胶囊按钮信息是否成功获取
            let navigationBarHeight
            if (top && top !== 0 && height && height !== 0) {
                navigationBarHeight = (top - statusBarHeight) * 2 + height
            } else {
                navigationBarHeight = platform === 'android' ? 48 : 40
            }
            this.navigationBarHeight = navigationBarHeight
            this.navigationBarAndStatusBarHeight = statusBarHeight + navigationBarHeight
        }
    }
})
