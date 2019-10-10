import React from 'react'
import MenuItem from './MenuItem/MenuItem'
import PropTypes from 'prop-types'
import './SideMenu.css'

class SideMenu extends React.Component{

    constructor(props){
        super(props)
        this.itens = this.props.itens;
    }

    render(){
        return (
            <div id={this.props.id} hidden className = 'sideMenu'>
                {this.itens.map(item=>
                   <MenuItem name = {item.name} key = {this.itens.indexOf(item)} />
                )}
            </div>
        )
    }
}

SideMenu.propTypes = {
    itens: PropTypes.array.isRequired
}

export default SideMenu