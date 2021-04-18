<script>
/**
 * Widget Component
 */
export default {
  data(){
    return {
      cropsCount:0,
    }
  },
  computed:{
    farmersCount(){
      return this.$store.getters['expenses/getExpensesByType']('farmer').length;
    },
    totalExpenses(){
      return this.$store.getters['outgoings/getOutgoings']
      .map(outgoing => outgoing.outgoingPrice)
      .reduce((acc,curr) => acc+curr,0);
    },
    statData(){
      return [
        {
          title: this.$t('stats.farmersnumber'),
          icon: "ri-group-line",
          value: this.farmersCount,
          subvalue: " 2.4% "
        },
        {
          title: this.$t('stats.dailycrops'),
          icon: "ri-leaf-line",
          value: this.cropsCount,
          subvalue: " 2.4% "
        },
        {
          title: this.$t('stats.totalexpenses'),
          icon: "ri-wallet-3-line",
          value: this.totalExpenses+' MAD',
          subvalue: " 2.4% "
        }
      ]
    } 
  },
  created(){
    this.$store.dispatch('crops/getCropsByPeriod','day').then (crops => {
      this.cropsCount = crops.length;
    })
    this.$store.dispatch('outgoings/getOutgoings');
    this.$store.dispatch('expenses/getExpenses');
    this.$store.dispatch('crops/getCrops');
  }
};
</script>

<template>
  <div class="row">
    <div class="col-md-4" v-for="(data, index) in statData" :key="index">
      <div class="card">
        <div class="card-body">
          <div class="media">
            <div class="media-body overflow-hidden">
              <p class="text-truncate font-size-14 mb-2">{{data.title}}</p>
              <h4 class="mb-0">{{data.value}}</h4>
            </div>
            <div class="text-primary">
              <i :class="`${data.icon} font-size-24`"></i>
            </div>
          </div>
        </div>

        <div class="card-body border-top py-3">
          <div class="text-truncate">
            <span class="badge badge-soft-success font-size-11">
              <i class="mdi mdi-menu-up"></i>
              {{data.subvalue}}
            </span>
            <span class="text-muted ml-2">{{$t('stats.previousperiod')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>