import { createStore } from '@mpxjs/core'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default createStore({
    state,
    getters,
    mutations,
    actions
})