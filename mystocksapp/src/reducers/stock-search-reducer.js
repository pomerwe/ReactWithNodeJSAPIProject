import {STOCK_SEARCH_ACTION, 
  STOCK_SEARCH_CURRENTCOMPANY,
   STOCK_SEARCH_CHARTPARAMS, 
   STOCK_SEARCH_CURRENTCOMPANYUPDATE,
   STOCK_SEARCH_COMPANYSEARCHNAME,
   STOCK_SEARCH_CHARTRANGE} from '../actions/stockSearch/stock-search-action'

export default function stockSearchReducer(state = {}, {type, payload}){
  switch(type){
      case STOCK_SEARCH_ACTION:{
        return {...payload} 
      }

      
      case STOCK_SEARCH_CURRENTCOMPANY:{
        return {...state, currentCompany:{...payload}}
      }

      case STOCK_SEARCH_CURRENTCOMPANYUPDATE:{
        return {...state, currentCompany:{...state.currentCompany, ...payload}}
      }

      case STOCK_SEARCH_CHARTPARAMS:{
        return {...state, currentChartParams:[...payload.currentChartParams]}
      }

      case STOCK_SEARCH_COMPANYSEARCHNAME:{
        return {...state, companySearchName:payload.companySearchName}
      }

      case STOCK_SEARCH_CHARTRANGE:{
        return {...state, currentChartRange:payload.currentChartRange}
      }
      default:{
        return state;
      }
    }
  } 