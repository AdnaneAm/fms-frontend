<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <farmer-form :options="options" :id="farmerID"/>
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
        title: 'pages.editfarmer.title',
        farmerID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editfarmer.title'),
            active: true
          }
        ]
      },
      farmer(){
        return this.$store.getters['expenses/getExpenseByID'](this.farmerID);
      },
      options(){
        return {
          title: this.$t('pages.editfarmer.title'),
          description: this.$t('pages.editfarmer.description'),
          updateItemAction:'expenses/setExpense',
          editItemButton:'pages.editfarmer.title',
          redirectRouteName:'farmers',
          initialItem:Object.assign({},this.farmer),
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
    },
    created(){
    }
  }
</script>

<style lang="scss" scoped>

</style>