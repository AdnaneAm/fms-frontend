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
        title: 'pages.addolivescrop.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addolivescrop.title'),
            active: true
          }
        ]
      },
      farmers(){
        return this.$store.getters['ouvrier/getOuvriers'];
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
      options(){
        return {
          title: this.$t('pages.addolivescrop.title'),
          description: this.$t('pages.addolivescrop.description'),
          createItemAction:'crops/createCrop',
          createItemButton:'pages.addolivescrop.title',
          redirectRouteName:'olives-crops',
          initialItem:{
            cropFarmer:'',
            cropType:'olives',
            cropParcel:'',
            cropVariety:'',
            cropNumberOfBoxes:0,
            cropExpensePrice:0
          },
          formFields:[
            {
              id:'crop-farmer',
              key:'cropFarmer',
              label:'forms.farmer',
              labelFor:'farmer',
              placeholder: 'pick.farmer',
              type:'select',
              options:[
                ...this.farmers.map(farmer => farmer.ouvrier)
              ]
            },
            {
              id:'crop-parcel',
              key:'cropParcel',
              label:'forms.cropparcel',
              labelFor:'parcel',
              placeholder: 'pick.parcel',
              multi: true,
              type:'select',
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
              multi: true,
              type:'select',
              options:[
                ...this.varieties.map(variety => variety.variety)
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
  }
</script>

<style lang="scss" scoped>

</style>