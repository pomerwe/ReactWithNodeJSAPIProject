export const STOCK_SEARCH_ACTION = 'stock-search:action'
export const STOCK_SEARCH_CURRENTCOMPANYUPDATE = 'stock-search:currentCompanyUpdate'
export const STOCK_SEARCH_CURRENTCOMPANY = 'stock-search:current'
export const STOCK_SEARCH_CHARTPARAMS = 'stock-search:chartParams'
export const STOCK_SEARCH_COMPANYSEARCHNAME = 'stock-search:companySearchName'
export const STOCK_SEARCH_CHARTRANGE = 'stock-search:chartRange'
export const STOCK_SEARCH_COMPANIESLOAD = 'stock-search:companiesLoad'

export function stockSearchAction(stockSearch){

    var returnObj = {
        type:STOCK_SEARCH_ACTION,
        payload:{...stockSearch}
    }
    return returnObj;
}

export function setStockLogoImage(companyLogo){

    var returnObj = {
        type:STOCK_SEARCH_CURRENTCOMPANYUPDATE,
        payload:{companyLogo}
    }
    return returnObj;
}


export function setCompanyDescription(description){

    var returnObj = {
        type:STOCK_SEARCH_CURRENTCOMPANYUPDATE,
        payload:{description}
    }
    return returnObj;
}

export function setStockQuotes(values){

    var returnObj = {
        type:STOCK_SEARCH_CURRENTCOMPANYUPDATE,
        payload:{...values}
    }
    return returnObj;
}

export function setLatestNews(latestNews){

    var returnObj = {
        type:STOCK_SEARCH_CURRENTCOMPANYUPDATE,
        payload:{latestNews}
    }
    return returnObj;
}

export function setCurrentCompany(values){

    var returnObj = {
        type:STOCK_SEARCH_CURRENTCOMPANY,
        payload:{...values}
    }
    return returnObj;
}

export function setChartParams(currentChartParams){

    var returnObj = {
        type:STOCK_SEARCH_CHARTPARAMS,
        payload:{currentChartParams}
    }
    return returnObj;
}

export function setChartRange(currentChartRange){

    var returnObj = {
        type:STOCK_SEARCH_CHARTRANGE,
        payload:{currentChartRange}
    }
    return returnObj;
}

export function setCompanySearchName(companySearchName){

    var returnObj = {
        type:STOCK_SEARCH_COMPANYSEARCHNAME,
        payload:{companySearchName}
    }
    return returnObj;
}


export function setCompaniesList(companies){

    var returnObj = {
        type:STOCK_SEARCH_COMPANIESLOAD,
        payload:{companies}
    }
    return returnObj;
}