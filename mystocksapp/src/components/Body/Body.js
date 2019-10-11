import React from 'react'
import "./Body.css"
import About from './About/About'
import { Route } from "react-router-dom";
import StockSearch from "./StockSearch/StockSearch"




class Body extends React.Component{

   

    render(){
        return(
            <div id='body' className='body'>
                <div className={'container'}>
                    <div className = 'mainContent'>
                    <Route path="/about">
                        <About />   
                    </Route>
                    <Route path="/stocks">
                        <StockSearch />
                    </Route>
                    </div>
                </div>
            </div>
        )
    }
}



export default Body