import axios from 'axios';

const instance = axios.create({
    baseURL:'https://spotbook101.herokuapp.com/'
});

export default instance;
