import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	admin: null,
    company: null,
    customer_id: null,
  },
  mutations: {
  	roleSet(state, value)
  	{
  		state.admin = value
  	},
    companySet(state, value)
    {
      state.company = value
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
    async companySet({commit}, value)
    {
      commit('companySet', value)
    },
    async customerIDSet({commit}, value)
    {
      commit('customerIDSet', value)
    }
  },
  modules: {
  }
})
