import React from 'react'
import './Header.css';
import menu from '../../assets/menu.png'
import SideMenu from '../SideMenu/SideMenu'

class Header extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            menuActive: false
        }
        this.itens = [
            {
                name:'Pesquise Ações'
            }, 
            {
                name:'Saiba o último preço'
            }, 
            {
                name:'Sobre'
            }
        ]
    }
    
    toggleMenu = () =>{
        this.setState(state=>{
            state.menuActive = !state.menuActive
            
            document.getElementById('sideMenu').hidden = !this.state.menuActive
        
            if(this.state.menuActive){
                document.getElementById('body').style.paddingLeft = 250 + 'px';
            }
            else{
            document.getElementById('body').style.paddingLeft = 7 + '%';
            }
        })
    }

    render(){
        return(
            <div className='container'>
                <button onClick={this.toggleMenu} className='menuButton'>
                    <img alt='menu' className= 'invert' src={menu}>
                    </img>
                </button>
                
                <h1 className = 'title'>MyStocksApp</h1>
                <SideMenu id='sideMenu' itens={this.itens}/>
                
            </div>
        )
    }
    
}

export default Header