export let  dataStruct={
    index:0,
    sentence_num:100,
    sentence:new Map()
}
export let DefaultState = {
    index:0,
    sentence:''
}

export let Sentence = {
    id:0,
    sentence:'',
    tag:'',
    isLabeled:0,
    isSegment:0,
    isEffective:1
}