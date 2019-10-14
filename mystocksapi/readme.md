Feito por Estevão Alves Vieira 

Gostaria de dizer que nunca desenvolvi api em nodeJS, portanto pode ser que tenham erros de estrutura e de boas práticas.


Para executar o projeto deve-se:

1 - Ter o NodeJS instalado no sistema operacional;
2 - Mysql instalado e configurado na porta 3306 e ter o banco (/database/mystocksdb.sql) inserido
3 - Abrir um console application(cmd, git bash, terminal) na pasta root do projeto (mystocksapp/) e digitar npm start;
4 - Esperar com que suba a aplicação;
5 - Agora já é possível fazer requisições às rotas configuradas em localhost:4000!


Essa é uma aplicação simples no qual existem algumas chamadas

1 - /stock/getQuote/<Simbolo da ação> - retorna o os valores da ação que vem da API do site 
https://iexcloud.io

2 - /stock/getStockName/<Simbolo da ação> - faz uma pesquisa
no mysql e retorna o nome da ação com base na sua sigla

3 - /stock/getQuote/<SSimboloigla da ação> - retorna o os valores da ação que vem da API do site 
https://iexcloud.io

4 - /stock/companyInfo/<Simbolo da ação> - retorna o os as descrições da compania que vem da API do site 
https://iexcloud.io

5 - /allStocks/<Simbolo da ação> - retorna o objetos de simbolo de ação e nome da companhia do banco

6 - /stock/getQuote/<Simbolo da ação> - retorna o os valores da ação que vem da API do site 
https://iexcloud.io

7 - /stock/<Simbolo da ação>/<day | month | year> - retorna um histório para o preenchimento de dados do gráfico
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
https://www.youtube.com/watch?v=OSSpVLpuVWA
https://pt.stackoverflow.com/