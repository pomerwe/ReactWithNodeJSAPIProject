import {TOGGLE_MENU} from '../actions/header/toggle-menu'

export default function headerReducer(state = {}, {type, payload}){
  
    switch(type){
      case TOGGLE_MENU:
      {
        return payload.sideMenuIsActive
      }
      default:
      {
        return state
      }
    }
  }