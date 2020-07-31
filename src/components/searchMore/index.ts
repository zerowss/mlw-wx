import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        roomFeatures: {
            type: Object,
            value: {
                query: 'room_features',
                selections: []
            }
        },
        buildArea: {
            type: Object,
            value: {
                query: 'build_area',
                selections: []
            }
        },
        isExpect: {
            type: Object,
            value: {
                query: 'is_expect',
                selections: []
            }
        },
    },
    data: {
        room_features: [] as string[],
        build_area: '',
        is_expect: ''
    },
    methods: {
        handleRoomFeatures(e: any) {
            const { key, value } = e.target.dataset
            const index = this.room_features.indexOf(value)
            if (index > -1) {
                this.room_features.splice(index, 1)
            } else {
                this.room_features.push(value)
            }
        },
        handleBuildArea(e: any) {
            const { key, value } = e.target.dataset
            this.build_area = this.build_area == value ? '' : value
        },
        handleIsExpect(e: any) {
            const { key, value } = e.target.dataset
            this.is_expect = this.is_expect == value ? '' : value
        },
        handlRestRentType() {
            this.room_features = []
            this.is_expect = ''
            this.build_area = ''
        },
        handlRentTypeOk(){
            this.triggerEvent('selectMore', {
                room_features: this.room_features,
                is_expect: this.is_expect,
                build_area: this.build_area
            })
        }
    }
})
