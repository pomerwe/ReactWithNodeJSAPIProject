Feito por Estevão Alves Vieira - 3:54 AM 10/9/2019

Gostaria de dizer que nunca desenvolvi api em nodeJS, portanto pode ser que tenham erros de estrutura e de boas práticas.

Essa é uma aplicação simples no qual existem algumas chamadas

1 - localhost:4000/stock/getQuote/<Simbolo da ação> - retorna o os valores da ação que vem da API do site 
https://iexcloud.io

2 - localhost:4000/stock/getStockName/<Simbolo da ação> - faz uma pesquisa
no mysql e retorna o nome da ação com base na sua sigla

3 - localhost:4000/stock/getQuote/<SSimboloigla da ação> - retorna o os valores da ação que vem da API do site 
https://iexcloud.io

4 - localhost:4000/stock/companyInfo/<Simbolo da ação> - retorna o os as descrições da compania que vem da API do site 
https://iexcloud.io

5 - localhost:4000/allStocks/<Simbolo da ação> - retorna o objetos de simbolo de ação e nome da companhia do banco


6 - localhost:4000/stock/getQuote/<Simbolo da ação> - retorna o os valores da ação que vem da API do site 
https://iexcloud.io

Foi feito inserção de dados no banco através de função no arquivo ./database/connection.js utilizando a API do site https://iexcloud.io;




    app.get('/getCompanyLogo/:symbol', controller.getCompanyLogo)

Script para create do banco usado: ./database/mystocksdb.md

Sites de referência de estudo:
https://www.luiztools.com.br/post/como-usar-nodejs-mysql/
https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
https://nodejs.dev/making-http-requests-with-nodejs
https://www.luiztools.com.br/post/como-usar-nodejs-mysql/