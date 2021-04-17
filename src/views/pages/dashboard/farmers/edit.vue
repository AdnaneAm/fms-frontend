<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <farmer-form :options="options" :id="farmerID"/>
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import FarmerForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      FarmerForm,
    },
    data() {
      return {
        title: 'pages.editfarmer.title',
        farmerID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editfarmer.title'),
            active: true
          }
        ]
      },
      farmer(){
        return this.$store.getters['farmers/getFarmerByID'](this.farmerID);
      },
      options(){
        return {
          title: this.$t('pages.editfarmer.title'),
          description: this.$t('pages.editfarmer.description'),
          updateItemAction:'farmers/setFarmer',
          editItemButton:'pages.editfarmer.title',
          redirectRouteName:'farmers',
          initialItem:Object.assign({},this.farmer),
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