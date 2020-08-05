import { IMixin } from '@mpxjs/core';
const app = getApp()

// 解决onLunch异步请求滞后onLoad问题
export const mixinCallback: IMixin = {
    onLoad() {
        
        if (app.globalData.employId && app.globalData.employId != '') {
            // methods 中定义
            this.employIdCallback()
        } else {
            app.employIdCallback = () => {
                // methods 中定义
                this.employIdCallback()
            }
        }
    }
};
