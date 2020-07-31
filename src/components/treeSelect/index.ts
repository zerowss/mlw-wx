import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        districts: {
            type: Array,
            value: []
        },
        subways: {
            type: Array,
            value: []
        }
    },
    data: {
        subject: [
            {
                title: '不限',
                value: ''
            },
            {
                title: '区域',
                value: 'districts'
            },
            {
                title: '地铁',
                value: 'subway'
            }
        ],
        subject_selected: '',
        district_id: '',
        biz_area_id: '',
        line_id: '',
        station_id: ''
    },
    computed: {
        subjectClass() {
            let _class = 'tree-subject';
            if (this.subject_selected && !this.district_id && !this.line_id) {
                _class += ' w50'
            }
            if (this.subject_selected && ((this.district_id && this.district_id != '0') || (this.line_id && this.line_id != '0'))) {
                _class += ' w33'
            }
            return _class
        },
        biz_area() {
            if (this.district_id == '0') {
                return []
            }
            const biz_area: any = this.districts.find((v: any) => v.district_id == this.district_id)
            return biz_area ? biz_area.biz_area : []
        },
        station_data() {
            if (this.line_id == '0') {
                return []
            }
            const station_data: any = this.subways.find((v: any) => v.id == this.line_id)
            return station_data ? station_data.stations : []
        }
    },
    methods: {
        handleSubject(e: any) {
            this.subject_selected = e.target.dataset.value
            if (this.subject_selected === 'districts') {
                this.line_id = ''
                this.station_id = ''
            } else if (this.subject_selected === 'subway') {
                this.district_id = ''
                this.biz_area_id = ''
            } else {
                this.line_id = ''
                this.station_id = ''
                this.district_id = ''
                this.biz_area_id = ''
                const form = {
                    line_id: '',
                    station_id: '',
                    district_id: '',
                    biz_area_id: ''
                }
                this.triggerEvent('selectPosition', form);
            }
        },
        handleDistricts(e: any) {
            this.district_id = e.target.dataset.value
            this.biz_area_id = ''
            if (this.district_id == '0') {
                const form = {
                    district_id: '',
                    biz_area_id: '',
                    line_id: '',
                    station_id: '',
                }
                this.triggerEvent('selectPosition', form);
            }
        },
        handleBizArea(e: any) {
            this.biz_area_id = e.target.dataset.value
            const form = {
                district_id: this.district_id,
                biz_area_id: this.biz_area_id,
                line_id: '',
                station_id: '',
            }
            this.triggerEvent('selectPosition', form);
        },
        handleLine(e: any) {
            this.line_id = e.target.dataset.value
            this.station_id = ''
            if (this.line_id == '0') {
                const form = {
                    line_id: '',
                    station_id: '',
                    district_id: '',
                    biz_area_id: '',
                }
                this.triggerEvent('selectPosition', form);
            }
        },
        handleStation(e: any) {
            this.station_id = e.target.dataset.value
            const form = {
                line_id: this.line_id,
                station_id: this.station_id,
                district_id: '',
                biz_area_id: '',
            }
            this.triggerEvent('selectPosition', form);
        }
    }
})
