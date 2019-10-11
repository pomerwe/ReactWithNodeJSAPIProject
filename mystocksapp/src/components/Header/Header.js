import React from 'react'
import './Header.css';
import menu from '../../assets/menu.png'
import SideMenu from '../SideMenu/SideMenu'
import { connect } from 'react-redux'
import toggleMenu from '../../actions/header/toggle-menu'

class Header extends React.Component{
    
    constructor(props){
        super(props)
        this.routes = [
            {
                name:'Pesquise Ações',
                path: '/stocks'
            }, 
            {
                name:'Saiba o último preço',
                path:'/stockPrice'
            }, 
            {
                name:'Sobre',
                path: '/about'
            }
        ]
    }
    
    onToggleMenu = () =>{
        this.props.header.sideMenuIsActive = !this.props.header.sideMenuIsActive
        this.props.onToggleMenu(this.props.header)

        if(this.props.header.sideMenuIsActive){
            document.getElementById('body').style.paddingLeft = 250 + 'px';
        }
        else{
        document.getElementById('body').style.paddingLeft = 7 + '%';
        }
    }

    render(){
        return(
            <div className='container'>
                <button onClick={this.onToggleMenu} className='menuButton'>
                    <img alt='menu' className= 'invert' src={menu}>
                    </img>
                </button>
                
                <h1 className = 'title'>MyStocksApp</h1>
                {this.props.header.sideMenuIsActive === true ? <SideMenu routes={this.routes}/>  : null}
                
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
    onToggleMenu:toggleMenu
}

export default connect(mapStateToProps,mapActionToProps)(Header)
