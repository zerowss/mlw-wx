import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        activityName: {
            type: String,
            value: ''
        },
        isActivited: {
            type: Boolean,
            value: false
        },
        height: {
            type: Number,
            value: 16
        },
        fontSize: {
            type: Number,
            value: 12
        },
        bgColor: {
            type: String,
            value: '#F3F9F9'
        },
        wColor: {
            type: String,
            value: '#333333'
        },
        padding: {
            type: Array,
            value: [6, 14]
        },
        disabled: {
            type: Boolean,
            value: false
        }
    },
    data: { activity_name: '', is_activited: false },
    computed: {
        currentClass() {
            return this.is_activited ? 'activity-tag activited' : 'activity-tag';
        },
        styleObj() {
            return {
                height: this.height * 2 + 'rpx',
                fontSize: this.fontSize * 2 + 'rpx',
                backgroundColor: this.bgColor,
                color: this.wColor,
                padding: this.padding.map((v:number) => v * 2 + 'rpx').join(' ')
            }
        }
    },
    watch: {
        activityName: {
            handler(val, old) {
                this.activity_name = val;
            },
            immediate: true // 是否首次执行一次
        },
        is_activited: {
            handler(val, old) {
                this.is_activited = val;
            },
            immediate: true // 是否首次执行一次
        }
    },
    methods: {
        changeTag() {
            if (this.disabled) return;
            this.is_activited = !this.is_activited;
            this.triggerEvent('selectTags', { activityName: this.activity_name });
        }
    }
})
