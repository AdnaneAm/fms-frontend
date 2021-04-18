<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <varieties-list :fields="fields" :items="varieties" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import VarietiesList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      VarietiesList,
    },
    data() {
      return {
        title: 'pages.varieties.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.varieties.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "variety", sortable: true, label:this.$t('tables.varieties.variety')},
          { key: "rootType", sortable: true, label:this.$t('tables.varieties.type')},
          { key: "createDate", sortable: true, label:this.$t('tables.expensetypes.date')},
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-variety',
          deleteActionName:'varieties/deleteVarietyByID',
          title:this.$t('tables.varieties.title')
        }
      },
      varieties(){
        return this.$store.getters['varieties/getVarieties']
      }
    },
    created(){
      this.$store.dispatch('varieties/getVarieties');
    }
  }
</script>

<style lang="scss" scoped>

</style>