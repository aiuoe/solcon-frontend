<template lang="pug">
	.container
		Nav
		main.main.evenly-center-column
			section.section.evenly-center-column
				.box.banner
				.box.customers.start-center-column
					.loader(v-if="loading")
						Loader
					.btn-filter(v-if="!loading")
						a(class="link start-center" @click="customerFilter") Filtrar
							i(class="fa fa-filter") 
					.customer-filter(v-if="!loading")
						span compras
						span tickets
					ul.list-column(v-if="!loading")
						li(class="item start-center" v-for="customer, key in customers" @click="customerShow(key)")
							a(class="link font") {{ customer.name | capitalize }} {{ customer.lastname | capitalize }}
			.aside.box
				.loader(v-if="loading")
					Loader
				CustomerShow(:customer="customer" v-if="!loading")


			//- .users
			//- 	div(class="box filter")
			//- 		.queries
			//- 			span(class="tag" @click="filter('all')") todos
			//- 			span(class="tag" @click="filter('purchases')") compras
			//- 			span(class="tag" @click="filter('tickets')") tickets

			//- 		.calendar
			//- 			.fromto
			//- 				span(v-if="fDate != null" class="fromto") Desde: {{fDate[0]}}/{{fDate[1]}}/{{fDate[2]}}
			//- 				span(v-if="lDate != null" class="fromto") Hasta: {{lDate[0]}}/{{lDate[1]}}/{{lDate[2]}}
			//- 			//- Calendar(@sendDate="getDate")

			//- 	div(class="box customers")
			//- 		ul.list
			//- 			li.item(v-for="(user, key) in users" @click="showUser(key)")
			//- 				.profile
			//- 					span.photo(:style="{backgroundColor: colors[key]}") {{ user.name[0] | toUpperCase }}
			//- 				.data-user
			//- 					div.fullname
			//- 						span {{ user.name | capitalize }} {{ user.lastname | capitalize }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import { GET_ALL_CUSTOMERS } from '@/graphql/Queries';
import CustomerShow from '@/components/partials/CustomerShow.vue';
import Loader from '@/components/partials/Loader.vue';
// import Calendar from '@/components/partials/Calendar.vue';
// import ChartBar from '@/components/partials/ChartBar'

@Component({
	name: 'Customers',
	components: { Nav, CustomerShow, Loader },
	filters: {
	  capitalize: function (value: any)
	  {
	    if (!value) return ''
	    value = value.toString()
	    return value.charAt(0).toUpperCase() + value.slice(1)
	  },
	  toUpperCase: function(value: any)
	  {
	  	if (!value) return ''
	    value = value.toString()
		  return value.toUpperCase()
	  }
	}
})
export default class Customers extends Vue {
	customers: any = {}
	customer: any = {}
	id: number = 0
	loading: boolean = false

	async created()
	{
		this.loading = true
		return await this.$apollo.query({query: GET_ALL_CUSTOMERS})
		.then((res: any) => 
			{ 
				this.customers = res.data.users.data
				this.customer = this.customers[0]
				this.loading = false
			})
		.catch((res: any) => console.log(res))
	}	

	async customerFilter()
	{
		let box: any = document.querySelector('.customer-filter')
		let listCustomers: any = document.querySelector('.list-column')

		if (box.style.display !== 'flex')
		{
			box.style.display = 'flex'
			box.style.height = '20%'
			listCustomers.style.height = '80%'
		}
		else
		{
			box.style.height = '0%'
			box.style.display = 'none'
			listCustomers.style.height = '100%'
		}
	}

	customerShow(id: number)
	{
		let box: any = document.querySelector('.aside')
		box.style.display = 'flex'
		this.customer = this.customers[id]
	}

	// getDate(date)
	// {
	// 	if (this.key != 'all')
	// 	{
	// 		if(this.firstDate == null)
	// 		{
	// 			this.firstDate = `${date[2]}-${date[1]+1}-${date[0]}`
	// 			this.fDate = date
	// 			this.lastDate = null
	// 			this.filter(this.key)
	// 		}
	// 		else
	// 		{
	// 			this.lastDate = `${date[2]}-${date[1]+1}-${date[0]}`
	// 			this.lDate = date
	// 			this.filter(this.key)
	// 			this.firstDate = null
	// 		}
	// 	}
	// }

	// filter(key)
	// {
	// 	this.key = key
	// 	switch(this.key)
	// 	{
	// 		case 'all':
	// 			this.fDate = null
	// 			this.lDate = null
	// 			this.users = this.aux
	// 			break
	// 		case 'purchases':
	// 			this.fDate = null
	// 			this.lDate = null
	// 			this.users = this.aux
	// 			this.users = this.users.filter(u => u.products.length > 0)
	// 			break
	// 		case 'tickets':
	// 			this.users = this.aux
	// 			this.users = this.users.filter(u => u.Ntickets > 0)				
	// 			if(this.firstDate != null)
	// 			{
	// 				this.users = this.aux
	// 				this.users = this.users.filter(u => (u.tickets.filter( t => {t.created_at = t.created_at.split('-').map(n => Math.abs(n)).join('-'); let a = new Date(t.created_at), b = new Date(this.firstDate); return a >= b }).length)? true : false)
	// 			}
	// 			if(this.firstDate != null && this.lastDate != null)
	// 			{
	// 				this.users = this.aux
	// 				this.users = this.users.filter(u => (u.tickets.filter(t =>{t.created_at = t.created_at.split('-').map(n => Math.abs(n)).join('-');let a = new Date(t.created_at),b = new Date(this.firstDate),c = new Date(this.lastDate);return a >= b && a <= c}).length)? true : false)
	// 			}
	// 			break
	// 	}
	// }

// console.log(this.tickets.filter(t => {let r = false; k.map((key, i) => {(t[key] !== v[i])? r = true : null}); return !r}))
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.section
	width: 100%
	height: 100%
	overflow: hidden

.banner
	width: 100%
	height: 15%

.customers
	width: 100%
	height: 80%
	position: relative
	padding: 35px 3px
	box-sizing: border-box
	overflow: hidden

.aside
	width: calc(100% - 14px)
	height: 94%
	display: none
	position: absolute
	padding: 10px
	box-sizing: border-box

.btn-filter
	width: 100%
	height: 35px
	position: absolute
	top: 0px

	.link
		width: 10%
		height: 100%
		padding: 10px
		box-sizing: border-box

		.fa
			order: -1
			margin-right: 5px

.customer-filter
	display: none
	width: 100%
	height: 0%
	padding: 10px
	box-sizing: border-box

.fullname
	width: 100%
	margin-bottom: 5px

.list-column
	width: 100%
	height: 100%
	padding: 10px
	box-sizing: border-box
	overflow-y: scroll

	.item
		width: 100%
		height: 30px
		padding: 10px
		box-sizing: border-box
		background-color: var(--background)
		margin-bottom: 7px
		cursor: pointer

.loader
	width: 100%
	height: 100%

@media screen and (min-width: 768px)
	.main
		padding-right: 30%

	.section
		// align-self: flex-start
		width: 80%
		height: 100%

	.aside
		width: 35%
		height: 100vh
		display: flex
		position: absolute
		right: 0px
		padding: 10px
		box-sizing: border-box
	
@media screen and (min-width: 1024px)
	
	.aside
		width: 30%


</style>