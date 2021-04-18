<script>
/**
 * Revenue Analytics component
 */
export default {
  data() {
    return {
      chartOptions: {
        chart: {
          height: 280,
          type: "line",
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: [0, 3],
          curve: "smooth"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%"
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        colors: ["#5664d2", "#1cbb8c"],
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      count:[]
    };
  },
  computed : {
    series(){
     return [
        {
          name: "2021",
          type: "column",
          data: this.count
        },
      ]
    },
    currentMonthOutgoings(){
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth();
      return this.count[currentMonth];
    },
    currentYearOutgoings(){
      return this.count.reduce((acc,curr) => acc+curr,0);
    }
  },
  created(){
    this.$store.dispatch('outgoings/getOutgoingsCountByMonth');
    this.count = this.$store.getters['outgoings/getOutgoingsCount'];
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">{{$t('stats.expensesanalytics')}}</h4>
      <div>
        <div id="line-column-chart" class="apex-charts" dir="ltr"></div>
        <apexchart
          class="apex-charts"
          height="280"
          dir="ltr"
          :series="series"
          :options="chartOptions"
        ></apexchart>
      </div>
    </div>

    <div class="card-body border-top text-center">
      <div class="row">
        <div class="col-sm-6">
          <div class="mt-4 mt-sm-0">
            <p class="mb-2 text-muted text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i> 
              {{$t('stats.thismonth')}}
            </p>
            <div class="d-inline-flex">
              <h5 class="mb-0 mr-2">
                {{currentMonthOutgoings}} MAD
              </h5>
              <div class="text-success">
                <i class="mdi mdi-menu-up font-size-14"></i>2.1 %
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="mt-4 mt-sm-0">
            <p class="mb-2 text-muted text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>
                {{$t('stats.thisyear')}}
            </p>
            <div class="d-inline-flex">
              <h5 class="mb-0 mr-2">
                {{currentYearOutgoings}} MAD
              </h5>
              <div class="text-success">
                <i class="mdi mdi-menu-up font-size-14"></i>2.1 %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>