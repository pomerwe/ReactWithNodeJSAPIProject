export const STOCK_SEARCH_ACTION = 'stock-search:action'

export function stockSearchAction(stockSearch){

    var returnObj = {
        type:STOCK_SEARCH_ACTION,
        payload:{...stockSearch}
    }

    
    return returnObj;
}