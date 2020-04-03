import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
    // baseURL: 'https://bethehero-node.herokuapp.com'
    baseURL: 'http://192.168.0.100:3333'
})
api.defaults.headers.common['Authorization'] = AsyncStorage.getItem('@BeTheHero:token');
// api.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     return Promise.reject(error.response.data);
// });
export default api;