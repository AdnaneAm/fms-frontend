<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <parcel-form :options="options" />
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
        title: 'pages.addparcel.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addparcel.title'),
            active: true
          }
        ]
      },
      options(){
        return {
          title: this.$t('pages.addparcel.title'),
          description: this.$t('pages.addparcel.description'),
          createItemAction:'parcels/createParcel',
          createItemButton:'pages.addparcel.title',
          redirectRouteName:'parcels',
          initialItem:{
            
            parcel:'',
          },
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
    },

  }
</script>

<style lang="scss" scoped>

</style>