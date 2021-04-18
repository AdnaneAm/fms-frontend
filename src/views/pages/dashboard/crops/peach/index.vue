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
          { key: "cropFarmer", sortable: true, label:this.$t('tables.crops.farmer')},
          { key: "cropParcel", sortable: true, label:this.$t('tables.crops.parcel')},
          { key: "cropCaliber", sortable: true, label:this.$t('tables.crops.caliber')},
          { key: "cropVariety", sortable: false, label: this.$t('tables.crops.variety') },
          { key: "cropRootStock", sortable: false, label: this.$t('tables.crops.rootstock') },
          { key: "cropNumberOfBoxes", sortable: true, label: this.$t('tables.crops.boxesnumber') },
          { key: "cropExpensePrice", sortable: true, label: this.$t('tables.crops.expenseprice') },
          { key: "createDate", sortable: true, label:this.$t('tables.expensetypes.date')},
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
      this.$store.dispatch('crops/getCrops');
    }
  }
</script>

<style lang="scss" scoped>

</style>