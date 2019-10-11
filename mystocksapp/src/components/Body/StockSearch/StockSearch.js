import React from 'react'
import "./StockSearch.css"
import { connect } from 'react-redux'
import { stockSelected } from '../../../actions/stockSearch/stock-selected-action'


var companies = [];

function getCompanies(){
    var http = require('http');

        var options = {
            hostname:'127.0.0.1',
            method:'GET',
            path:'/allStocks',
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
                companies = JSON.parse(result);
            })
        })
        
        req.on('error', error=>{
            return;
        })
        
        req.end()
}


class StockSearch extends React.Component{


    constructor(props){
        super(props)
        
        if(companies.length == 0){
            getCompanies();
        }

        
    }

    onStockSelected = (company) =>{
        this.props.stockSearch.currentCompany = company
        this.props.onStockSelected(this.props.stockSearch)
    }
    
    
    render(){
        return(
            <div>
                <h3>
                    Pesquise por algum símbolo de ação:
                </h3>
                <div>
                    <input className="stocksInput">
                    </input> 
                    <button>
                        Pesquisar
                    </button>
                </div>
                <div className= 'stocksContainer'>
                    {
                        companies.map(
                            (company,key)=>
                                <div onClick ={() => this.onStockSelected(company)} key ={key} className = 'stocksContainerItem'>
                                    <span className='stocksContainerItemSymbol'>{company.symbol}</span>
                                    <span className='stocksContainerItemName'>{company.name}</span>
                                </div>
                            
                        )
                    }
                </div>
                <div className="stocksInfo">
                    <h4 style={{color:'white'}}> {this.props.stockSearch.currentCompany.symbol}</h4>
                    <span style={{color:'white'}}>{this.props.stockSearch.currentCompany.name}</span>
                </div>
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
    onStockSelected: stockSelected
}

export default connect(mapStateToProps,mapActionsToProps)(StockSearch)