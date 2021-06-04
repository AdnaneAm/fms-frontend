<template>
      <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="home">
            <div class="home-container">
                <div class="card almonds">
                    <img src="@/assets/images/icons/almonds.svg" />
                </div>
                <div class="card peach">
                    <img src="@/assets/images/icons/peach.svg" />
                </div>
                <div class="card olives">
                    <img src="@/assets/images/icons/olives.svg" />
                </div>
                 <div class="card almonds">
                    <img src="@/assets/images/icons/almonds.svg" />
                </div>
                <div class="card peach">
                    <img src="@/assets/images/icons/peach.svg" />
                </div>
                <div class="card olives">
                    <img src="@/assets/images/icons/olives.svg" />
                </div>
                <div class="card almonds">
                    <img src="@/assets/images/icons/almonds.svg" />
                </div>
                <div class="card peach">
                    <img src="@/assets/images/icons/peach.svg" />
                </div>
                <div class="card olives">
                    <img src="@/assets/images/icons/olives.svg" />
                </div>
                 <div class="card almonds">
                    <img src="@/assets/images/icons/almonds.svg" />
                </div>
                <div class="card peach">
                    <img src="@/assets/images/icons/peach.svg" />
                </div>
                <div class="card olives">
                    <img src="@/assets/images/icons/olives.svg" />
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
    import Layout from "@/views/layouts/main";
    import PageHeader from "@/components/page-header";
export default {
    components: {
      Layout,
      PageHeader
    },
    data() {
      return {
        title: 'pages.home.title',
      }
    },
    computed:{
      items(){
        return [
          {
            text: this.$t('pages.home.title'),
            active: true
          }
        ]
      }
    }
}
</script>

<style lang="scss" scoped>
    .home {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
    }
    .home-container {
        align-self: center;
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: .9rem;
    }

    .card {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 1rem;
        border-radius: 15px;
        width: 10rem;
        height: 10rem;
        transition: 500ms all;
    }   
    .card:hover {
        transform: scale(1.2);
    }
    img {
        width: 5rem;
    }
    .almonds {
        background-color: rgba(43, 3, 3, 0.664);
        -webkit-box-shadow: 0px 0px 12px -1px rgba(160,113,84,1);
        -moz-box-shadow: 0px 0px 12px -1px rgba(160,113,84,1);
        box-shadow: 0px 0px 12px -1px rgba(160,113,84,1);
    }
    .olives {
        background-color: rgb(22, 37, 21);
        -webkit-box-shadow: 0px 0px 12px -1px rgb(5, 131, 62);
        -moz-box-shadow: 0px 0px 12px -1px rgb(5, 131, 62);
        box-shadow: 0px 0px 12px -1px rgb(5, 131, 62);
    }

    .peach {
        background-color: rgba(224, 132, 11, 0.767);
        -webkit-box-shadow: 0px 0px 12px -1px rgb(172, 39, 5);
        -moz-box-shadow: 0px 0px 12px -1px rgb(172, 39, 5);
        box-shadow: 0px 0px 12px -1px rgb(172, 39, 5);
    }
</style>