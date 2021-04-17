<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <outgoings-list :fields="fields" :items="outgoings" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import OutgoingsList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      OutgoingsList,
    },
    data() {
      return {
        title: 'pages.outgoings.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.outgoings.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "id", sortable: true, label: this.$t('tables.outgoings.id') },
          { key: "outgoingLabel", sortable: true, label:this.$t('tables.outgoings.label')},
          { key: "outgoingType", sortable: false, label:this.$t('tables.outgoings.type')},
          { key: "outgoingQuantity", sortable: true, label: this.$t('tables.outgoings.quantity') },
          { key: "outgoingPrice", sortable: true, label: this.$t('tables.outgoings.price') },
          { key: "outgoingUnitOfMesure", sortable: false, label: this.$t('tables.outgoings.unit') },
          { key: "createDate", sortable: true, label: this.$t('tables.outgoings.date') },
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-outgoing',
          deleteActionName:'outgoings/deleteOutgoingByID',
          title:this.$t('tables.outgoings.title')
        }
      },
      outgoings(){
        return this.$store.getters['outgoings/getOutgoings']
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>