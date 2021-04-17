import axios from 'axios'
export const state = {
  parcels:[
    {
      id:'P1',
      parcel:'parcel-01'
    },
    {
      id:'P2',
      parcel:'parcel-02'
    },
    {
      id:'P3',
      parcel:'parcel-03'
    },
  ],
};

export const getters = {
  getParcels(state){
    return state.parcels;
  },
  getParcelByID:(state) => (id) =>{
    return state.parcels.filter(parcel => parcel.id == id)[0];
  }
}
export const mutations = {
  setParcels(state,payload){
    state.parcels = payload;
  },
  pushParcel(state,payload){
    state.parcels.push(payload);
  },
  setParcel(state,payload){
    const index = state.parcels.findIndex(parcel => parcel.id == payload.id);
    state.parcels[index] = payload
  },
  deleteParcel(state,id){
    state.parcels = state.parcels.filter(parcel => parcel.id != id);
  }
};

export const actions = {
  getParcels({commit}){
    return axios.get(process.env.VUE_APP_API_BASE_URL+'parcels/').then(res => {
      commit('setParcels',res.data);
      return Promise.resolve(res.data);
    })
  },
  createParcel({commit},parcel){
    commit('pushParcel',parcel);
  },
  setParcel({commit},parcel){
    commit('setParcel',parcel);
  },
  deleteParcelByID({commit},id){
    commit('deleteParcel',id);
  }
};
