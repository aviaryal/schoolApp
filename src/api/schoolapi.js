import axios from 'axios';

const instance = axios.create({
    baseURL:"https://schoolpickup.herokuapp.com/api",
});

export default instance;