import axios from 'axios'
import {Sentence} from '../state'

export const getSentenceList = (index,sentence_num,json)=>({
    type:"GET_SENTENCE_LIST",
    index:index,
    sentence_num:sentence_num,
    sentence_list:json
})

export const getSentence = (index,json)=>({
    type:"GET_SENTENCE",
    index:index,
    sentence:json
})

export function fetchPosts(index,sentence_num){
    return (dispatch)=>{
        return axios('url')
            .then(response=>response,error=>console.log('An error occured.',error))
            .then(json=>dispatch(getSentenceList(index,sentence_num,json)))
    }
}

export function getUnlabeledData(index,sentence_num){
    return (dispatch)=>{
        return axios('url')
            .then(response=>response,error=>console.log('An error occured.',error))
            .then(json=>dispatch(getSentenceList(index,sentence_num,json)))
    }
}

export function uploadLabeledData(sentence){
    return (dispatch)=>{
        return axios('url')
            .then(response=>response,error=>console.log('An error occured.',error))
    }
}

export function uploadLabeledList(sentence){
    return (dispatch,getState)=>{
        return axios('url')
            .then(response=>response,error=>console.log('An error occured.',error))
    }
}




//test function

export function fetchOneUnlabeledSentence(){
    return (dispatch)=>{
        return axios('http://localhost:3001/labeling/getone')
            .then(response=>response,error=>console.log('An error occured',error))
            .then(json=>{
                console.log(json.data)
                if(json.data.code == 601){
                    console.log("hhhh")
                    dispatch(getUnlabeledSentence({data:Sentence}))
                }
                else {
                    dispatch(getUnlabeledSentence(json))
                }
            })
    }
}

export const getUnlabeledSentence = (json)=>({
    type:"GET_UNLABELED_SENTENCE",
    data:json.data
})


export function updateSentenceById(sentence){
    return (dispatch)=>{
        return axios.post('http://localhost:3001/labeling/updateone',sentence)
            .then(res=>{
                console.log('res=>',res)
                return res
            },error=>console.log('An error occured',error))
            .then((res)=>dispatch(testUpdate(res)))
    }
}

export const testUpdate=(sentence)=>({
    type:'TEST_UPDATE',
    sentence:sentence
})