import {STOCK_SELECTED} from '../actions/stockSearch/stock-selected-action'

export default function stockSearchReducer(state = {}, {type, payload}){
  switch(type){
      case STOCK_SELECTED:{
        return payload 
      }
      default:{
        return state;
      }
    }
  } 