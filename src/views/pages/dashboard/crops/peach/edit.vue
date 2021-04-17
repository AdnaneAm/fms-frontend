<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <crop-form :options="options" :id="cropID"/>
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
        title: 'pages.editpeachcrop.title',
        cropID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editpeachcrop.title'),
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
      crop(){
        return this.$store.getters['crops/getCropByID'](this.cropID);
      },
      options(){
        return {
          title: this.$t('pages.editpeachcrop.title'),
          description: this.$t('pages.editpeachcrop.description'),
          updateItemAction:'crops/setCrop',
          editItemButton:'pages.editpeachcrop.title',
          redirectRouteName:'peach-crops',
          initialItem:Object.assign({},this.crop),
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
              id:'crop-boxes-number',
              key:'cropNumberOfBoxes',
              label:'forms.cropboxesnumber',
              labelFor:'boxes-num',
              type:'number',
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
                ...this.rootstocks.map(rootstock => rootstock.rootstock)
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
      console.log(this.options.initialItem);
    }
  }
</script>

<style lang="scss" scoped>

</style>