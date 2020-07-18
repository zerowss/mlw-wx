import {SearchTypes} from '../types'
export default {
    cityName(state:SearchTypes.IState) {
        return state.cityName.replace('市', '')
    }
}
