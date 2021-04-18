import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  crops:[
  ],
};

export const getters = {
  getCropsByType : (state) => (type) => {
    return state.crops.filter(crop => crop.cropType == type);
  },
  getCropByID: (state) => (id) => {
    return state.crops.filter(crop => crop.id == id)[0];
  }
}
export const mutations = {
  setcrops(state,payload){
    state.crops = payload;
  },
  setcrop(state,payload){
    const index = state.crops.findIndex(crop => crop.id == payload.id);
    state.crops[index] = payload
  },
  pushcrop(state,payload){
    state.crops.push(payload);
  },
  deleteCrop(state,id){
    state.crops = state.crops.filter(crop => crop.id != id)
  }
};

export const actions = {
  getCrops({commit}){
    return axios.get(process.env.VUE_APP_API_BASE_URL+'crops/',{
      headers:authHeader()
    }).then(res => {
      commit('setcrops',res.data.results);
    })
  },
  getCropByID(context,id){
    return axios.get(process.env.VUE_APP_API_BASE_URL+'crops/'+id,{
      headers:authHeader()
    }).then(res => {
      return Promise.resolve(res.data);
    })
  },
  createCrop({commit,rootGetters,dispatch},crop){
    // initialise outgoing qty and mesure unit
    let outgoingQuantity = 1,outgoingUnitOfMesure = 'jour';
    const {expenseRelatedToFarmers,price} = rootGetters['expenses/getExpenseByLabel'](crop.cropFarmer);
      if(expenseRelatedToFarmers) {
        crop.cropExpensePrice = price * crop.cropNumberOfBoxes
        outgoingQuantity = crop.cropNumberOfBoxes;
        outgoingUnitOfMesure = 'caisse';
      } else {
        crop.cropExpensePrice = 0
      }
      axios.post(process.env.VUE_APP_API_BASE_URL+'crops/', crop,{
        headers:authHeader()
      }).then(res => {
        commit('pushcrop',res.data);
        // Create outgoing
        const outgoing = {
          outgoingLabel:crop.cropFarmer,
          outgoingType:'farmer',
          outgoingQuantity,
          outgoingUnitOfMesure,
          outgoingPrice:0,
        }
        dispatch('outgoings/createOutgoing',outgoing,{root:true});
      })
  },
  setCrop({commit,rootGetters},crop){
    const {expenseRelatedToFarmers,price} = rootGetters['expenses/getExpenseByLabel'](crop.cropFarmer);
    if(expenseRelatedToFarmers) {
      crop.cropExpensePrice = price * crop.cropNumberOfBoxes
    } else {
      crop.cropExpensePrice = 0
    }
    axios.patch(process.env.VUE_APP_API_BASE_URL+`crops/${crop.id}`,crop,{
      headers:authHeader()
    }).then(() => {
      commit('setcrop',crop);
    })
  },
  deleteCropByID({commit},id){
    return axios.delete(process.env.VUE_APP_API_BASE_URL+`crops/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteCrop',id);
    })
  }
};
