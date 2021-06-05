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
        cropID:this.$route.params.id,
        item:null
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
      farmers(){
        return this.$store.getters['expenses/getExpensesByType']('farmer');
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
    created(){
      this.item = Object.assign({},this.crop);
      this.item.createDate = this.item.createDate.substr(0,10);
    }
  }
</script>

<style lang="scss" scoped>

</style>