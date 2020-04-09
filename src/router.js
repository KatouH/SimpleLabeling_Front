import React from 'react'
import App from './App'

import {BrowserRouter as Router, Route} from 'react-router-dom'


export default class labelingRouter extends React.Component{
    render(){
        return(
            <Router>
                <Route path='/' component={App}/>
            </Router>
        )
    }
}

