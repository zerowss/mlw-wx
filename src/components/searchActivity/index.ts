import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        activities: {
            type: Object,
            value: {
                query: 'activities',
                selections: []
            }
        }
    },
    data: { value: '' },
    methods: {
        handleTags(e: any) {
            const { value,key } = e.target.dataset
            this.value = this.value == value ? '' : value
            const form = {} as any
            form[key] = value
            this.triggerEvent('selectTags', form);
        }
    }
})
