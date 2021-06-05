<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <expense-form :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import ExpenseForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      ExpenseForm,
    },
    data() {
      return {
        title: 'pages.addexpense.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addexpense.title'),
            active: true
          }
        ]
      },
      expensetypes(){
        return this.$store.getters['expensetypes/getExpenseTypes'];
      },
      options(){
        return {
          title: this.$t('pages.addexpense.title'),
          description: this.$t('pages.addexpense.description'),
          createItemAction:'expenses/createExpense',
          createItemButton:'pages.addexpense.title',
          redirectRouteName:'expenses',
          initialItem:{
            expenseLabel:'',
            expenseType:'',
            price:'',
            expenseRelatedToFarmers:0,
            expenseMesureUnit:'',
          },
          formFields:[
            {
              id:'expense-type',
              key:'expenseType',
              label:'forms.expensetype',
              labelFor:'expense-type',
              type:'select',
              placeholder: 'pick.expense',
              options:[
                ...this.expensetypes.map(expenseType => expenseType.expenseType)
              ]
            },
            {
              id:'expense-label',
              key:'expenseLabel',
              label:'forms.expenselabel',
              labelFor:'expense-label',
              type:'text'
            },
            {
              id:'expense-price',
              key:'price',
              label:'forms.price',
              labelFor:'expense-price',
              type:'text'
            },
            {
              id:'expense-measure-unit',
              key:'expenseMesureUnit',
              label:'forms.expensemeasureunit',
              labelFor:'expense-measure-unit',
              type:'text'
            },
          ]
        }
      }
    },
    created(){
    }
  }
</script>

<style lang="scss" scoped>

</style>