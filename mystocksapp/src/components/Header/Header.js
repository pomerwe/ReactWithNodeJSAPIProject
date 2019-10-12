import React from 'react'
import './Header.css';
import { connect } from 'react-redux'
import headerAction from '../../actions/header/header-action'
import { Link } from 'react-router-dom'
class Header extends React.Component{
    
    constructor(props){
        super(props)
        this.routes = [
            {
                name:'Pesquisar Ações',
                path: '/stocks'
            }, 
            {
                name:'Sobre',
                path: '/about'
            }
        ]
    }
    

    render(){
        return(
            <div className='container'>
                <span className = 'title'>MyStocksApp</span>
                <div className = 'navigation'>
                    {this.routes.map((route,key)=>
                        <Link key = {key}  className='link' to={route.path}>{route.name}</Link>
                    )}
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        header: state.header
    }
}

const mapActionToProps = {
    onHeaderChange:headerAction
}

export default connect(mapStateToProps,mapActionToProps)(Header)
