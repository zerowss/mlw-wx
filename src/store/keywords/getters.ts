import { KeywordsTypes } from '../types'
export default {
    getKeywords(state: KeywordsTypes.IState) {
        return state.keywords.replace('市', '')
    }
}
