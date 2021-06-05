<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <farmers-list :fields="fields" :items="farmers" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import FarmersList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      FarmersList
    },
    data() {
      return {
        title: 'pages.farmers.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.farmers.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "ouvrier", sortable: true, label:this.$t('tables.farmers.fullname')},
          { key: "createDate", sortable: false, label: this.$t('tables.farmers.createdate') },
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-farmer',
          deleteActionName:'ouvrier/deleteOuvrierByID',
          title:this.$t('tables.farmers.title')
        }
      },
      /**
       * Farmers list
      */
      farmers(){
        return this.$store.getters['ouvrier/getOuvriers'];
      }
    },
    created(){
      this.$store.dispatch('ouvrier/getOuvriers');
    }
  }
</script>

<style lang="scss" scoped>

</style>