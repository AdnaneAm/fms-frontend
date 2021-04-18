import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  outgoings:[],
};

export const getters = {
  getOutgoings(state){
    return state.outgoings;
  },
  getOutgoingByID: (state) => (id) => {
    return state.outgoings.filter(outgoing => outgoing.id == id);
  }
}
export const mutations = {
  setOutgoings(state,payload){
    state.outgoings = payload;
  },
  deleteOutgoing(state,id){
    state.outgoings = state.outgoings.filter(outgoing => outgoing.id != id)
  },
  pushOutgoing(state,payload){
    state.outgoings.push(payload);
  },
  setOutgoing(state,payload){
    const index = state.outgoings.findIndex(outgoing => outgoing.id == payload.id);
    state.outgoings[index] = payload
  }
};

export const actions = {
  getOutgoings({commit}){
    axios.get(process.env.VUE_APP_API_BASE_URL+'outgoings/',{
      headers:authHeader()
    }).then(res => {
      commit('setOutgoings',res.data.results);
    });
  },
  createOutgoing({commit,rootGetters},outgoing){
      if(!outgoing.outgoingPrice) calcOutgoingPrice(rootGetters,outgoing);
      axios.post(process.env.VUE_APP_API_BASE_URL+'outgoings/',outgoing,{
        headers:authHeader()
      }).then(res => {
        commit('pushOutgoing',res.data);
      });
  },
  updateOutgoing({commit,rootGetters},outgoing){
    calcOutgoingPrice(rootGetters,outgoing);
    axios.put(process.env.VUE_APP_API_BASE_URL+`outgoings/${outgoing.id}`,{
      headers:authHeader()
    }).then(()=>{
      commit('setOutgoing',outgoing);
    });
  },
  deleteOutgoingByID({commit},id){
    axios.delete(process.env.VUE_APP_API_BASE_URL+`outgoings/${id}`,{
      headers:authHeader()
    }).then( () => {
      commit('deleteOutgoing',id);
    });
  }
};
const calcOutgoingPrice = (rootGetters,outgoing) =>{
  // Get the expense price value 
  const expensePrice = rootGetters['expenses/getExpenseByLabel'](outgoing.outgoingLabel).price;
  outgoing.outgoingPrice = parseInt(outgoing.outgoingQuantity)*expensePrice;
}