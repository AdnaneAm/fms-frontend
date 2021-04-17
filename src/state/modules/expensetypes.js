import axios from 'axios'
export const state = {
  expensetypes:[
    {
      id:'1',
      expenseType:'farmer',
      createDate:new Date().toLocaleDateString()
    },
    {
      id:'2',
      expenseType:'generale',
      createDate:new Date().toLocaleDateString()
    }
  ]
};

export const getters = {
  getExpenseTypes(state){
    return state.expensetypes;
  },
  getExpenseTypeByID: (state) => (id) => {
    return state.expensetypes.filter(expenseType => expenseType.id == id)[0]
  }
}
export const mutations = {
  setExpenseTypes(state,payload){
    state.expensetypes = payload;
  },
  deleteExpenseType(state,id){
    state.expensetypes = state.expensetypes.filter(expensetype => expensetype.id != id)
  },
  pushExpenseType(state,payload){
    state.expensetypes.push(payload);
  },
  setExpenseType(state,payload){
    const index = state.expensetypes.findIndex(expensetype => expensetype.id == payload.id);
    state.expensetypes[index] = payload
  }
};

export const actions = {
  getExpensetypes({commit}){
    axios.get(process.env.VUE_APP_API_BASE_URL+'expensetypes/');
    commit('setExpenseTypes',[]);
  },
  deleteExpenseTypeByID({commit},id){
    axios.delete(process.env.VUE_APP_API_BASE_URL+`expensetypes/${id}`);
    commit('deleteExpenseType',id);
  },
  createExpenseType({commit},expenseType){
    axios.delete(process.env.VUE_APP_API_BASE_URL+`expensetypes/create`);
    commit('pushExpenseType',expenseType);
  },
  setExpenseType({commit},expenseType){
    axios.put(process.env.VUE_APP_API_BASE_URL+`expensetypes/${expenseType.id}`);
    commit('setExpenseType',expenseType);
  }
};
