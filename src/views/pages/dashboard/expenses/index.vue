<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <b-tabs fill>
          <b-tab :title="$t('pages.outgoings.all')" active>
              <expenses-list :fields="fields" :items="expenses()" :options="options" />
          </b-tab>
          <b-tab v-for="(expenseType, index) in expenseTypes" :key="`et-${index}`" :title="expenseType">
              <expenses-list :fields="fields" :items="expenses(expenseType)" :options="options" />
          </b-tab>
        </b-tabs>
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import ExpensesList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      ExpensesList,
    },
    data() {
      return {
        title: 'pages.expenses.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.expenses.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "expenseType", sortable: false, label:this.$t('tables.expenses.type')},
          { key: "expenseLabel", sortable: true, label:this.$t('tables.expenses.label')},
          { key: "price", sortable: true, label: this.$t('tables.expenses.price') },
          { key: "expenseMesureUnit", sortable: false, label: this.$t('tables.expenses.unit') },
          { key: "createDate", sortable: true, label: this.$t('tables.expenses.date') },
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-expense',
          deleteActionName:'expenses/deleteExpenseByID',
          title:this.$t('tables.expenses.title')
        }
      },
      expenseTypes(){
        return this.$store.getters['expensetypes/getExpenseTypes'].map(et => et.expenseType);
      },
    },
    methods:{
      expenses(type='all'){
        if(type=='all'){
          return this.$store.getters['expenses/getExpenses']
        }
        else{
          return this.$store.getters['expenses/getExpensesByType'](type);
        }
      }
    },
    created(){
      this.$store.dispatch('expenses/getExpenses');
    }
  }
</script>

<style lang="scss" scoped>

</style>