import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	admin: null,
    company_id: null,
    customer_id: null,
  },
  mutations: {
  	roleSet(state, value)
  	{
  		state.admin = value
  	},
    companyIDSet(state, value)
    {
      state.company_id = value
    },
    customerIDSet(state, value)
    {
      state.customer_id = value
    }
  },
  actions: {
  	async roleSet ({commit}, value)
  	{
			commit('roleSet', value)  		
  	},
    async companyIDSet({commit}, value)
    {
      commit('companyIDSet', value)
    },
    async customerIDSet({commit}, value)
    {
      commit('customerIDSet', value)
    }
  },
  modules: {
  }
})
