<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <rootstocks-list :fields="fields" :items="rootstocks" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import RootstocksList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      RootstocksList,
    },
    data() {
      return {
        title: 'pages.rootstocks.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.rootstocks.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "id", sortable: true, label: this.$t('tables.rootstocks.id') },
          { key: "rootstock", sortable: true, label:this.$t('tables.rootstocks.rootstock')},
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-rootstock',
          deleteActionName:'rootstocks/deleteRootstockByID',
          title:this.$t('tables.rootstocks.title')
        }
      },
      rootstocks(){
        return this.$store.getters['rootstocks/getRootstocks']
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>