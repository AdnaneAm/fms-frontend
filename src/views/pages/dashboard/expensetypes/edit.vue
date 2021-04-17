<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <expensetype-form :options="options" :id="expensetypeID"/>
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
        title: 'pages.editexpensetype.title',
        expensetypeID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editexpensetype.title'),
            active: true
          }
        ]
      },
      expensetype(){
        return this.$store.getters['expensetypes/getExpenseTypeByID'](this.expensetypeID);
      },
      options(){
        return {
          title: this.$t('pages.editexpensetype.title'),
          description: this.$t('pages.editexpensetype.description'),
          updateItemAction:'expensetypes/setExpenseType',
          editItemButton:'pages.editexpensetype.title',
          redirectRouteName:'expensetypes',
          initialItem:Object.assign({},this.expensetype),
          formFields:[
            {
              id:'expense-type',
              key:'expenseType',
              label:'shihaja',
              labelFor:'expense-type',
              type:'text',
            }
          ]
        }
      }
    },
    created(){
      console.log(this.expensetype);
    }
  }
</script>

<style lang="scss" scoped>

</style>