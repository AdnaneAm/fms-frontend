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
        title: 'pages.editalmondcrop.title',
        cropID:this.$route.params.id,
        item:null,
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editalmondcrop.title'),
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
        return this.$store.getters['varieties/getVarietiesByType']('almond');
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
          title: this.$t('pages.editalmondcrop.title'),
          description: this.$t('pages.editalmondcrop.description'),
          updateItemAction:'crops/setCrop',
          editItemButton:'pages.editalmondcrop.title',
          redirectRouteName:'almond-crops',
          initialItem:this.item,
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
                ...this.rootstocks.map(rootstock => rootstock.rootStock)
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
      this.item = Object.assign({},this.crop);
      this.item.createDate = this.item.createDate.substr(0,10);
    }
  }
</script>

<style lang="scss" scoped>

</style>