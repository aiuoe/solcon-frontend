import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { apolloClient } from '@/apollo'
import VueApollo from 'vue-apollo'

Vue.directive('opacity', function (el:any, binding: any)
{
	if (binding.value)
		el.style.opacity = 1
	else
		el.style.opacity = 0
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
