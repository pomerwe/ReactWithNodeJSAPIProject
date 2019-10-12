export const STOCK_SELECTED = 'stock-search:stockSelected'

export function stockSelected(stockSearch){

    var returnObj = {
        type:STOCK_SELECTED,
        payload:{...stockSearch}
    }

    
    return returnObj;
}

export function companiesLoaded(stockSearch){

    var returnObj = {
        type:STOCK_SELECTED,
        payload:{...stockSearch}
    }

    
    return returnObj;
}