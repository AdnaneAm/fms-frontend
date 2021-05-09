import axios from 'axios';
import store from '@/state/store'
export default function setup() {
    axios.interceptors.response.use(undefined, err => {
      const loggedIn = store.getters['auth/loggedIn'];
      if((err.response.status === 401) && loggedIn){
        store.dispatch('auth/refreshToken').then( () => {
          const token = JSON.parse(localStorage.getItem('auth-token'));
          err.config.headers['Authorization'] = `bearer ${token}`;
          return axios.request(err.config);
        })
      }
      return Promise.reject(err);
    });
}