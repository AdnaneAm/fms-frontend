<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <calibers-list :fields="fields" :items="calibers" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import CalibersList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      CalibersList,
    },
    data() {
      return {
        title: 'pages.calibers.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.calibers.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "caliber", sortable: true, label:this.$t('tables.calibers.caliber')},
          { key: "createDate", sortable: true, label:this.$t('tables.expensetypes.date')},
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-caliber',
          deleteActionName:'calibers/deleteCaliberByID',
          title:this.$t('tables.calibers.title')
        }
      },
      calibers(){
        return this.$store.getters['calibers/getCalibers']
      }
    },
    created(){
      this.$store.dispatch('calibers/getCalibers');
    }
  }
</script>

<style lang="scss" scoped>

</style>