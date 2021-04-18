<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <variety-form :options="options" :id="varietyID"/>
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
        title: 'pages.editvariety.title',
        varietyID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editvariety.title'),
            active: true
          }
        ]
      },
      variety(){
        return this.$store.getters['varieties/getVarietyByID'](this.varietyID);
      },
      options(){
        return {
          title: this.$t('pages.editvariety.title'),
          description: this.$t('pages.editvariety.description'),
          updateItemAction:'varieties/setVarietyByID',
          editItemButton:'pages.editvariety.title',
          redirectRouteName:'varieties',
          initialItem:Object.assign({},this.variety),
          formFields:[
            {
              id:'variety',
              key:'variety',
              label:'forms.variety',
              labelFor:'variety',
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