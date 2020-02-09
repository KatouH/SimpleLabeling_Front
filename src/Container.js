import {connect} from 'react-redux'
import {uploadLabeledData,getUnlabeledData} from './store/actions'
import TestLabeling from './components/TestLabeling'

const mapStateToProps = (state,ownPrpos)=>({
    sentence_list:state.sentence_list
})

const mapDispatchToProps = (dispatch)=>({
    uploadLabeledData:(labeledData)=>{dispatch(uploadLabeledData(labeledData))},
    getUnLabeledData:(index)=>{dispatch(getUnlabeledData(index))}
})

const LabelingPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestLabeling)
export default LabelingPage