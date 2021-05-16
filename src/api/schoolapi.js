import axios from 'axios';

const instance = axios.create({
    baseURL:" http://d8c18a6948ff.ngrok.io/api",
});

export default instance;