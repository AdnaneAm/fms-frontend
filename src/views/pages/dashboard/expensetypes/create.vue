<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <expensetype-form :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import ExpensetypeForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      ExpensetypeForm,
    },
    data() {
      return {
        title: 'pages.addexpensetype.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addexpensetype.title'),
            active: true
          }
        ]
      },
      options(){
        return {
          title: this.$t('pages.addexpensetype.title'),
          description: this.$t('pages.addexpensetype.description'),
          createItemAction:'expensetypes/createExpenseType',
          createItemButton:'pages.addexpensetype.title',
          redirectRouteName:'expensetypes',
          initialItem:{
            id:Math.floor(Math.random()*10000),
            expensetype:'',
          },
          formFields:[
            {
              id:'expense-type',
              key:'expenseType',
              label:'forms.expensetype',
              labelFor:'expensetype',
              type:'text',
            }
          ]
        }
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>