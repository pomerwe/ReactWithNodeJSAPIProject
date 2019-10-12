import {HEADER_ACTION} from '../actions/header/header-action'

export default function headerReducer(state = {}, {type, payload}){
  
    switch(type){
      case HEADER_ACTION:
      {
        return payload
      }
      default:
      {
        return state
      }
    }
  }