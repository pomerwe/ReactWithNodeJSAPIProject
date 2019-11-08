
import axios from 'axios';

export class HttpService{

    constructor(){
        this.http = axios.create({
            baseURL: 'http://127.0.0.1:4000',
            method: 'GET',
            headers: {'Content-Type': 'application-json'},
          });
    }

    get(path)
    {
        return this.http.get(path)
    }
}