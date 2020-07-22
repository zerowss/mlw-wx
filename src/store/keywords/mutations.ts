// mutation 必须是同步函数
import { IPayload, KeywordsTypes } from '../types'
export default {
    changeCityName(state: KeywordsTypes.IState, payload: IPayload) {
        state.keywords = payload.keywords
    }
}
