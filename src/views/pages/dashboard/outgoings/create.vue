<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <outgoing-form 
          :options="options"
          @select-change="updateDependantField"
         />
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
        type:'',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.addoutgoing.title'),
            active: true
          }
        ]
      },
      outgoingtypes(){
        return this.$store.getters['expensetypes/getExpenseTypes'];
      },
      expenses(){
        return this.$store.getters['expenses/getExpensesByType'](this.type);
      },
      options(){
        return {
          title: this.$t('pages.addoutgoing.title'),
          description: this.$t('pages.addoutgoing.description'),
          createItemAction:'outgoings/createOutgoing',
          createItemButton:'pages.addoutgoing.title',
          redirectRouteName:'outgoings',
          initialItem:{
            outgoingLabel:'',
            outgoingType:'',
            outgoingQuantity:0,
            outgoingUnitOfMesure:'',
            outgoingPrice:0,
          },
          formFields:[
            {
              id:'outgoing-type',
              key:'outgoingType',
              label:'forms.outgoingtype',
              labelFor:'outgoing-type',
              type:'select',
              affects: 'outgoingLabel',
              options:[
                ...this.outgoingtypes.map(outgoingType => outgoingType.expenseType)
              ]
            },
            {
              id:'outgoing-label',
              key:'outgoingLabel',
              label:'forms.outgoinglabel',
              labelFor:'outgoing-label',
              type:'select',
              options:[
                ...this.expenses.map(expense => expense.expenseLabel)
              ]
            },
            {
              id:'outgoing-quantity',
              key:'outgoingQuantity',
              label:'forms.quantity',
              labelFor:'outgoing-quantity',
              type:'number'
            },
          ]
        }
      }
    },
    methods:{
      updateDependantField(data){
        this.type = data.value;
      }
    },
    created(){
    }
  }
</script>

<style lang="scss" scoped>

</style>