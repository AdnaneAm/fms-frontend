import axios from 'axios'
import authHeader from '../helpers/authHeader';
export const state = {
  expenses:[],
};

export const getters = {
  getExpenses(state){
    return state.expenses;
  },
  getExpensesByType: (state) => (type) => {
    return state.expenses.filter(expense => expense.expenseType == type);
  },
  getExpenseByLabel: (state) => (label) => {
    return state.expenses.filter(expense => expense.expenseLabel == label)[0];
  },
  getExpenseByID: (state) => (id) => {
    return state.expenses.filter(expense => expense.id == id)[0];
  }
}
export const mutations = {
  setExpenses(state,payload){
    state.expenses = payload;
  },
  deleteExpense(state,id){
    state.expenses = state.expenses.filter(expense => expense.id != id)
  },
  pushExpense(state,payload){
    state.expenses.push(payload);
  },
  setExpense(state,payload){
    const index = state.expenses.findIndex(expense => expense.id == payload.id);
    console.log(index)
    state.expenses[index] = payload
  }
};

export const actions = {
  getExpenses({commit}){
    axios.get(process.env.VUE_APP_API_BASE_URL+'expenses/',{
      headers:authHeader()
    }).then(expense => {
      commit('setExpenses',expense.data.results);
    });
  },
  deleteExpenseByID({commit},id){
    axios.delete(process.env.VUE_APP_API_BASE_URL+`expenses/${id}`,{
      headers:authHeader()
    }).then(result => {
      commit('deleteExpense', result.data);
    });
    
  },
  createExpense({commit},expense){
    axios.post(process.env.VUE_APP_API_BASE_URL+`expenses/`, expense,{
      headers:authHeader()
    }).then(expense => {
      commit('pushExpense', expense.data);
    });
    
  },
  setExpense({commit},expense){
    axios.patch(process.env.VUE_APP_API_BASE_URL+`expenses/${expense.id}`, expense,{
      headers:authHeader()
    }).then(expense => {
      commit('setExpense', expense.data);
    });
    
  }
};
