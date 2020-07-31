
import {getCdnUrl} from '@/utils/tools'

interface IDeploy {
    [key: string]: string
}

const _deploy: IDeploy = {
    'bed': '床',
    'closet': '衣柜',
    'tv': '电视',
    'table': '电脑桌',
    'sofa': '椅子',
    'fridge': '冰箱',
    'wash': '洗衣机',
    'aircondition': '空调',
    'fire': '燃气',
    'calorifier': '热水器'
}


export const deployList = Object.keys(_deploy).map((v: string) => {
    return {
        name: _deploy[v],
        key: v,
        url: getCdnUrl(v),
        no_url: getCdnUrl('no_' + v)
    }
})

