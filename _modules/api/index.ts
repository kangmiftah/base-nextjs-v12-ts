import axios from "axios";

const apiFetch = axios.create({
   baseURL: 'https://jsonplaceholder.typicode.com/',
   timeout: 1000,
   headers: {'X-Custom-Header': 'foobar'}
 });

 export default apiFetch;