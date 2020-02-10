import React from 'react'
import {List,Typography,Radio,Menu,Layout,Button,Icon,BackTop} from 'antd'
const { Header, Content, Footer } = Layout;

// const dataSet = [
//     '备胎是硬伤！',
// '要说不满意的话，那就是动力了，1.5自然吸气发动机对这款车有种小马拉大车的感觉。如今天气这么热，上路肯定得开空调，开了后动力明显感觉有些不给力不过空调制冷效果还是不错的。',
// '油耗显示13升还多一点，希望慢慢下降。没有倒车雷达真可恨',
// '空调不太凉，应该是小问题。',
// '1、后排座椅不能平放；2、科技感不强，还不如百万帝豪，最希望增加车联网的车机。像你好博越一样。3、全景摄像头不清楚，晚上基本上用处不大',
// '车子外观好看，车内空间大。',
// '最满意的真的不只一点，概括一下最满意的就是性价比了。ps:虽然没有s7性价比高(原厂记录仪,绿净)',
// '底盘调教的很低，坐的感觉有些别扭，视角不是很好。',
// '开空调时，一档起步动力不足。车子做工有点马虎。',
// '那当然是外观了，换了圈加了尾翼，回头率直线上升。还有就是可玩性，晚上没事叫上车友漂个定圆，玩玩甩尾掉头，对得起大玩具的称号。',
// '最满意的就是动力了和外观了',
// '这个价位级别的车内饰和中控基本上都是硬塑料了，不过车内的储物空间的确非常多，这点非常满意！',
// '地盘部分裸漏应加强防锈处理，发动机声音大应加强隔音处理！储物空间太小，只有一个杯座很是不方便。',
// '外形霸气，内饰科技感很强。',
// '车的内部空间比较大。而且有隔层。',
// '我是最爱此车的外观大气！车子给人的感觉就是舒适敞亮。车身的线条流利，外观看起来很时尚，很年轻化，给人的感觉还是挺棒的。',
// '配置太少了，做工太差，噪音有点多。',
// '适合家用，有里有面，有品质不奢华。',
// '品牌力吧在我们这小城市虽然五系也是街车但给人的感觉也还是不一样我二十开这个出去也还是比较有面儿',
// '里里外外做工差，皮薄，油漆一碰就掉，内饰太单调。',
// '最满意的就是油耗了，这么大的车，油耗才7个多，甚至我跑到过6个，小日本不咋得，但是造的车真心省油。',
// '整个车的空间比较的大，所以大家都觉得无论是驾驶空间还是乘坐空间，都比较的舒适。外观很有感觉，看起来很高大上。内饰在小细节上的处理让我很满意，油耗在目前为止还是有点大，相对车重来说能够理解。',
// '最满意的就是外观了，当时选择这款车的时候就很喜欢他的外观，还有就是舒适度比较满意。',
// '空间，动力，油耗，外观……',
// ]

const dataSet = []
export default class TestLabeling extends React.Component{

    constructor(props){
        super(props)
        console.log(this.props.data.sentence.replace(/[||]/g,""))
        this.state={
            sentence:this.props.data.sentence.replace(/[||]/g,""),
            word_list:this.props.data.sentence.split("||")
        }
        this.nextSentenceT = this.nextSentenceT.bind(this)
    }

    tag_map = new Map()
    tag_list = ''
    sentence_map = new Map()

    onChange = (item,event)=>{
        this.tag_map.set(item,event.target.value.toString().repeat(item.length))
        console.log(this.tag_map.get(item))
    }

    componentWillMount = ()=>{
       // this.state.word_list = dataSet[this.state.index].split('')
        this.setTagDefault()
    }

    nextSentence = (event)=>{
        this.state.word_list.forEach((val,index)=>{
            this.tag_list += this.tag_map.get(val)
        })
        // update the sentence
        //this.sentence_map.set(dataSet[this.state.index],this.tag_list)
        this.props.getOneUnLabeledSentence()
        console.log(this.props.sentence)
        this.setState((preState)=>({index:preState.index+1,word_list:dataSet[preState.index+1].split('')}),()=>{
            this.tag_list = ''
            this.setTagDefault()
            console.log(this.sentence_map.get(dataSet[this.state.index-1]))
        })
    }

    async nextSentenceT(event){
        this.state.word_list.forEach((val,index)=>{
            this.tag_list += this.tag_map.get(val)
        })
        await this.props.getOneUnLabeledSentence()
        console.log(this.props.data.sentence)
        this.setState((preState)=>({
            sentence:this.props.data.sentence.replace(/[||]/g,""),
            word_list:this.props.data.sentence.split('||')
        }),()=>{
            this.tag_list=''
            this.setTagDefault()
        })
    }

    setTagDefault(){
        this.tag_map.clear()
        this.state.word_list.forEach((val)=>{
            this.tag_map.set(val,'3')
        })
    }

    render(){
        const {word_list} = this.state
        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px'}}>
                    <div style={{backgroundColor:'#fff',padding:40,minHeight:800}}>
                        <List
                        bordered={true}
                        header={<div>
                            {this.state.sentence}
                            <div style={{display:'flex',justifyContent:'flex-end'}}>
                            <Button.Group >
                            <Button type="primary">
                              无效数据
                            </Button>
                            <Button type="primary" onClick={this.nextSentenceT}>
                              下一条
                              <Icon type="right" />
                            </Button>
                          </Button.Group>
                          </div>
                        </div>}
                        dataSource = {word_list}
                        style={{fontSize:'30px'}}
                        renderItem = {
                            item=>(
                                <List.Item style={{fontSize:'30px'}}>
                                    <Typography.Text mark></Typography.Text>{item}
                                    <Radio.Group key={item} onChange={this.onChange.bind(this,item)}  defaultValue='3' style={{float:'right'}}>
                                            <Radio.Button value='0'>B</Radio.Button>
                                            <Radio.Button value='1'>I</Radio.Button>
                                            <Radio.Button value='2'>E</Radio.Button>
                                            <Radio.Button value='3'>O</Radio.Button>
                                            <Radio.Button value='4'>S</Radio.Button>
                                        </Radio.Group>
                                </List.Item>
                            )
                        }
                    />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                <BackTop visibilityHeight={300}/>
            </Layout>
        )
    }
}