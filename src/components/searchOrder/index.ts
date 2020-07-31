import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        sorters: {
            type: Array,
            value: []
        }
    },
    data: { sort: '', order: '' },
    methods: {
        handleClick(e: any) {
            const { sort, order } = e.target.dataset
            this.sort = sort
            this.order = order
            const form = {
                sort,
                order
            }
            this.triggerEvent('selectSorters', form);
        }
    }
})
