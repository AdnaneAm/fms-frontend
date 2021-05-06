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
  async getRootstocks({commit}){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+'rootstocks/',{
      headers:authHeader()
    }).then(res => {
      commit('setRootstocks',res.data.results);
    })
  },
  async createRootstock({commit},rootstock){
    return await axios.post(process.env.VUE_APP_API_BASE_URL+'rootstocks/', rootstock,{
      headers:authHeader()
    }).then(res => {
      commit('pushRootstock',res.data);
    })
  },
  async setRootstock({commit},rootstock){
    return await axios.patch(process.env.VUE_APP_API_BASE_URL+`rootstocks/${rootstock.id}`,{
      headers:authHeader()
    }).then(() => {
      commit('setRootstock',rootstock);
    })
  },
  async deleteRootstockByID({commit},id){
    return await axios.delete(process.env.VUE_APP_API_BASE_URL+`rootstocks/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteRootstock',id);
    })
  }
};
