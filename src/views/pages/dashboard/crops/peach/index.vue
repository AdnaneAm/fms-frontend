<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <crops-list :fields="fields" :items="crops" :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import CropsList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      CropsList,
    },
    data() {
      return {
        title: 'pages.peachcrops.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.peachcrops.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "id", sortable: true, label: this.$t('tables.crops.id') },
          { key: "cropParcel", sortable: true, label:this.$t('tables.crops.parcel')},
          { key: "cropCaliber", sortable: true, label:this.$t('tables.crops.caliber')},
          { key: "cropVariety", sortable: false, label: this.$t('tables.crops.variety') },
          { key: "cropRootstock", sortable: false, label: this.$t('tables.crops.rootstock') },
          { key: "cropNumberOfBoxes", sortable: true, label: this.$t('tables.crops.boxesnumber') },
          { key: "cropExpensePrice", sortable: true, label: this.$t('tables.crops.expenseprice') },
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-peach-crop',
          deleteActionName:'crops/deleteCropByID',
          title:this.$t('tables.crops.title')
        }
      },
      crops(){
        return this.$store.getters['crops/getCropsByType']('peach')
      }
    },
    created(){
      console.log(this.crops);
    }
  }
</script>

<style lang="scss" scoped>

</style>