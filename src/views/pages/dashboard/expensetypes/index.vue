<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <expensetypes-list :fields="fields" :items="expensetypes" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import ExpensetypesList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      ExpensetypesList,
    },
    data() {
      return {
        title: 'pages.expensetypes.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.expensetypes.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "expenseType", sortable: true, label:this.$t('tables.expensetypes.expensetype')},
          { key: "createDate", sortable: true, label:this.$t('tables.expensetypes.date')},
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-expensetype',
          deleteActionName:'expensetypes/deleteExpenseTypeByID',
          title:this.$t('tables.expensetypes.title')
        }
      },
      expensetypes(){
        return this.$store.getters['expensetypes/getExpenseTypes']
      }
    },
    created(){
      this.$store.dispatch('expensetypes/getExpensetypes');
    }
  }
</script>

<style lang="scss" scoped>

</style>