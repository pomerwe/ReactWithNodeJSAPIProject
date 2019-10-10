import React from 'react'
import MenuItem from './MenuItem/MenuItem'
import PropTypes from 'prop-types'
import './SideMenu.css'

class SideMenu extends React.Component{

    constructor(props){
        super(props)
        this.routes = this.props.routes;
    }

    render(){
        return (
            <div id={this.props.id} hidden className = 'sideMenu'>
                {this.routes.map(route=>
                   <MenuItem name = {route.name} path = {route.path} key = {this.routes.indexOf(route)} />
                )}
            </div>
        )
    }
}

SideMenu.propTypes = {
    routes: PropTypes.array.isRequired
}

export default SideMenu