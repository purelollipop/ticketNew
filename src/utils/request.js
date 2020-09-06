import axios from "axios";


// axios.defaults.baseURL = 'http://192.168.2.106:8251/';



axios.defaults.timeout = 30000;
axios.defaults.headers = {
    'content-type': 'application/json',
    'charset':'utf-8',
};
/*axios.create({
    baseURL: 'http://192.168.2.106:8251/',
    timeout: 30000,
    headers: {
        'content-type': 'application/json',
        'charset':'utf-8',
    },
})*/
if(window.sessionStorage.getItem('token')){
    axios.defaults.headers.token = window.sessionStorage.getItem('token');
}
if(process.env.NODE_ENV === "production") {
    axios.defaults.baseURL =  'http://api.xiangshangsl.com/';
}else {
    // axios.defaults.baseURL = 'http://192.168.2.199:8251/';
    // axios.defaults.baseURL = 'http://192.168.2.100:8251/';
    // axios.defaults.baseURL = 'http://192.168.2.192:8251/';
    axios.defaults.baseURL =  'http://api.xiangshangsl.com/';
}
export default  axios
