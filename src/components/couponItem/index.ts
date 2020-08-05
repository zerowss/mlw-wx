import { createComponent } from '@mpxjs/core'
import { getCdnUrl } from '@/utils/tools'
createComponent({
    properties: {
        coupon: {
            type: Object,
            value: {
                continued_date: '',
                coupon_name: '',
                coupon_description: '',
                coupon_type: '',
                deduction_amount: '',
                use_condition: '',
                direct_discount: ''
            }
        },
        disabled: {
            type: Boolean,
            value: false
        }
    },
    data: { is_show_more: false, mInner: '', mInnerSub: '' },
    lifetimes: {
        attached() {
            this.getInner()
        },
    },
    computed: {
        statusImgUrl() {
            const { coupon_status_used, coupon_status_expired } = this.coupon
            if (coupon_status_used && coupon_status_used == '2') {
                return getCdnUrl('icon_yishiyong')
            }
            if (coupon_status_expired && coupon_status_expired == '-1') {
                return getCdnUrl('icon_yiguoqi')
            }
            return getCdnUrl('icon_yishiyong')
        },
    },
    methods: {
        showMore() {
            this.is_show_more = !this.is_show_more
        },
        getInner() {
            const { coupon_type, deduction_amount, use_condition, direct_discount } = this.coupon
            if (coupon_type == "1") {
                this.mInner = `${deduction_amount}`;
                this.mInnerSub = `满${use_condition}可用`;
            } else if (coupon_type == "2") {
                this.mInner = `${deduction_amount}`;
                this.mInnerSub = "立减";
            } else if (coupon_type == "3") {
                this.mInner = direct_discount;
            } else if (coupon_type == "4") {
                this.mInner = "免单";
            }
        }
    }
})
