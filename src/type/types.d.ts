// types.d.ts

import { Mpx, MpxComponentIns } from '@mpxjs/core'
import { IParams } from '@/plugin/request'

declare module '@mpxjs/core' {
    // 声明为 Mpx 补充的属性
    interface Mpx {
        requirePlugin?: any
    }
    interface MpxComponentIns {
        $post: (p: IParams) => Promise<any>;
        $get: (p: IParams) => Promise<any>;
        $fetch: (p: IParams) => Promise<any>;
    }
    interface IMixin {
        data?: any;
        properties?: any;
        computed?: any;
        methods?: any;
        [key: string]: any
    }
}
