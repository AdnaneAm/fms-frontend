<script>
/**
 * Widget Component
 */
export default {
  computed:{
    farmersCount(){
      return this.$store.getters['expenses/getExpensesByType']('farmer').length;
    },
    cropsCount(){
      return this.$store.state.crops.crops.length;
    },
    totalExpenses(){
      return this.$store.getters['outgoings/getOutgoings']
      .map(outgoing => outgoing.outgoingPrice)
      .reduce((acc,curr) => acc+curr);
    },
    statData(){
      return [
        {
          title: this.$t('stats.farmersnumber'),
          icon: "ri-stack-line",
          value: this.farmersCount,
          subvalue: " 2.4% "
        },
        {
          title: this.$t('stats.dailycrops'),
          icon: "ri-store-2-line",
          value: this.cropsCount,
          subvalue: " 2.4% "
        },
        {
          title: this.$t('stats.totalexpenses'),
          icon: "ri-briefcase-4-line",
          value: this.totalExpenses+' MAD',
          subvalue: " 2.4% "
        }
      ]
    } 
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
  <!-- end row -->
</template>