<template>
  <div class="row">
    <!-- modal for peaches -->
    <b-modal
      v-model="peachsModal"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal>
      <template>
        <div class="row center" v-for="(caliber, index) of item.cropCaliber" :key="caliber">
          <div class="col-6">
            <label :for="caliber"><code>{{ caliber }}</code>:</label>
          </div>
          <div class="col-6">
            <b-form-input :id="caliber" type="number" @keyup="caliberSet($event, index)" min="0"></b-form-input>
          </div>
        </div>
      </template>
    </b-modal>
    <!-- Modal for olives & almonds -->
    <b-modal
      v-model="olivesModal"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal>
      <template>
        <div class="row center" v-for="(parcel) of item.cropParcel" :key="parcel">
          <div class="row center" v-for="(variety) of item.cropVariety" :key="variety">
            <div class="col-3">
              <label><code>{{ parcel }}</code>:</label>
            </div>
            <div class="col-3">
              <label><code>{{ variety }}</code>:</label>
            </div>
            <div class="col-3">
              <b-form-input type="number" @keyup="olivesSet(olivesValue, parcel, variety)" min="0" v-model="olivesValue"></b-form-input>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">{{options.title}}</h4>
          <p class="card-title-desc">
            {{options.description}}
          </p>
          <div class="row center" v-if="checkIfCrop">
            <div class="col-3">
              <b-form-radio v-model="paiment"  name="some-radios" value="Jours">Paiement journalier</b-form-radio>
            </div>
            <div class="col-3">
              <b-form-radio v-model="paiment"  name="some-radios" value="Tâches">Paiement à la tâche</b-form-radio>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <form @submit.prevent="createOrUpdateItem" class="form-horizontal" role="form">
                <b-form-group
                  v-for="field in options.formFields"
                  :key="field.id"
                  :id="field.id"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  :label="$t(field.label)"
                  :label-for="field.labelFor"
                >
                  <multiselect 
                    :id="field.key"
                    :for="field.labelFor" 
                    v-if="field.type=='select'"
                    :label="field.key == 'rootType' ? 'text': null"
                    v-model="item[field.key]" 
                    :options="field.options" 
                    :show-labels="false"
                    :placeholder="$t(field.placeholder)"
                    :close-on-select="!computeSelectField(field)" 
                    :multiple="computeSelectField(field)"
                    @close="closedSelection"></multiselect>
                  <b-form-checkbox
                    v-else-if="field.type=='check'"
                    v-model="item[field.key]"
                    :value="true"
                    :unchecked-value="false"
                  >
                    {{$t(field.check_message)}}
                  </b-form-checkbox>
                  <b-form-input v-else :for="field.labelFor" v-model="item[field.key]" :type="field.type">
                  </b-form-input>
                </b-form-group>
                <button class="btn btn-primary" type="submit">{{submitMessage}}</button>
              </form>
            </div>
          </div>
          <!-- end row -->
        </div>
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
  watch: {
    paiment: function() {
      this.item['cropFarmer'] = ''
    }
  },
    data() {
      return {
        item:this.options.initialItem,
        paiment: 'Jours',
        peachsModal: false,
        olivesModal: false,
        calibreItems: {},
        oliveItems: {}
      }
    },
    computed: {
      checkIfCrop() {
        return ['peach', 'olives', 'almond'].includes(this.item.cropType)
      },
      computePaymentMethod() {
        return this.paiment == 'Jours'
      },
      submitMessage() {
        if(this.id){
          return this.$t(this.options.editItemButton)
        }
        else{
          return this.$t(this.options.createItemButton)
        }
      },
    },
    props: {
      options: {
        type: Object,
        required:true,
      },
      id:{
        type:String,
        required:false,
        default:null
      }
    },
    methods:{
      caliberSet(e, index) {
        const value = e.target.value
        const caliber = this.item.cropCaliber[index]
        if(Number(value)>0) {
          this.calibreItems[caliber] = {key: caliber, value: value}
          this.item.calibers = this.calibreItems
        } else {
          delete this.calibreItems[caliber]
          this.item.calibers = this.calibreItems
        }
        console.log(this.calibreItems)
      },
      olivesSet(value, parcel, variety) {
        this.oliveItems[parcel + "," + variety] = {parcel: parcel, variety: variety, value: value}
        this.item.olivesCases = this.oliveItems
      },
      closedSelection(value,id) {
        if(this.checkIfEligibleFromPopUp(id, "cropCaliber")) {
          this.peachsModal = true
        }
        if(this.checkIfEligibleFromPopUp(id, "cropVariety") && ['olives', 'almond'].includes(this.item.cropType)) {
          this.olivesModal = true
        }
        if(id == "outgoingType") {
          const expenses = this.$store.getters['expenses/getExpensesByType'](this.item["outgoingType"]);
          this.options.formFields[1].options = [
            ...expenses.map(expense => expense.expenseLabel)
          ]
        }
        if(id == "outgoingLabel") {
          const expense = this.$store.getters['expenses/getExpenseByLabel'](this.item["outgoingLabel"]);
          this.item.outgoingUnitOfMesure = expense.expenseMesureUnit
          this.item.outgoingPrice = expense.price
        }
      }, 
      checkIfEligibleFromPopUp(id, field) {
        return id == field && this.item[field].length > 0
      },
      computeSelectField(field) {
        return field.multi || (field.key == "cropFarmer" && this.computePaymentMethod)
      },
      createOrUpdateItem(){
        if(this.id){
          this.$store.dispatch(this.options.updateItemAction,this.item)
        }
        else{
          this.item.pme = this.paiment
          this.item.rootType = this.item.rootType?.value
          console.log(this.item)
          this.$store.dispatch(this.options.createItemAction,this.item)
        }
        this.$router.push({name:this.options.redirectRouteName})
      }
    },
    created(){
      console.log(this.item);
    },
    components: {
      Multiselect 
    }
  }
</script>

<style lang="scss" scoped>
  .center {
    justify-content: space-around;
    padding: 1rem;
  }
</style>