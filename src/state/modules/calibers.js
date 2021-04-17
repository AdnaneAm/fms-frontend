import axios from 'axios'
export const state = {
  calibers:[
    {
      id:'C1',
      caliber:'caliber-01'
    },
    {
      id:'C2',
      caliber:'caliber-02'
    },
    {
      id:'C3',
      caliber:'caliber-03'
    },
    {
      id:'C4',
      caliber:'caliber-04'
    },
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
  getCalibers({commit}){
    return axios.get(process.env.VUE_APP_API_BASE_URL+'calibers/').then(res => {
      commit('setCalibers',res.data);
      return Promise.resolve(res.data);
    })
  },
  deleteCaliberByID({commit},id){
    commit('deleteCaliber',id);
  },
  createCaliber({commit},caliber){
    commit('pushCaliber',caliber);
  },
  setCaliber({commit},caliber){
    commit('setCaliber',caliber);
  }
};
