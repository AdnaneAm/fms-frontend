import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  varieties:[
  ],
};

export const getters = {
  getVarieties(state){
    return state.varieties;
  },
  getVarietiesByType : (state) => (type) => {
    return state.varieties.filter(variety => variety.rootType == type);
  },
  getVarietyByID:(state) => (id) =>{
    return state.varieties.filter(variety => variety.id == id)[0];
  }
}
export const mutations = {
  setVarieties(state,payload){
    state.varieties = payload;
  },
  pushVariety(state,payload){
    state.varieties.push(payload);
  },
  setVariety(state,payload){
    const index = state.varieties.findIndex(variety => variety.id == payload.id);
    state.varieties[index] = payload
  },
  deleteVariety(state,id){
    state.varieties = state.varieties.filter(variety => variety.id != id);
  }
};

export const actions = {
  getVarieties({commit}){
    return axios.get(process.env.VUE_APP_API_BASE_URL+'varieties/',{
      headers:authHeader()
    }).then(res => {
      commit('setVarieties',res.data.results);
    })
  },
  createVariety({commit},variety){
    return axios.post(process.env.VUE_APP_API_BASE_URL+'varieties/',variety,{
      headers:authHeader()
    }).then(res => {
      commit('pushVariety',res.data);
    })
  },
  setVarietyByID({commit},variety){
    return axios.patch(process.env.VUE_APP_API_BASE_URL+`varieties/${variety.id}`,{
      headers:authHeader()
    }).then(() => {
      commit('setVariety',variety);
    })
  },
  deleteVarietyByID({commit},id){
    return axios.delete(process.env.VUE_APP_API_BASE_URL+`varieties/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteVariety',id)
    })
  }
};
