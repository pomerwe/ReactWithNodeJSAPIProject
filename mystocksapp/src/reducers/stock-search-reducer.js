import {STOCK_SEARCH_ACTION} from '../actions/stockSearch/stock-search-action'

export default function stockSearchReducer(state = {}, {type, payload}){
  switch(type){
      case STOCK_SEARCH_ACTION:{
        return payload 
      }
      default:{
        return state;
      }
    }
  } 