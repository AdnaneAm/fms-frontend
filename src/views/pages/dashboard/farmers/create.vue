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
          createItemAction:'ouvrier/createOuvrier',
          createItemButton:'pages.addfarmer.title',
          redirectRouteName:'farmers',
          initialItem:{
            expenseLabel:'',
            expenseType:'farmer',
            price:'',
            expenseRelatedToFarmers:false,
            expenseMesureUnit:''
          },
          formFields:[
            {
              id:'farmer-name',
              key:'ouvrier',
              label:'forms.fullname',
              labelFor:'full-name',
              type:'text',
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>