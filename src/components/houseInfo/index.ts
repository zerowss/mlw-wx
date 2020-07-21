import { createComponent } from '@mpxjs/core'
createComponent({
    properties: {
        houseInfo: {
            type: Object,
            value: {
                tags: []
            }
        }
    },
    data: {  },
    computed: {
        isShowTags(){
            return this.houseInfo.tags && this.houseInfo.tags.length > 0;
        }
    },
    watch: {

    },
    methods: {

    }
})
