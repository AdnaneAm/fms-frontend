import axios from 'axios'
export const state = {
  outgoings:[
    {
      id:'1',
      outgoingLabel:'Mohammed TOUHAMI',
      outgoingType:'farmer',
      outgoingQuantity:'15',
      outgoingUnitOfMesure:'caisse',
      outgoingPrice:300,
      createDate:new Date().toLocaleDateString()
    }
  ],
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
    axios.get(process.env.VUE_APP_API_BASE_URL+'outgoings/');
    commit('setOutgoings',[]);
  },
  deleteOutgoingByID({commit},id){
    axios.delete(process.env.VUE_APP_API_BASE_URL+`outgoings/${id}`);
    commit('deleteOutgoing',id);
  },
  createOutgoing({commit,rootGetters},outgoing){
      calcOutgoingPrice(rootGetters,outgoing);
      axios.post(process.env.VUE_APP_API_BASE_URL+'outgoings/');
      commit('pushOutgoing',outgoing);
  },
  updateOutgoing({commit,rootGetters},outgoing){
    calcOutgoingPrice(rootGetters,outgoing);
    axios.put(process.env.VUE_APP_API_BASE_URL+`outgoings/${outgoing.id}`);
    commit('setOutgoing',outgoing);
  }
};
const calcOutgoingPrice = (rootGetters,outgoing) =>{
  // Get the expense price value 
  const expensePrice = rootGetters['expenses/getExpenseByLabel'](outgoing.outgoingLabel).price;
  outgoing.outgoingPrice = parseInt(outgoing.outgoingQuantity)*expensePrice;
}