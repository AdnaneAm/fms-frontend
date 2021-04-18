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
            
            cropType:'peach',
            cropParcel:'',
            cropVariety:'',
            cropNumberOfBoxes:0,
            cropRootStock:'',
            cropCaliber:0,
            cropExpensePrice:0
          },
          formFields:[
            {
              id:'crop-farmer',
              key:'cropFarmer',
              label:'forms.farmer',
              labelFor:'farmer',
              type:'select',
              options:[
                {
                  text:'Choose a farmer',
                  value:null
                },
                ...this.farmers.map(farmer => farmer.expenseLabel)
              ]
            },
            {
              id:'crop-parcel',
              key:'cropParcel',
              label:'forms.cropparcel',
              labelFor:'parcel',
              type:'select',
              options:[
                {
                  text:'Choose a parcel',
                  value:null
                },
                ...this.parcels.map(parcel => parcel.parcel)
              ]
            },
            {
              id:'crop-variety',
              key:'cropVariety',
              label:'forms.cropvariety',
              labelFor:'variety',
              type:'select',
              options:[
                {
                  text:'Choose a variety',
                  value:null
                },
                ...this.varieties.map(variety => variety.variety)
              ]
            },
            {
              id:'crop-rootstock',
              key:'cropRootStock',
              label:'forms.croprootstock',
              labelFor:'root-stock',
              type:'select',
              options:[
                {
                  text:'Choose a rootstock',
                  value:null
                },
                ...this.rootstocks.map(rootstock => rootstock.rootStock)
              ]
            },
            {
              id:'crop-caliber',
              key:'cropCaliber',
              label:'forms.cropcaliber',
              labelFor:'caliber',
              type:'select',
              options:[
                {
                  text:'Choose a caliber',
                  value:null
                },
                ...this.calibers.map(caliber => caliber.caliber)
              ]
            },
            {
              id:'crop-boxes-number',
              key:'cropNumberOfBoxes',
              label:'forms.cropboxesnumber',
              labelFor:'boxes-num',
              type:'number',
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