/*
 * @Author: your name
 * @Date: 2020-07-27 09:56:39
 * @LastEditTime: 2020-07-27 10:43:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mlw-wx/src/components/coupon/index.ts
 */
import { createComponent } from '@mpxjs/core'
import { getCdnUrl } from '@/utils/tools'
createComponent({
    externalClasses: ['activity-tag', 'activited-tag'],
    properties: {
        activityName: {
            type: String,
            value: ''
        },
        disabled: {
            type: Boolean,
            value: false
        }
    },
    data: { activity_name: '', is_disabled: false, is_show_more: false },
    computed: {
        statusImgUrl() {
            console.log(getCdnUrl('icon_yishiyong'));
            
            return getCdnUrl('icon_yishiyong')
        }
    },
    watch: {
        activityName: {
            handler(val, old) {
                this.activity_name = val;
            },
            immediate: true // 是否首次执行一次
        },

        disabled: {
            handler(val, old) {
                this.is_disabled = val;
            },
            immediate: true // 是否首次执行一次
        }
    },
    methods: {
        showMore() {
            this.is_show_more = !this.is_show_more
        }
    }
})
