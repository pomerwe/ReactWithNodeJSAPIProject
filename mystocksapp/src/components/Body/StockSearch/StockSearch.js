import React from 'react'
import "./StockSearch.css"
import { connect } from 'react-redux'
import { stockSearchAction, 
        setStockLogoImage, 
        setCompanyDescription, 
        setStockQuotes, 
        setChartParams,
        setCurrentCompany,
        setCompanySearchName,
        setChartRange } from '../../../actions/stockSearch/stock-search-action'
import StockChart from './StockChart'
import { HttpService } from '../../../services/HttpService'
var companies = [];


class StockSearch extends React.Component{


    constructor(){
        super()
        this.http = new HttpService();
    }


    getImageLogo(symbol){
        var path = `/getCompanyLogo/${symbol}`
        this.http.get(path)
        .then(res=>{
            var imgUrl = res.data.url
            this.props.setStockLogoImage(imgUrl)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    getCompanies(){
        if(this.props.companySearchName !== ''){
        var path = `/allStocks/${this.props.companySearchName}`
        this.http.get(path)
                .then(res=>{
                    companies = res.data
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    }

    getCompanyInfo(symbol){
        var path = `/companyInfo/${symbol}`
        this.http.get(path)
            .then(res=>{
                let description = res.data
                this.props.setCompanyDescription(description)
            })
            .catch(error=>{
                console.log(error);
            })
    }

    getStockQuote(symbol){
            var path = `/stock/getQuote/${symbol}`
            this.http.get(path)
            .then(res=>{
                let values = res.data
                console.log({...values})
                this.props.setStockQuotes(values)
            })
            .catch(error=>{
                console.log(error);
            })
    }

    getChartValues(symbol){
        var path=`/getChartValues/${symbol}/${this.props.currentChartRange}`
        this.http.get(path)
            .then(res=>{
                let values = res.data
                this.props.setChartParams(values)
            })
            .catch(error=>{
                console.log(error);
            })
    }

    onStockSelected = (company) =>{
        this.props.setCurrentCompany(company)
        this.getImageLogo(company.symbol)
        this.getCompanyInfo(company.symbol)
        this.getStockQuote(company.symbol)
        this.getChartValues(company.symbol)
    }
    
    onInputChange(companyName){
        this.props.setCompanySearchName(companyName)
    }

    onChartRangeChange(range){
        this.props.setChartRange(range)
        this.getChartValues(this.props.currentCompany.symbol)
    }

    render(){
        return(
            <div>
                <div style={{marginBottom:30+'px'}}>
                    <input placeholder={'Pesquisar ações...'} className="stocksInput" onKeyUp={(ev) => this.onInputChange(ev.target.value)}>
                    </input> 
                    <button onClick={() => this.getCompanies()}>
                    Pesquisar
                    </button>
                </div>
                <div className= 'stocksContainer'>
                    {this.props.companySearchName !== '' ?
                        companies.map(
                            (company,key)=>
                                <div onClick ={() => this.onStockSelected(company)} key ={key} className ={`stocksContainerItem ${companies.indexOf(company) % 2 ? 'dark' : 'light'}`}>
                                    <div style={{display:'inline-block',width:20+'%',alignItems:'middle'}}>
                                        <span className='stocksContainerItemSymbol'>{company.symbol}</span>
                                    </div>
                                    <div style={{display:'inline-block',width:80+'%'}}>
                                        <span className='stocksContainerItemName'>{company.name}</span>
                                    </div>
                                </div>
                        )
                        : null
                    }
                </div>
                <div className="stocksChart">
                    <div className="stocksChartContent">
                        <div style={{margin:3+'px',marginBottom:25+'px', textAlign:'center'}}>
                            <span className='rangeSelectLabel'>Pesquisar por: </span>
                            <div onClick={() => this.onChartRangeChange("day")} className={`rangeButton start ${(this.props.currentChartRange === 'day' ? 'selected' :  '')}`}>Dia</div>
                            <div onClick={() => this.onChartRangeChange("month")} className={`rangeButton middle ${(this.props.currentChartRange === 'month' ?  'selected' :  '')}`}>Mês</div>
                            <div onClick={() => this.onChartRangeChange("year")} className={`rangeButton end ${(this.props.currentChartRange === 'year' ?  'selected' :  '')}`}>Ano</div>
                        </div>
                        {this.props.currentChartParams !== undefined 
                            ? <StockChart data = {this.props.currentChartParams} currentValue={this.props.currentCompany.currentValue}/>  : null
                        }
                    </div>
                </div>
                {
                    (this.props.currentCompany.name !== '' &&
                    this.props.currentCompany.companyLogo !== '' &&
                    this.props.currentCompany.description !== ''  &&
                    this.props.currentCompany.currentValue !== undefined &&
                    this.props.currentCompany.highValue !== undefined && 
                    this.props.currentCompany.lowValue !== undefined)
                    ?
                    <div className="stocksInfo">
                        <div className="stocksInfoContent">
                            <div className="logoNameDiv">
                                <div className='logoDiv' style={{backgroundImage:`url(${this.props.currentCompany.companyLogo})`}}>
                                    
                                </div>
                                
                                <span className='companyName'>{this.props.currentCompany.name}</span>
                            </div>
                            <div className="currentValueDiv">
                                <span className='currentValueLabel'>Valor atual:</span>
                                <span className='currentValue'>{'$'+this.props.currentCompany.currentValue}</span>
                            </div>
                            <div className="descriptionDiv">
                                <span className="description">{this.props.currentCompany.description}</span>
                            </div>
                            <div className="rangeValueDiv">
                                <span className='maxValueLabel'>Valor máximo:</span>
                                <span className='maxValue'>{'$'+this.props.currentCompany.highValue}</span>
                                <span className='minValueLabel'>Valor mínimo:</span>
                                <span className='minValue'>{'$'+this.props.currentCompany.lowValue}</span>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.stockSearch
    }
}

const mapActionsToProps = {
    onStockSearchChange: stockSearchAction,
    setStockLogoImage: setStockLogoImage,
    setCompanyDescription:setCompanyDescription,
    setStockQuotes:setStockQuotes,
    setChartParams:setChartParams,
    setCurrentCompany:setCurrentCompany,
    setCompanySearchName:setCompanySearchName,
    setChartRange:setChartRange
}

export default connect(mapStateToProps,mapActionsToProps)(StockSearch)