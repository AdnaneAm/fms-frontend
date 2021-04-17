import axios from 'axios'
export const state = {
  varieties:[
    {
      id:'V1',
      variety:'variety-01',
      rootType:'peach',
    },
    {
      id:'V2',
      variety:'variety-02',
      rootType:'peach',
    },
    {
      id:'V3',
      variety:'variety-01',
      rootType:'olives',
    },
    {
      id:'V4',
      variety:'variety-02',
      rootType:'olives',
    },
    {
      id:'V5',
      variety:'variety-01',
      rootType:'almond',
    },
    {
      id:'V6',
      variety:'variety-02',
      rootType:'almond',
    }
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
    return axios.get(process.env.VUE_APP_API_BASE_URL+'varieties/').then(res => {
      commit('setVarieties',res.data);
      return Promise.resolve(res.data);
    })
  },
  createVariety({commit},variety){
    commit('pushVariety',variety);
  },
  setVarietyByID({commit},variety){
    commit('setVariety',variety);
  },
  deleteVarietyByID({commit},id){
    commit('deleteVariety',id)
  }
};
