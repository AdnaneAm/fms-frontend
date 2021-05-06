import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  calibers:[
  ],
};

export const getters = {
  getCalibers(state){
    return state.calibers;
  },
  getCaliberByID:(state) => (id) =>{
    return state.calibers.filter(caliber => caliber.id == id)[0];
  }
}
export const mutations = {
  setCalibers(state,payload){
    state.calibers = payload;
  },
  pushCaliber(state,payload){
    state.calibers.push(payload);
  },
  setCaliber(state,payload){
    const index = state.calibers.findIndex(caliber => caliber.id == payload.id);
    state.calibers[index] = payload
  },
  deleteCaliber(state,id){
    state.calibers = state.calibers.filter(caliber => caliber.id != id)
  }
};

export const actions = {
  async getCalibers({commit}){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+'calibers/',{
      headers:authHeader()
    }).then(res => {
      commit('setCalibers',res.data.results);
    })
  },
  async deleteCaliberByID({commit},id){
    return await axios.delete(process.env.VUE_APP_API_BASE_URL+`calibers/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteCaliber',id);
    })
  },
  async createCaliber({commit},caliber){
    return await axios.post(process.env.VUE_APP_API_BASE_URL+`calibers/`,caliber,{
      headers:authHeader()
    }).then(() => {
      commit('pushCaliber',caliber);
    })
  },
  async setCaliber({commit},caliber){
    return await axios.patch(process.env.VUE_APP_API_BASE_URL+`calibers/${caliber.id}`,{
      headers:authHeader()
    }).then(() => {
      commit('setCaliber',caliber);
    })
  }
};
