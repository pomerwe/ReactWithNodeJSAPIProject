export const STOCK_SEARCH_ACTION = 'stock-search:action'
export const STOCK_SEARCH_CURRENTCOMPANY = 'stock-search:currentCompany'
export const STOCK_SEARCH_CHARTPARAMS = 'stock-search:chartParams'

export function stockSearchAction(stockSearch){

    var returnObj = {
        type:STOCK_SEARCH_ACTION,
        payload:{...stockSearch}
    }
    return returnObj;
}

export function setStockLogoImage(companyLogo){

    var returnObj = {
        type:STOCK_SEARCH_CURRENTCOMPANY,
        payload:{companyLogo}
    }
    return returnObj;
}


export function setCompanyDescription(description){

    var returnObj = {
        type:STOCK_SEARCH_CURRENTCOMPANY,
        payload:{description}
    }
    return returnObj;
}

export function setStockQuotes(values){

    var returnObj = {
        type:STOCK_SEARCH_CURRENTCOMPANY,
        payload:{...values}
    }
    return returnObj;
}


export function setChartParams(values){

    var returnObj = {
        type:STOCK_SEARCH_CHARTPARAMS,
        payload:{values}
    }
    return returnObj;
}