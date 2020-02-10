import {getSentenceList,uploadLabeledData} from '../actions'
import { combineReducers } from 'redux'
import {Sentence} from '../state'

function LabelReducer(state=Sentence,action){
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
        case 'GET_UNLABELED_SENTENCE':
            let tmp = Object.assign({},state,action.data)
            console.log(tmp)
            return Object.assign({},state,action.data)
        default:
            return state
    }
}

export default combineReducers({
    LabelReducer
})