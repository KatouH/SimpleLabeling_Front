import {getSentenceList,uploadLabeledData} from '../actions'
import { combineReducers } from 'redux'
import {DefaultState} from '../state'

function LabelReducer(state=DefaultState,action){
    switch(action.type){
        case'GET_SENTENCE_LIST':
            return Object.assign({},state,{
                index:action.action.index,
                sentence_num:action.sentence_num,
                sentence_list:action.sentece
            })
        case 'GET_SENTENCE':
            return Object.assign({}.state,{
                index:action.index,
                sentence:action.sentece
            })
        default:
            return state
    }
}

export default combineReducers({
    LabelReducer
})