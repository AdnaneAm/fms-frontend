<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <b-tabs fill>
          <b-tab :title="$t('pages.outgoings.all')" active>
            <outgoings-list :fields="fields" :items="outgoings('all')" :options="options" />
          </b-tab>
          <b-tab v-for="(expenseType, index) in expenseTypes" :key="`et-${index}`" :title="expenseType">
            <outgoings-list :fields="fields" :items="outgoings(expenseType)" :options="options" />
          </b-tab>
        </b-tabs>
    </Layout>
</template>

<script>
  import Layout from "@/views/layouts/main";
  import PageHeader from "@/components/page-header";
  import OutgoingsList from "@/components/ListingTable"
  export default {
    components: {
      Layout,
      PageHeader,
      OutgoingsList,
    },
    data() {
      return {
        title: 'pages.outgoings.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('menuitems.dashboard.text')
          },
          {
            text: this.$t('pages.outgoings.title'),
            active: true
          }
        ]
      },
      fields(){
        return [
          { key: "outgoingLabel", sortable: true, label:this.$t('tables.outgoings.label')},
          { key: "outgoingType", sortable: false, label:this.$t('tables.outgoings.type')},
          { key: "outgoingQuantity", sortable: true, label: this.$t('tables.outgoings.quantity') },
          { key: "outgoingPrice", sortable: true, label: this.$t('tables.outgoings.price') },
          { key: "outgoingUnitOfMesure", sortable: false, label: this.$t('tables.outgoings.unit') },
          { key: "createDate", sortable: true, label: this.$t('tables.outgoings.date') },
          { key: "action" }
        ]
      },
      options(){
        return {
          editRouteName:'edit-outgoing',
          deleteActionName:'outgoings/deleteOutgoingByID',
          title:this.$t('tables.outgoings.title')
        }
      },
      expenseTypes(){
        return this.$store.getters['expensetypes/getExpenseTypes'].map(et => et.expenseType);
      },
    },
    methods:{
      outgoings(type='all'){
        if(type == 'all'){
          return this.$store.getters['outgoings/getOutgoings'];
        }
        return this.$store.getters['outgoings/getOutgoingsByType'](type);
      }
    },
    created(){
      this.$store.dispatch('outgoings/getOutgoings');
      console.log(this.expenseTypes);
    }
  }
</script>

<style lang="scss" scoped>

</style>