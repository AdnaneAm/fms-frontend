import axios from 'axios'
export const state = {
  expenses:[
    {
      id:'1',
      expenseLabel:'Mohammed TOUHAMI',
      expenseType:'farmer',
      price:70,
      expenseRelatedToFarmers:true,
      expenseMesureUnit:'day',
      createDate:new Date().toLocaleDateString()
    }
  ],
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
    state.expenses[index] = payload
  }
};

export const actions = {
  getExpenses({commit}){
    axios.get(process.env.VUE_APP_API_BASE_URL+'expenses/');
    commit('setExpenses',[]);
  },
  deleteExpenseByID({commit},id){
    axios.delete(process.env.VUE_APP_API_BASE_URL+`expenses/${id}`);
    commit('deleteExpense',id);
  },
  createExpense({commit},expense){
    axios.post(process.env.VUE_APP_API_BASE_URL+`expenses/`);
    commit('pushExpense',expense);
  },
  setExpense({commit},expense){
    axios.put(process.env.VUE_APP_API_BASE_URL+`expenses/${expense.id}`);
    commit('setExpense',expense);
  }
};
