import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  expensetypes:[
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
    axios.get(process.env.VUE_APP_API_BASE_URL+'expense-types/',{
      headers:authHeader()
    }).then((res) => {
      commit('setExpenseTypes',res.data.results);
    });
  },
  createExpenseType({commit},expenseType){
    axios.post(process.env.VUE_APP_API_BASE_URL+`expense-types/`,expenseType,{
      headers:authHeader()
    }).then(res => {
      commit('pushExpenseType',res.data);
    });
  },
  setExpenseType({commit},expenseType){
    axios.patch(process.env.VUE_APP_API_BASE_URL+`expense-types/${expenseType.id}`,{
      headers:authHeader()
    }).then(() => {
      commit('setExpenseType',expenseType);
    });
  },
  deleteExpenseTypeByID({commit},id){
    axios.delete(process.env.VUE_APP_API_BASE_URL+`expense-types/${id}`,{
      headers:authHeader()
    }).then(()=>{
      commit('deleteExpenseType',id);
    });
  },
};
