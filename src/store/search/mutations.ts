// mutation 必须是同步函数
import {IPayload,SearchTypes} from '../types'
export default {
    changeCityName(state:SearchTypes.IState, payload:IPayload) {
        state.cityName = payload.name
    }
}
