Feito por Estevão Alves Vieira - 3:54 AM 10/9/2019

Gostaria de dizer que nunca desenvolvi api em nodeJS, portanto pode ser que tenham erros de estrutura e de boas práticas.

Essa é uma aplicação simples no qual existem apenas duas chamadas

1 - localhost:4000/stock/getLatestStockValue/<Sigla da ação> - retorna o ultimo valor que vem da API do site 
https://iexcloud.io

2 - localhost:4000/stock/getStockName/<Sigla da ação> - faz uma pesquisa
no mysql e retorna o nome da ação com base na sua sigla

Foi feito inserção de dados no banco através de função no arquivo ./database/connection.js utilizando a API do site https://iexcloud.io;

Script para create do banco usado: ./database/mystocksdb.md

Sites de referência de estudo:
https://www.luiztools.com.br/post/como-usar-nodejs-mysql/
https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
https://nodejs.dev/making-http-requests-with-nodejs
https://www.luiztools.com.br/post/como-usar-nodejs-mysql/