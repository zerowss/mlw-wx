import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        rentPrice: {
            type: Object,
            value: {
                query: 'base_price',
                selections: []
            }
        }
    },
    data: { rent_price: '' },
    methods: {
        handleClick(e: any) {
            this.rent_price = e.target.dataset.value
            const form = {} as any
            form[e.target.dataset.key] = e.target.dataset.value
            this.triggerEvent('selectRentPrice', form);
        }
    }
})
