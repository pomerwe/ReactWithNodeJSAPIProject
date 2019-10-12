import React from 'react'
import './About.css'


class About extends React.Component{

    
    render(){
       
        return(
            <div className = 'aboutContent'>
                <span style = {{display:'block',textAlign:'center'}}>
                   <h3>Seja bem vindo à plataforma MyStocksApp!</h3> 
                </span>
                <span style = {{display:'block',textAlign:'center',marginTop:'15px'}}>
                    Aqui você irá encontrar informações sobre Símbolos de Ações e suas respectivas Empresas e irá encontrar também o valor de ações!
                </span>
            </div>
        )
        
    }
}


export default About