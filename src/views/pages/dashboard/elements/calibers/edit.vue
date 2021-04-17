<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <caliber-form :options="options" :id="caliberID"/>
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
        title: 'pages.editcaliber.title',
        caliberID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editcaliber.title'),
            active: true
          }
        ]
      },
      caliber(){
        return this.$store.getters['calibers/getCaliberByID'](this.caliberID);
      },
      options(){
        return {
          title: this.$t('pages.editcaliber.title'),
          description: this.$t('pages.editcaliber.description'),
          updateItemAction:'calibers/setCaliber',
          editItemButton:'pages.editcaliber.title',
          redirectRouteName:'calibers',
          initialItem:Object.assign({},this.caliber),
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
    }
  }
</script>

<style lang="scss" scoped>

</style>