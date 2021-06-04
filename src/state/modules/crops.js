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
  async getCrops({commit}){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+'crops/',{
      headers:authHeader()
    }).then(res => {
      commit('setcrops',res.data.results);
    })
  },
  async getCropByID(context,id){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+'crops/'+id,{
      headers:authHeader()
    }).then(res => {
      return Promise.resolve(res.data);
    })
  },
  async getCropsByPeriod(context,period){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+'crops/period/'+period,{
      headers:authHeader()
    }).then(res => {
      return Promise.resolve(res.data);
    })
  },
  async createCrop({commit,rootGetters,dispatch},crop){
      const crops = createCropItems(rootGetters, crop)
    // initialise outgoing qty and mesure unit
      crops.forEach(cropElement => {
        axios.post(process.env.VUE_APP_API_BASE_URL+'crops/', cropElement,{
          headers:authHeader()
        }).then(res => {
          commit('pushcrop',res.data);
          // Create outgoing
          const outgoing = {
            outgoingLabel:cropElement.cropFarmer,
            outgoingType:'farmer',
            outgoingQuantity: cropElement.cropNumberOfBoxes,
            outgoingUnitOfMesure: cropElement.paymentMethod,
            outgoingPrice:cropElement.cropExpensePrice,
            createDate:cropElement.createDate
          }
          dispatch('outgoings/createOutgoing',outgoing,{root:true});
        })
      });
      
  },
  async setCrop({commit,rootGetters},crop){
    const {expenseRelatedToFarmers,price} = rootGetters['expenses/getExpenseByLabel'](crop.cropFarmer);
    if(expenseRelatedToFarmers) {
      crop.cropExpensePrice = price * crop.cropNumberOfBoxes
    } else {
      crop.cropExpensePrice = 0
    }
    await axios.patch(process.env.VUE_APP_API_BASE_URL+`crops/${crop.id}`,crop,{
      headers:authHeader()
    }).then(() => {
      commit('setcrop',crop);
    })
  },
  async deleteCropByID({commit},id){
    return await axios.delete(process.env.VUE_APP_API_BASE_URL+`crops/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteCrop',id);
    })
  }
};


const createCropItems = (rootGetters, item) => {
  const {price} = rootGetters['expenses/getExpenseByLabel'](item.pme);
  const crops = []
  if(item.cropType == "peach") {
    item.calibers.forEach(caliber => {
      if(caliber.value && caliber.value > 0) {
        const crop = {
          paymentMethod: item.pme,
          cropFarmer: Array.isArray(item.cropFarmer) ? item.cropFarmer.join(",") : item.cropFarmer,
          cropType:item.cropType,
          cropParcel:item.cropParcel,
          cropVariety:item.cropVariety,
          cropRootStock:item.cropRootStock,
          cropCaliber:caliber.key,
          cropNumberOfBoxes: caliber.value,
          cropExpensePrice: item.pme == "Jours" ? ( price * item.cropFarmer.length ) / item.calibers.length : (price * caliber.value)
        }
        crops.push(crop)
    }

    });
  } else {
    const elements = item.olivesCases
    Object.keys(elements).forEach(key => {
      if(elements[key].value && elements[key].value > 0) {
        const crop = {
          paymentMethod: item.pme,
          cropFarmer: Array.isArray(item.cropFarmer) ? item.cropFarmer.join(",") : item.cropFarmer,
          cropType:item.cropType,
          cropParcel:elements[key].parcel,
          cropVariety:elements[key].variety,
          cropRootStock:item.cropRootStock,
          cropNumberOfBoxes: elements[key].value,
          cropExpensePrice: item.pme == "Jours" ? ( price * item.cropFarmer.length ) / Object.keys(item.olivesCases).length : (price * elements[key].value)
        }
        crops.push(crop)
      }
    })
  }
  return crops
}
