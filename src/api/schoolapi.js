import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const instance = axios.create({
    baseURL:"https://schoolpickup.herokuapp.com/api",
    //baseURL:" https://32b64262cbed.ngrok.io/api",
});

instance.interceptors.request.use(
    async (config) => {
        let token = null;
        token = await SecureStore.getItemAsync("token");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
            console.log('From schoolapi.js '+ token);
        }
        return config;
    },
    (err) => {
        //return config;
         return Promise.reject(err);
    }
  );
export default instance;