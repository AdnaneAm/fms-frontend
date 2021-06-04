<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <crop-form :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import CropForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      CropForm,
    },
    data() {
      return {
        title: 'pages.addpeachcrop.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addpeachcrop.title'),
            active: true
          }
        ]
      },
      farmers(){
        return this.$store.getters['expenses/getExpensesByType']('farmer');
      },
      parcels(){
        return this.$store.getters['parcels/getParcels'];
      },
      varieties(){
        return this.$store.getters['varieties/getVarietiesByType']('peach');
      },
      rootstocks(){
        return this.$store.getters['rootstocks/getRootstocks'];
      },
      calibers(){
        return this.$store.getters['calibers/getCalibers'];
      },
      options(){
        return {
          title: this.$t('pages.addpeachcrop.title'),
          description: this.$t('pages.addpeachcrop.description'),
          createItemAction:'crops/createCrop',
          createItemButton:'pages.addpeachcrop.title',
          redirectRouteName:'peach-crops',
          initialItem:{
            cropFarmer:'',
            cropType:'peach',
            cropParcel:'',
            cropVariety:'',
            cropRootStock:'',
            cropCaliber:'',
            cropExpensePrice:0
          },
          formFields:[
            {
              id:'crop-farmer',
              key:'cropFarmer',
              label:'forms.farmer',
              placeholder: 'pick.farmer',
              labelFor:'farmer',
              type:'select',
              options:[
                ...this.farmers.map(farmer => farmer.expenseLabel)
              ]
            },
            {
              id:'crop-parcel',
              key:'cropParcel',
              label:'forms.cropparcel',
              labelFor:'parcel',
              placeholder: 'pick.parcel',
              type:'select',
              multi:false,
              options:[
                ...this.parcels.map(parcel => parcel.parcel)
              ]
            },
            {
              id:'crop-variety',
              key:'cropVariety',
              label:'forms.cropvariety',
              labelFor:'variety',
              placeholder: 'pick.variety',
              multi:false,
              type:'select',
              options:[
                ...this.varieties.map(variety => variety.variety)
              ]
            },
            {
              id:'crop-rootstock',
              key:'cropRootStock',
              label:'forms.croprootstock',
              labelFor:'root-stock',
              placeholder: 'pick.rootstock',
              multi:false,
              type:'select',
              options:[
                ...this.rootstocks.map(rootstock => rootstock.rootStock)
              ]
            },
            {
              id:'crop-caliber',
              key:'cropCaliber',
              label:'forms.cropcaliber',
              labelFor:'caliber',
              multi:true,
              placeholder: 'pick.caliber',
              type:'select',
              options:[
                ...this.calibers.map(caliber => caliber.caliber)
              ]
            },
            {
              id:'create-date',
              key:'createDate',
              label:'forms.cropdate',
              labelFor:'create-date',
              type:'date',
            },
          ]
        }
      }
    },
    created(){
    }
  }
</script>

<style lang="scss" scoped>

</style>