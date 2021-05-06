import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  parcels:[
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
  async getParcels({commit}){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+'parcels/',{
      headers:authHeader()
    }).then(res => {
      commit('setParcels',res.data.results);
    })
  },
  async createParcel({commit},parcel){
    return await axios.post(process.env.VUE_APP_API_BASE_URL+'parcels/',parcel,{
      headers:authHeader()
    }).then(res => {
      commit('pushParcel',res.data);
    })
  },
  async setParcel({commit},parcel){
    return await axios.patch(process.env.VUE_APP_API_BASE_URL+`parcels/${parcel.id}`,{
      headers:authHeader()
    }).then(() => {
      commit('setParcel',parcel);
    })
  },
  async deleteParcelByID({commit},id){
    return await axios.delete(process.env.VUE_APP_API_BASE_URL+`parcels/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteParcel',id);
    })
  }
};
