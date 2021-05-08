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
  computed: {
    loggedIn() {
      return this.$store.getters['auth/loggedIn']; 
    }
  },
  created(){
    // Set the logged in user from local storage in state
    this.$store.dispatch('auth/setLoggedInUser');
    //If the user is authenticated get the data 
    if(this.loggedIn){
      this.$store.dispatch('crops/getCrops');
      this.$store.dispatch('parcels/getParcels');
      this.$store.dispatch('calibers/getCalibers');
      this.$store.dispatch('rootstocks/getRootstocks');
      this.$store.dispatch('varieties/getVarieties');
      this.$store.dispatch('expensetypes/getExpensetypes');
      this.$store.dispatch('expenses/getExpenses');
      this.$store.dispatch('outgoings/getOutgoings');
    }

  }
};
</script>