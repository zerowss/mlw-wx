import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        room: {
            type: Object,
            value: {
                query: 'room',
                selections: []
            }
        }
    },
    data: {
        rentTypeForm: {} as any
    },
    methods: {
        handleRentType(e: any) {
            const { key, type, typeValue, value } = e.target.dataset
            if(this.rentTypeForm['typeValue'] == typeValue && this.rentTypeForm['value'] == value){
                this.rentTypeForm = {
                    key,
                    type,
                    typeValue: '',
                    value: ''
                }
            }else{
                this.rentTypeForm = e.target.dataset
            }
        },
        handlRestRentType(e: any) {
            console.log(e, 'eee');
            this.rentTypeForm = e.target.dataset
        },
        handlRentTypeOk(e: any) {
            const { key, type, typeValue, value } = this.rentTypeForm
            const form = {} as any
            form[key] = value
            form[type] = typeValue
            this.triggerEvent('selectRentType', form)
        },
    }
})
