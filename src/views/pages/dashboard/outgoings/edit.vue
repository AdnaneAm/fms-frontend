<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <outgoing-form :options="options" :id="outgoingID" />
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import OutgoingForm from '@/components/BaseForm';
  export default {
    components: {
      Layout,
      PageHeader,
      OutgoingForm,
    },
    data() {
      return {
        title: 'pages.addoutgoing.title',
        outgoingID:this.$route.params.id
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.editoutgoing.title'),
            active: true
          }
        ]
      },
      outgoingtypes(){
        return this.$store.getters['expensetypes/getExpenseTypes']
      },
      expenses(){
        return this.$store.getters['expenses/getExpenses']
      },
      outgoing(){
        return this.$store.getters['outgoings/getOutgoingByID'](this.outgoingID)
      },
      options(){
        return {
          title: this.$t('pages.editoutgoing.title'),
          description: this.$t('pages.editoutgoing.description'),
          updateItemAction:'outgoings/updateOutgoing',
          editItemButton:'pages.editoutgoing.title',
          redirectRouteName:'outgoings',
          initialItem:Object.assign({},this.outgoing),
          formFields:[
            {
              id:'outgoing-label',
              key:'outgoingLabel',
              label:'forms.outgoinglabel',
              labelFor:'outgoing-label',
              type:'select',
              options:[
                {
                  text:'Choose a label',
                  value:null,
                },
                ...this.expenses.map(expense => expense.expenseLabel)
              ]
            },
            {
              id:'outgoing-type',
              key:'outgoingType',
              label:'forms.outgoingtype',
              labelFor:'outgoing-type',
              type:'select',
              options:[
                {
                  value:null,
                  text:'Choose an outgoing type'
                },
                ...this.outgoingtypes.map(outgoingType => outgoingType.expenseType)
              ]
            },
            {
              id:'outgoing-quantity',
              key:'outgoingQuantity',
              label:'forms.quantity',
              labelFor:'outgoing-quantity',
              type:'number'
            },
            {
              id:'outgoing-measure-unit',
              key:'outgoingUnitOfMesure',
              label:'forms.outgoingmeasureunit',
              labelFor:'outgoing-measure-unit',
              type:'text'
            },
          ]
        }
      }
    },
    created(){
      console.log(this.outgoing);
    }
  }
</script>

<style lang="scss" scoped>

</style>