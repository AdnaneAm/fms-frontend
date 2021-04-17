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
        title: 'pages.editolivescrop.title',
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
            text: this.$t('pages.editolivescrop.title'),
            active: true
          }
        ]
      },
      parcels(){
        return this.$store.getters['parcels/getParcels'];
      },
      varieties(){
        return this.$store.getters['varieties/getVarietiesByType']('olives');
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
          title: this.$t('pages.editolivescrop.title'),
          description: this.$t('pages.editolivescrop.description'),
          updateItemAction:'crops/setCrop',
          editItemButton:'pages.editolivescrop.title',
          redirectRouteName:'olives-crops',
          initialItem:Object.assign({},this.crop),
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