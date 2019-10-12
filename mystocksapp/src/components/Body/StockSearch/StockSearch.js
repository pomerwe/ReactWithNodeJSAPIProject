import React from 'react'
import "./StockSearch.css"
import { connect } from 'react-redux'
import { stockSearchAction } from '../../../actions/stockSearch/stock-search-action'
import StockChart from './StockChart'

var companies = [];
const http = require('http');

class StockSearch extends React.Component{


    componentDidMount(){
        // this.onStockSelected(this.props.stockSearch.currentCompany.symbol)
    }

    componentWillUnmount(){
        // this.props.stockSearch.companySearchName = ''
        // this.props.stockSearch.currentCompany ={
        //     symbol:"",
        //     name:"",
        //     description:'',
        //     companyLogo: '',
        //     currentValue:undefined,
        //     highValue:undefined,
        //     lowValue:undefined
        //   }
        this.props.stockSearch.areCompaniesLoaded = false
        // this.props.stockSearch.companySearchName =  ''
        // this.props.stockSearch.currentChartRange = 'month'
        // this.props.stockSearch.currentChartParams = undefined
        
        this.props.onStockSearchChange(this.props.stockSearch)
    }

    getImageLogo(symbol){
        var options = {
            hostname:'127.0.0.1',
            method:'GET',
            path:`/getCompanyLogo/${symbol}`,
            port: 4000,
            headers:{
                'Content-Type': 'application-json'
            }
        }
        var req = http.request(options, res=>{
            var result = '';
        
            res.on('data', chunk=>{
                result += chunk;
            })
        
            res.on('error', error =>{
                return;
            })
        
            res.on('end', ()=>{
                var imgUrl = JSON.parse(result).url;
                this.props.stockSearch.currentCompany.companyLogo = imgUrl;
                this.props.onStockSearchChange(this.props.stockSearch)
                
            })
        })
        
        req.on('error', error=>{
            return;
        })
        
        req.end()
    }

    getCompanies(){

        if(this.props.stockSearch.companySearchName !== ''){
            var options = {
                hostname:'127.0.0.1',
                method:'GET',
                path:`/allStocks/${this.props.stockSearch.companySearchName}`,
                port: 4000,
                headers:{
                    'Content-Type': 'application-json'
                }
            }
            var req = http.request(options, res=>{
                var result = '';
            
                res.on('data', chunk=>{
                    result += chunk;
                })
            
                res.on('error', error =>{
                    return;
                })
            
                res.on('end', ()=>{
                    companies = JSON.parse(result)
                    this.onStocksLoaded()
                    
                })
            })
            
            req.on('error', error=>{
                return;
            })
            
            req.end()
        }
    }

    getCompanyInfo(symbol){

        var options = {
            hostname:'127.0.0.1',
            method:'GET',
            path:`/companyInfo/${symbol}`,
            port: 4000,
            headers:{
                'Content-Type': 'application-json'
            }
        }
        var req = http.request(options, res=>{
            var result = '';
        
            res.on('data', chunk=>{
                result += chunk;
            })
        
            res.on('error', error =>{
                return;
            })
        
            res.on('end', ()=>{
                let description = JSON.parse(result)
                this.props.stockSearch.currentCompany.description = description;
                this.props.onStockSearchChange(this.props.stockSearch)
                
            })
        })
        
        req.on('error', error=>{
            return;
        })
        
        req.end()
        
    }

    getStockQuote(symbol){

        var options = {
            hostname:'127.0.0.1',
            method:'GET',
            path:`/stock/getQuote/${symbol}`,
            port: 4000,
            headers:{
                'Content-Type': 'application-json'
            }
        }
        var req = http.request(options, res=>{
            var result = '';
        
            res.on('data', chunk=>{
                result += chunk;
            })
        
            res.on('error', error =>{
                return;
            })
        
            res.on('end', ()=>{
                let values = JSON.parse(result)
                this.props.stockSearch.currentCompany.currentValue = values.currentValue
                this.props.stockSearch.currentCompany.highValue = values.highValue
                this.props.stockSearch.currentCompany.lowValue = values.lowValue
                this.props.onStockSearchChange(this.props.stockSearch)
                
            })
        })
        
        req.on('error', error=>{
            return;
        })
        
        req.end()
        
    }

    getChartValues(symbol){

        var options = {
            hostname:'127.0.0.1',
            method:'GET',
            path:`/getChartValues/${symbol}/${this.props.stockSearch.currentChartRange}`,
            port: 4000,
            headers:{
                'Content-Type': 'application-json'
            }
        }
        var req = http.request(options, res=>{
            var result = '';
        
            res.on('data', chunk=>{
                result += chunk;
            })
        
            res.on('error', error =>{
                return;
            })
        
            res.on('end', ()=>{
                let values = JSON.parse(result)
                this.props.stockSearch.currentChartParams = values
                this.props.onStockSearchChange(this.props.stockSearch)
                
            })
        })
        
        req.on('error', error=>{
            return;
        })
        
        req.end()
        
    }
   

    onStockSelected = (company) =>{
        this.props.stockSearch.currentCompany = company
        this.props.onStockSearchChange(this.props.stockSearch)
        this.getImageLogo(company.symbol)
        this.getCompanyInfo(company.symbol)
        this.getStockQuote(company.symbol)
        this.getChartValues(company.symbol)
    }

    onStocksLoaded(){
        this.props.stockSearch.areCompaniesLoaded = true;
        this.props.onStockSearchChange(this.props.stockSearch)
    }
    
    onInputChange(companyName){
        this.props.stockSearch.areCompaniesLoaded = false;
        this.props.stockSearch.companySearchName = companyName
        this.props.onStockSearchChange(this.props.stockSearch)
    }

    onChartRangeChange(range){
        this.props.stockSearch.currentChartRange = range
        this.props.onStockSearchChange(this.props.stockSearch)
        this.getChartValues(this.props.stockSearch.currentCompany.symbol)
    }
    
    render(){

        if(!this.props.stockSearch.areCompaniesLoaded){
            this.getCompanies();
        }

        return(
            <div>
                <div style={{marginBottom:30+'px'}}>
                    <input placeholder={'Pesquisar ações...'} className="stocksInput" onKeyUp={(ev) => this.onInputChange(ev.target.value)}>
                    </input> 
                </div>
                <div className= 'stocksContainer'>
                    {this.props.stockSearch.companySearchName !== '' ?
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
                            <div onClick={() => this.onChartRangeChange("day")} className={`rangeButton start ${(this.props.stockSearch.currentChartRange === 'day' ? 'selected' :  '')}`}>Dia</div>
                            <div onClick={() => this.onChartRangeChange("month")} className={`rangeButton middle ${(this.props.stockSearch.currentChartRange === 'month' ?  'selected' :  '')}`}>Mês</div>
                            <div onClick={() => this.onChartRangeChange("year")} className={`rangeButton end ${(this.props.stockSearch.currentChartRange === 'year' ?  'selected' :  '')}`}>Ano</div>
                        </div>
                        {this.props.stockSearch.currentChartParams !== undefined 
                            ? <StockChart data = {this.props.stockSearch.currentChartParams} highValue={this.props.stockSearch.currentCompany.highValue}/>  : null
                        }
                    </div>
                </div>
                {
                    (this.props.stockSearch.currentCompany.name !== '' &&
                    this.props.stockSearch.currentCompany.companyLogo !== '' &&
                    this.props.stockSearch.currentCompany.description !== ''  &&
                    this.props.stockSearch.currentCompany.currentValue !== undefined &&
                    this.props.stockSearch.currentCompany.highValue !== undefined && 
                    this.props.stockSearch.currentCompany.lowValue !== undefined)
                    ?
                    <div className="stocksInfo">
                        <div className="stocksInfoContent">
                            <div className="logoNameDiv">
                                <div className='logoDiv' style={{backgroundImage:`url(${this.props.stockSearch.currentCompany.companyLogo})`}}>
                                    
                                </div>
                                
                                <span className='companyName'>{this.props.stockSearch.currentCompany.name}</span>
                            </div>
                            <div className="currentValueDiv">
                                <span className='currentValueLabel'>Valor atual:</span>
                                <span className='currentValue'>{'$'+this.props.stockSearch.currentCompany.currentValue}</span>
                            </div>
                            <div className="descriptionDiv">
                                <span className="description">{this.props.stockSearch.currentCompany.description}</span>
                            </div>
                            <div className="rangeValueDiv">
                                <span className='maxValueLabel'>Valor máximo:</span>
                                <span className='maxValue'>{'$'+this.props.stockSearch.currentCompany.highValue}</span>
                                <span className='minValueLabel'>Valor mínimo:</span>
                                <span className='minValue'>{'$'+this.props.stockSearch.currentCompany.lowValue}</span>
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
        stockSearch:state.stockSearch
    }
}

const mapActionsToProps = {
    onStockSearchChange: stockSearchAction
}

export default connect(mapStateToProps,mapActionsToProps)(StockSearch)