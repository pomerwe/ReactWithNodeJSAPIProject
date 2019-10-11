import React from 'react'



class About extends React.Component{

    
    render(){
       
        return(
            <div style = {{padding:30+'px'}}>
                <span style = {{display:'block'}}>
                   <h3>Seja bem vindo à plataforma MyStocksApp!</h3> 
                </span>
                <span style = {{display:'block'}}>
                    Aqui você irá encontrar informações sobre Símbolos de Ações e suas respectivas Empresas e irá encontrar também o valor de ações!
                </span>
            </div>
        )
        
    }
}


export default About