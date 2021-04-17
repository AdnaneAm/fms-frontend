import axios from 'axios'
export const state = {
  rootstocks:[
    {
      id:'R1',
      rootstock:'rootstock-01'
    },
    {
      id:'R2',
      rootstock:'rootstock-02'
    },
    {
      id:'R3',
      rootstock:'rootstock-03'
    }
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
    return axios.get(process.env.VUE_APP_API_BASE_URL+'rootstocks/').then(res => {
      commit('setRootstocks',res.data);
      return Promise.resolve(res.data);
    })
  },
  createRootstock({commit},rootstock){
    commit('pushRootstock',rootstock);
  },
  setRootstock({commit},rootstock){
    commit('setRootstock',rootstock);
  },
  deleteRootstockByID({commit},id){
    commit('deleteRootstock',id);
  }
};
