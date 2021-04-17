<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <parcel-form :options="options" :id="parcelID"/>
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import ParcelForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      ParcelForm,
    },
    data() {
      return {
        title: 'pages.editparcel.title',
        parcelID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editparcel.title'),
            active: true
          }
        ]
      },
      parcel(){
        return this.$store.getters['parcels/getParcelByID'](this.parcelID);
      },
      options(){
        return {
          title: this.$t('pages.editparcel.title'),
          description: this.$t('pages.editparcel.description'),
          updateItemAction:'parcels/setParcel',
          editItemButton:'pages.editparcel.title',
          redirectRouteName:'parcels',
          initialItem:Object.assign({},this.parcel),
          formFields:[
            {
              id:'parcel',
              key:'parcel',
              label:'forms.parcel',
              labelFor:'parcel',
              type:'text',
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>