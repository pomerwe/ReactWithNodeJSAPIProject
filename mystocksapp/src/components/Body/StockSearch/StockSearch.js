import React from 'react'
import "./StockSearch.css"


class StockSearch extends React.Component{

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
                </div>
                <div class="stocksInfo">
                    
                </div>
            </div>
        )
    }
}

export default StockSearch