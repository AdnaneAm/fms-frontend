<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <caliber-form :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import CaliberForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      CaliberForm,
    },
    data() {
      return {
        title: 'pages.addcaliber.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addcaliber.title'),
            active: true
          }
        ]
      },
      options(){
        return {
          title: this.$t('pages.addcaliber.title'),
          description: this.$t('pages.addcaliber.description'),
          createItemAction:'calibers/createCaliber',
          createItemButton:'pages.addcaliber.title',
          redirectRouteName:'calibers',
          initialItem:{
            id:Math.floor(Math.random()*10000),
            caliber:'',
          },
          formFields:[
            {
              id:'caliber',
              key:'caliber',
              label:'forms.caliber',
              labelFor:'caliber',
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