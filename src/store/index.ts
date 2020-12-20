import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	admin: null,
    me: null,
    company: null,
    customer: null,
    comments: false,
  },
  mutations: {
  	adminSet(state, value)
  	{
  		state.admin = value
  	},
    meSet(state, value)
    {
      state.me = value
    },
    companySet(state, value)
    {
      state.company = value
    },
    customerSet(state, value)
    {
      state.customer = value
    },
    commentSet(state, value)
    {
      state.comments = value
    }
  },
  actions: {
  	async adminSet ({commit}, value)
  	{
			commit('adminSet', value)  		
  	},
    async meSet({commit}, value)
    {
      commit('meSet', value)
    },
    async companySet({commit}, value)
    {
      commit('companySet', value)
    },
    async customerSet({commit}, value)
    {
      commit('customerSet', value)
    },
    async commentSet({commit}, value)
    {
      commit('commentSet', value)
    }
  },
  modules: {
  }
})
