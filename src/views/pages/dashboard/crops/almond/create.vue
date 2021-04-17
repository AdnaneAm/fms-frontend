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
        title: 'pages.addalmondcrop.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addalmondcrop.title'),
            active: true
          }
        ]
      },
      parcels(){
        return this.$store.getters['parcels/getParcels'];
      },
      varieties(){
        return this.$store.getters['varieties/getVarietiesByType']('almond');
      },
      rootstocks(){
        return this.$store.getters['rootstocks/getRootstocks'];
      },
      options(){
        return {
          title: this.$t('pages.addalmondcrop.title'),
          description: this.$t('pages.addalmondcrop.description'),
          createItemAction:'crops/createCrop',
          createItemButton:'pages.addalmondcrop.title',
          redirectRouteName:'almond-crops',
          initialItem:{
            id:Math.floor(Math.random()*10000),
            cropType:'almond',
            cropParcel:'',
            cropVariety:'',
            cropNumberOfBoxes:0,
            cropRootstock:'',
            cropExpensePrice:0
          },
          formFields:[
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
              id:'crop-boxes-number',
              key:'cropNumberOfBoxes',
              label:'forms.cropboxesnumber',
              labelFor:'boxes-num',
              type:'number',
            },
            {
              id:'crop-rootstock',
              key:'cropRootstock',
              label:'forms.croprootstock',
              labelFor:'root-stock',
              type:'select',
              options:[
                {
                  text:'Choose a rootstock',
                  value:null
                },
                ...this.rootstocks.map(rootstock => rootstock.rootstock)
              ]
            },
            {
              id:'crop-expense-price',
              key:'cropExpensePrice',
              label:'forms.cropexpenseprice',
              labelFor:'expense-price',
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