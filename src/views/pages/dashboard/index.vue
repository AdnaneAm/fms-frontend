<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import GeneralStats from "@/components/GeneralStats"
import CropsStats from "@/components/CropsStats"
/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    GeneralStats,
    CropsStats
  },
    data() {
      return {
        title: 'menuitems.dashboard.text',
      }
    },
    computed:{
      items(){
        return [
          {
            text: 'Ferme'
          },
          {
            text: this.$t('menuitems.dashboard.text'),
            active: true
          }
        ]
      }
    }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <general-stats />
    <crops-stats />
  </Layout>
</template>