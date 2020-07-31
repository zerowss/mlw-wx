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
        },
        activities: {
            type: Object,
            value: {
                title: '',
                value: ''
            }
        },
        typeKey: {
            type: String,
            value: 'activities'
        }
    },
    data: { value: '' },
    watch: {
        // activityName: {
        //     handler(val, old) {
        //         this.activity_name = val;
        //     },
        //     immediate: true // 是否首次执行一次
        // },

        // disabled: {
        //     handler(val, old) {
        //         this.is_disabled = val;
        //     },
        //     immediate: true // 是否首次执行一次
        // }
    },
    methods: {
        changeTag(e: any) {
            if (this.disabled) return;
            const { value } = e.target.dataset
            this.value = this.value == value ? '' : value
            const form = {} as any
            form[this.typeKey] = value
            this.triggerEvent('selectTags', form);
        }
    }
})
