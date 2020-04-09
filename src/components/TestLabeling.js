import React from 'react'
import {List,Typography,Radio,Menu,Layout,Button,Icon,BackTop,message} from 'antd'
const { Header, Content, Footer } = Layout;


const key = 'updatable';

export default class TestLabeling extends React.Component{

    constructor(props){
        super(props)    
        this.state={
            sentence:this.props.data.sentence.replace(/[||]/g,""),
            word_list:this.props.data.sentence?this.props.data.sentence.split("||"):[]
        }
        this.nextSentenceT = this.nextSentenceT.bind(this)
    }

    tag_map = new Map()
    tag_list = ''
    sentence_map = new Map()

    onChange = (item,event)=>{
        this.tag_map.set(item,event.target.value.toString().repeat(item.length))
        
    }

    componentWillMount = ()=>{
        this.setTagDefault()
    }

    async nextSentenceT(event){
        message.loading({content:'Loading...',key});
        this.state.word_list.forEach((val,index)=>{
            this.tag_list += this.tag_map.get(val)
        })
        this.props.updateSentence({
            id:this.props.data.id,
            sentence:this.props.data.sentence,
            tag:this.tag_list,
            isLabeled:1,
            isSegmented:this.props.data.isSegmented,
            isEffective:this.props.data.isEffective
        }).then(()=>{
            this.props.getOneUnLabeledSentence().then(()=>{
                this.setState((preState)=>({
                    sentence:this.props.data.sentence.replace(/[||]/g,""),
                    word_list:this.props.data.sentence?this.props.data.sentence.split("||"):[]
                }),()=>{
                    this.tag_list=''
                    this.setTagDefault()
                })
                message.success({content:'Loaded',key,duration:2})
                if(this.props.data.sentence === ''){message.warning('没有更多了~');return;}
            })
        })
    }

    setInValidSentence = ()=>{
        this.props.updateSentence({
            id:this.props.data.id,
            sentence:this.props.data.sentence,
            tag:this.tag_list,
            isLabeled:0,
            isSegmented:this.props.data.isSegmented,
            isEffective:0
        }).then(()=>{
            this.props.getOneUnLabeledSentence().then(()=>{
                this.setState((preState)=>({
                    sentence:this.props.data.sentence.replace(/[||]/g,""),
                    word_list:this.props.data.sentence?this.props.data.sentence.split("||"):[]
                }),()=>{
                    this.tag_list=''
                    this.setTagDefault()
                })
                if(this.props.data.sentence === ''){message.warning('没有更多了~');return;}
            })
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
                            <Button type="primary" onClick={this.setInValidSentence}>
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