import { createComponent } from '@mpxjs/core'
import { _statusColors } from "@/config"
createComponent({
    properties: {
        houseInfo: {
            type: Object,
            value: {
                tags: []
            }
        }
    },
    data: {
        _statusColors
    },
    computed: {
        isShowTags() {
            return this.houseInfo.tags && this.houseInfo.tags.length > 0;
        }
    },
    watch: {

    },
    methods: {

    }
})
