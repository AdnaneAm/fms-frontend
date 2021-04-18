<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <variety-form :options="options" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import VarietyForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      VarietyForm,
    },
    data() {
      return {
        title: 'pages.addvariety.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addvariety.title'),
            active: true
          }
        ]
      },
      options(){
        return {
          title: this.$t('pages.addvariety.title'),
          description: this.$t('pages.addvariety.description'),
          createItemAction:'varieties/createVariety',
          createItemButton:'pages.addvariety.title',
          redirectRouteName:'varieties',
          initialItem:{
            
            variety:'',
            rootType:'',
          },
          formFields:[
            {
              id:'variety',
              key:'variety',
              label:'forms.variety',
              labelFor:'variety',
              type:'text',
            },
            {
              id:'root-type',
              key:'rootType',
              label:'forms.roottype',
              labelFor:'root-type',
              type:'select',
              options:[
                {
                  text:'Choose a root type',
                  value:null,
                },
                {
                  text:this.$t('forms.peach'),
                  value:'peach'
                },
                {
                  text:this.$t('forms.olives'),
                  value:'olives'
                },
                {
                  text:this.$t('forms.almond'),
                  value:'almond'
                }
              ]
            }
          ]
        }
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>