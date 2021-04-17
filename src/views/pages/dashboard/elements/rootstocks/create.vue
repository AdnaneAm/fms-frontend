<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <rootstock-form :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import RootstockForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      RootstockForm,
    },
    data() {
      return {
        title: 'pages.addrootstock.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addrootstock.title'),
            active: true
          }
        ]
      },
      options(){
        return {
          title: this.$t('pages.addrootstock.title'),
          description: this.$t('pages.addrootstock.description'),
          createItemAction:'rootstocks/createRootstock',
          createItemButton:'pages.addrootstock.title',
          redirectRouteName:'rootstocks',
          initialItem:{
            id:Math.floor(Math.random()*10000),
            rootstock:'',
          },
          formFields:[
            {
              id:'rootstock',
              key:'rootstock',
              label:'forms.rootstock',
              labelFor:'rootstock',
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