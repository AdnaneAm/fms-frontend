<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <rootstock-form :options="options" :id="rootstockID"/>
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
        title: 'pages.editrootstock.title',
        rootstockID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editrootstock.title'),
            active: true
          }
        ]
      },
      rootstock(){
        return this.$store.getters['rootstocks/getRootstockByID'](this.rootstockID);
      },
      options(){
        return {
          title: this.$t('pages.editrootstock.title'),
          description: this.$t('pages.editrootstock.description'),
          updateItemAction:'rootstocks/setRootstock',
          editItemButton:'pages.editrootstock.title',
          redirectRouteName:'rootstocks',
          initialItem:Object.assign({},this.rootstock),
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
    }
  }
</script>

<style lang="scss" scoped>

</style>