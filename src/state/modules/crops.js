import axios from 'axios'
export const state = {
  crops:[
    {
      id:'1',
      cropType:'peach',
      cropParcel:'parcel-01',
      cropVariety:'variety-01',
      cropNumberOfBoxes:5,
      cropRootstock:'rootstock-01',
      cropCaliber:'calibre-01',
      cropExpensePrice:100,
    },
    {
      id:'2',
      cropType:'olives',
      cropParcel:'parcel-02',
      cropVariety:'variety-02',
      cropNumberOfBoxes:10,
      cropRootstock:'rootstock-02',
      cropExpensePrice:200,
    },
    {
      id:'3',
      cropType:'almond',
      cropParcel:'parcel-03',
      cropVariety:'variety-02',
      cropNumberOfBoxes:12,
      cropRootstock:'rootstock-03',
      cropExpensePrice:300,
    }
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
    switch(payload.type){
      case 'peach':
        state.peach = payload.data;
        break;
      case 'olives':
        state.olives = payload.data;
        break;
      case 'almond':
        state.almond = payload.data;
        break;
      default:
        return;
    }
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
  getcrops({commit},type){
    return axios.get(process.env.VUE_APP_API_BASE_URL+'crops/'+type).then(res => {
      commit('setcrops',{
        type:type,
        data:res.data
      });
      return Promise.resolve(res.data);
    })
  },
  getCropByID(context,id){
    return axios.get(process.env.VUE_APP_API_BASE_URL+'crops/'+id).then(res => {
      return Promise.resolve(res.data);
    })
  },
  createCrop({commit},crop){
    console.log('creating ...',crop);
    commit('pushcrop',crop);
  },
  setCrop({commit},crop){
    commit('setcrop',crop);
  },
  deleteCropByID({commit},id){
    commit('deleteCrop',id);
  }
};
