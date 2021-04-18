<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import appConfig from "@/app.config";

export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  },
  created(){
    // Get data 
    this.$store.dispatch('crops/getCrops');
    this.$store.dispatch('parcels/getParcels');
    this.$store.dispatch('calibers/getCalibers');
    this.$store.dispatch('rootstocks/getRootstocks');
    this.$store.dispatch('varieties/getVarieties');
    this.$store.dispatch('expensetypes/getExpensetypes');
    this.$store.dispatch('expenses/getExpenses');
    // Set the logged in user from local storage in state
    this.$store.dispatch('auth/setLoggedInUser');
  }
};
</script>