<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <parcels-list :fields="fields" :items="parcels" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import ParcelsList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      ParcelsList,
    },
    data() {
      return {
        title: 'pages.parcels.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.parcels.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "parcel", sortable: true, label:this.$t('tables.parcels.parcel')},
          { key: "createDate", sortable: true, label:this.$t('tables.expensetypes.date')},
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-parcel',
          deleteActionName:'parcels/deleteParcelByID',
          title:this.$t('tables.parcels.title')
        }
      },
      parcels(){
        return this.$store.getters['parcels/getParcels']
      }
    },
    created(){
      this.$store.dispatch('parcels/getParcels');
    }
  }
</script>

<style lang="scss" scoped>

</style>