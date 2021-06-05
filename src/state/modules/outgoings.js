import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  outgoings:[],
  outgoingsCount:[]
};

export const getters = {
  getOutgoings(state){
    return state.outgoings;
  },
  getOutgoingsByType : (state) => (type) => {
    return state.outgoings.filter( outgoing => outgoing.outgoingType == type);
  },
  getOutgoingByID: (state) => (id) => {
    return state.outgoings.filter(outgoing => outgoing.id == id);
  },
  getOutgoingsCount: (state) => {
    return state.outgoingsCount;
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
  },
  setOutgoingsCount(state,payload){
    state.outgoingsCount = payload
  }
};

export const actions = {
  async getOutgoings({commit}){
    await axios.get(process.env.VUE_APP_API_BASE_URL+'outgoings/',{
      headers:authHeader()
    }).then(res => {
      commit('setOutgoings',res.data.results);
    });
  },
  async getOutgoingsCountByMonth({commit}){
    await axios.get(process.env.VUE_APP_API_BASE_URL+`outgoings/countByMonth/`,{
      headers:authHeader()
    }).then(res => {
      const count = Object.values(res.data[0].data);
      count.shift();
      commit('setOutgoingsCount',count);
    });
  },
  async createOutgoing({commit},outgoing){
      if(outgoing.outgoingType != "farmer") {
        outgoing.outgoingPrice = outgoing.outgoingQuantity * outgoing.outgoingPrice
      }
      await axios.post(process.env.VUE_APP_API_BASE_URL+'outgoings/',outgoing,{
        headers:authHeader()
      }).then(res => {
        commit('pushOutgoing',res.data);
      });
  },
  async updateOutgoing({commit,rootGetters},outgoing){
    calcOutgoingPrice(rootGetters,outgoing);
    await axios.put(process.env.VUE_APP_API_BASE_URL+`outgoings/${outgoing.id}`,{
      headers:authHeader()
    }).then(()=>{
      commit('setOutgoing',outgoing);
    });
  },
  async deleteOutgoingByID({commit},id){
    await axios.delete(process.env.VUE_APP_API_BASE_URL+`outgoings/${id}`,{
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
