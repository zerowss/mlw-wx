import { createComponent } from '@mpxjs/core'
import { _statusColors } from "@/config"
createComponent({
    properties: {
        houseInfo: {
            type: Object,
            value: {
                activities: []
            }
        },
        showStatus:{
            type: Boolean,
            value: false
        }
    },
    data: {
        _statusColors
    },
    computed: {
        isShowTags() {
            return this.houseInfo.activities && this.houseInfo.activities.length > 0;
        }
    },
    watch: {

    },
    methods: {

    }
})
