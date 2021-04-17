<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <expense-form :options="options" :id="expenseID"/>
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
        title: 'pages.editexpense.title',
        expenseID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editexpense.title'),
            active: true
          }
        ]
      },
      expense(){
        return this.$store.getters['expenses/getExpenseByID'](this.expenseID);
      },
      expensetypes(){
        return this.$store.getters['expensetypes/getExpenseTypes'];
      },
      options(){
        return {
          title: this.$t('pages.editexpense.title'),
          description: this.$t('pages.editexpense.description'),
          updateItemAction:'expenses/setExpense',
          editItemButton:'pages.editexpense.title',
          redirectRouteName:'expenses',
          initialItem:Object.assign({},this.expense),
          formFields:[
            {
              id:'expense-label',
              key:'expenseLabel',
              label:'forms.expenselabel',
              labelFor:'expense-label',
              type:'text'
            },
            {
              id:'expense-type',
              key:'expenseType',
              label:'forms.expensetype',
              labelFor:'expense-type',
              type:'select',
              options:[
                {
                  value:null,
                  text:'Choose an expense type'
                },
                ...this.expensetypes.map(expenseType => expenseType.expenseType)
              ]
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