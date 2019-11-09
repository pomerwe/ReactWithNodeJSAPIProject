import {STOCK_SEARCH_ACTION, STOCK_SEARCH_CURRENTCOMPANY, STOCK_SEARCH_CHARTPARAMS} from '../actions/stockSearch/stock-search-action'

export default function stockSearchReducer(state = {}, {type, payload}){
  switch(type){
      case STOCK_SEARCH_ACTION:{
        return {...payload} 
      }

      case STOCK_SEARCH_CURRENTCOMPANY:{
        return {...state, currentCompany:{...state.currentCompany, ...payload}}
      }

      case STOCK_SEARCH_CHARTPARAMS:{
        return {...state, currentChartParams:[...payload.values]}
      }
      default:{
        return state;
      }
    }
  } 