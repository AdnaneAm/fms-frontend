import axios from 'axios'
import authHeader from '../helpers/authHeader';
export const state = {
  ouvriers:[],
};

export const getters = {
  getOuvriers(state){
    return state.ouvriers.map(ouvrier => {
      ouvrier.createDate = ouvrier.createDate.substr(0,10);
      return ouvrier;
    });
  },
  getOuvrierByLabel: (state) => (label) => {
    return state.ouvriers.filter(ouvrier => ouvrier.ouvrier == label)[0];
  },
  getOuvrierByID: (state) => (id) => {
    return state.ouvriers.filter(ouvrier => ouvrier.id == id)[0];
  }
}
export const mutations = {
  setOuvriers(state,payload){
    state.ouvriers = payload;
  },
  deleteOuvrier(state,id){
    state.ouvriers = state.ouvriers.filter(ouvrier => ouvrier.id != id)
  },
  pushOuvrier(state,payload){
    state.ouvriers.push(payload);
  },
  setOuvrier(state,payload){
    const index = state.ouvriers.findIndex(ouvrier => ouvrier.id == payload.id);
    console.log(index)
    state.ouvriers[index] = payload
  }
};

export const actions = {
  async getOuvriers({commit}){
    await axios.get(process.env.VUE_APP_API_BASE_URL+'ouvriers/',{
      headers:authHeader()
    }).then(ouvrier => {
      commit('setOuvriers',ouvrier.data.results);
    });
  },
  async deleteOuvrierByID({commit},id){
    await axios.delete(process.env.VUE_APP_API_BASE_URL+`ouvriers/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteOuvrier', id);
    });
  },
  async createOuvrier({commit},ouvrier){
    await axios.post(process.env.VUE_APP_API_BASE_URL+`ouvriers/`, ouvrier,{
      headers:authHeader()
    }).then(ouvrier => {
      commit('pushOuvrier', ouvrier.data);
    });
    
  },
  async setOuvrier({commit},ouvrier){
    await axios.patch(process.env.VUE_APP_API_BASE_URL+`ouvriers/${ouvrier.id}`, ouvrier,{
      headers:authHeader()
    }).then(ouvrier => {
      commit('setOuvrier', ouvrier.data);
    });
    
  }
};
