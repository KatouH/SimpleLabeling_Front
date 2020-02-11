import {connect} from 'react-redux'
import {uploadLabeledData,getUnlabeledData,fetchOneUnlabeledSentence, updateSentenceById} from './store/actions'
import TestLabeling from './components/TestLabeling'

const mapStateToProps = (state)=>({
    data:state.LabelReducer
})

const mapDispatchToProps = (dispatch)=>({
    uploadLabeledData:(labeledData)=>{dispatch(uploadLabeledData(labeledData))},
    getUnLabeledData:(index)=>{dispatch(getUnlabeledData(index))},
    getOneUnLabeledSentence:()=>{return dispatch(fetchOneUnlabeledSentence())},
    updateSentence:(sentence)=>{return dispatch(updateSentenceById(sentence))}
})

const LabelingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestLabeling)
export default LabelingPage