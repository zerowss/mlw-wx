import { createComponent } from '@mpxjs/core'
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
    data: { activity_name: '', is_disabled: true },
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
        changeTag() {
            if (this.disabled) return;
            this.triggerEvent('selectTags', { activityName: this.activity_name });
        }
    }
})
