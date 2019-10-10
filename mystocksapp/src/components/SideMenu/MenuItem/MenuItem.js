import React from 'react'
import PropTypes from 'prop-types'
import './MenuItem.css'
var MenuItem = (props) =>{
    return(
        <div className='menuItem' onClick = {props.onClick}>
            <span className='label'>{props.name}</span>
        </div>
    )
}

MenuItem.propTypes = {
    // onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default MenuItem