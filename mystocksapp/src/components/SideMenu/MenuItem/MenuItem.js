import React from 'react'
import PropTypes from 'prop-types'
import './MenuItem.css'
import {Link} from 'react-router-dom'

var MenuItem = (props) =>{
    return(
        <Link to={props.path}  style={{ textDecoration: 'none' }}>
        <div className='menuItem' onClick = {props.onClick}>
           <span className='label'>{props.name}</span>
        </div>
        </Link>
    )
}

MenuItem.propTypes = {
    // onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default MenuItem