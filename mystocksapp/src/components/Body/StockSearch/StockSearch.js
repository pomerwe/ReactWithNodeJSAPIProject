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
        setChartRange,
        setCompaniesList,
        setLatestNews} from '../../../actions/stockSearch/stock-search-action'
import StockChart from './StockChart'
import { HttpService } from '../../../services/HttpService'
import * as moment from 'moment';


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
                    this.props.setCompaniesList(res.data)
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
        this.getLatestNews(company.symbol)
    }
    
    onInputChange(companyName){
        this.props.setCompanySearchName(companyName)
    }

    onChartRangeChange(range){
        this.props.setChartRange(range)
        this.getChartValues(this.props.currentCompany.symbol)
    }

    getLatestNews(symbol){
        var path = `/getLatestNews/${symbol}`
        this.http.get(path)
            .then(res=>{
                this.props.setLatestNews(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                <div style={{marginBottom:30+'px'}}>
                    <input placeholder={'Pesquisar ações...'} className="stocksInput" onKeyUp={(ev) => this.onInputChange(ev.target.value)}>
                    </input> 
                    <button className='searchButton' onClick={() => this.getCompanies()}>
                    Pesquisar
                    </button>
                </div>
                <div className= 'stocksContainer'>
                    {this.props.companySearchName !== '' ?
                        this.props.companies.map(
                            (company,key)=>
                                <div onClick ={() => this.onStockSelected(company)} key ={key} className ={`stocksContainerItem ${this.props.companies.indexOf(company) % 2 ? 'dark' : 'light'}`}>
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
                    this.props.currentCompany.previousValue !== undefined &&
                    this.props.currentCompany.highValue !== undefined && 
                    this.props.currentCompany.lowValue !== undefined )
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
                                <span className='currentValueLabel'>Valor anterior:</span>
                                <span className='currentValue'>{'$'+this.props.currentCompany.previousValue}</span>
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
                            {this.props.currentCompany.latestNews !== undefined 
                                ?
                                this.props.currentCompany.latestNews.map(
                                    (news,key) =>
                                    
                                    <div className='latestNews'  key ={key} >
                                    <span>{key} notícia:</span>
                                    <br></br>
                                    <img src={news.image} style={{maxWidth:'400px', display:'inline-block'}}></img>
                                    <div className='newsContent'>
                                        <p>{news.headline}</p>
                                        <p>{news.source} - { moment(news.datetime).format("DD/MM/YYYY hh:mm") }</p>
                                        <p>Summary:</p>
                                        <div className='newContentSummary'>
                                            <span>{news.summary}</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    </div>
                                )
                                   
                                :
                            null
                            }
                            
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
    setChartRange:setChartRange,
    setCompaniesList:setCompaniesList,
    setLatestNews:setLatestNews
}

export default connect(mapStateToProps,mapActionsToProps)(StockSearch)