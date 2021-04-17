<script>
/**
 * Sales Analytics component
 */
export default {
  computed:{
    series(){
      return [this.cropsCount('peach'), this.cropsCount('olives'), this.cropsCount('almond')];
    },
    chartOptions(){
      return {
        chart: {
          height: 230,
          type: "donut"
        },
        labels: [
          this.$t('stats.peachcrops'),
          this.$t('stats.olivescrops'),  
          this.$t('stats.almondcrops'),
        ],
        plotOptions: {
          pie: {
            donut: {
              size: "75%"
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        colors: ["#5664d2", "#1cbb8c", "#eeb902"]
      }
    }
  },
  methods:{
    cropsCount(type){
      return this.$store.getters['crops/getCropsByType'](type).length;
    },
    cropsPercentage(type){
      const totalCount = this.$store.state.crops.crops.length;
      return Math.floor((this.cropsCount(type)/totalCount)*100);
    }
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <!-- <div class="float-right">
        <select class="custom-select custom-select-sm">
          <option selected>Apr</option>
          <option value="1">Mar</option>
          <option value="2">Feb</option>
          <option value="3">Jan</option>
        </select>
      </div> -->
      <h4 class="card-title mb-4">{{$t('stats.cropsstats')}}</h4>

      <div id="donut-chart" class="apex-charts"></div>
      <apexchart
        class="apex-charts"
        height="230"
        dir="ltr"
        :series="series"
        :options="chartOptions"
      ></apexchart>
      <div class="row">
        <div class="col-4">
          <div class="text-center mt-4">
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i> {{$t('stats.peachcrops')}}
            </p>
            <h5>{{cropsPercentage('peach')}} %</h5>
          </div>
        </div>
        <div class="col-4">
          <div class="text-center mt-4">
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-success font-size-10 mr-1"></i> {{$t('stats.olivescrops')}}
            </p>
            <h5>{{cropsPercentage('olives')}} %</h5>
          </div>
        </div>
        <div class="col-4">
          <div class="text-center mt-4">
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-warning font-size-10 mr-1"></i> {{$t('stats.almondcrops')}}
            </p>
            <h5>{{cropsPercentage('almond')}} %</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>