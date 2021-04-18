import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  rootstocks:[
  ],
};

export const getters = {
  getRootstocks(state){
    return state.rootstocks;
  },
  getRootstockByID:(state) => (id) =>{
    return state.rootstocks.filter(rootstock => rootstock.id == id)[0];
  }
}
export const mutations = {
  setRootstocks(state,payload){
    state.rootstocks = payload;
  },
  pushRootstock(state,payload){
    state.rootstocks.push(payload);
  },
  setRootstock(state,payload){
    const index = state.rootstocks.findIndex(rootstock => rootstock.id == payload.id);
    state.rootstocks[index] = payload
  },
  deleteRootstock(state,id){
    state.rootstocks = state.rootstocks.filter(rootstock => rootstock.id != id);
  }
};

export const actions = {
  getRootstocks({commit}){
    return axios.get(process.env.VUE_APP_API_BASE_URL+'rootstocks/',{
      headers:authHeader()
    }).then(res => {
      commit('setRootstocks',res.data.results);
    })
  },
  createRootstock({commit},rootstock){
    return axios.post(process.env.VUE_APP_API_BASE_URL+'rootstocks/', rootstock,{
      headers:authHeader()
    }).then(res => {
      commit('pushRootstock',res.data);
    })
  },
  setRootstock({commit},rootstock){
    return axios.patch(process.env.VUE_APP_API_BASE_URL+`rootstocks/${rootstock.id}`,{
      headers:authHeader()
    }).then(() => {
      commit('setRootstock',rootstock);
    })
  },
  deleteRootstockByID({commit},id){
    return axios.delete(process.env.VUE_APP_API_BASE_URL+`rootstocks/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteRootstock',id);
    })
  }
};
