import axios from 'axios';

export class HttpService{

    constructor(axiosInstance){
        if(axiosInstance !== undefined){
            this.http = axiosInstance
        } 
        else{
            this.http = axios.create({
                baseURL: 'http://127.0.0.1:4000',
                headers: {'Content-Type': 'application-json'},
              })
        }
    }

    get(path, params)
    {
        var opts = {
            params:params
        }
        if(params !== undefined){
            this.http.get(path,opts)
        }
        return this.http.get(path)
    }

    static getCustomAxiosInstance(baseURL,port,headers){
        return new HttpService(axios.create({
            baseURL: `${baseURL}:${port}`,
            headers: headers,
          }));
    }
}