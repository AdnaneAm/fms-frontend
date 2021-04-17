<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <farmer-form :options="options"/>
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import FarmerForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      FarmerForm,
    },
    data() {
      return {
        title: 'pages.addfarmer.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addfarmer.title'),
            active: true
          }
        ]
      },

      options(){
        return {
          title: this.$t('pages.editfarmer.title'),
          description: this.$t('pages.editfarmer.description'),
          createItemAction:'expenses/createExpense',
          createItemButton:'pages.addfarmer.title',
          redirectRouteName:'farmers',
          initialItem:{
            id:Math.floor(Math.random()*10000),
            expenseLabel:'',
            expenseType:'farmer',
            price:'',
            expenseRelatedToFarmers:false,
            expenseMesureUnit:'',
            createDate:new Date().toLocaleDateString()
          },
          formFields:[
            {
              id:'farmer-name',
              key:'expenseLabel',
              label:'forms.fullname',
              labelFor:'full-name',
              type:'text',
            },
            {
              id:'price',
              key:'price',
              label:'forms.price',
              labelFor:'price',
              type:'number',
            },
            {
              id:'farm-expense',
              key:'expenseRelatedToFarmers',
              labelFor:'expense',
              type:'check',
              check_message:'forms.relatedtofarmers'
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>