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
        return this.$store.getters['ouvrier/getOuvriers'];
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
              multi:true,
              type:'select',
              options:[
                ...this.parcels.map(parcel => parcel.parcel)
              ]
            },
            {
              id:'crop-rootstock',
              key:'cropRootStock',
              label:'forms.croprootstock',
              labelFor:'root-stock',
              placeholder: 'pick.rootstock',
              type:'select',
              options:[
                ...this.rootstocks.map(rootstock => rootstock.rootStock)
              ]
            },
            {
              id:'crop-variety',
              key:'cropVariety',
              label:'forms.cropvariety',
              labelFor:'variety',
              multi:true,
              placeholder: 'pick.variety',
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
    created(){
      this.item = Object.assign({},this.crop);
      this.item.createDate = this.item.createDate.substr(0,10);
    }
  }
</script>

<style lang="scss" scoped>

</style>