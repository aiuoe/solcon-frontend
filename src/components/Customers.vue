<template lang="pug">
	.container
		Nav
		main.main.center-column-evenly
			.box.banner
			.box.filter
			.box.customers

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


	//- 		//- 	.graphs
	//- 		//- 		div(class="box banner")
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			span.title Clientes
	//- 		//- 			img(src="../../assets/muneca.png")
	//- 		//- 		div(class="box graph")
	//- 		//- 		div(class="box graph")


	//- 		//- div(class="box aside")
	//- 		//- 	.head
	//- 		//- 		.profile
	//- 		//- 			.photo(:style="{backgroundColor: color}")
	//- 		//- 				span {{ letter | toUpperCase }}
	//- 		//- 		div(class="details font")
	//- 		//- 			span {{ user.name | capitalize }} {{ user.lastname | capitalize }}
	//- 		//- 			span(v-if="address != null") {{ address.country | capitalize }} - {{ address.state | capitalize }}
	//- 		//- 	.nav
	//- 		//- 		ul.list
	//- 		//- 			li.item
	//- 		//- 				a.link
	//- 		//- 					i(class="fa fa-user")
	//- 		//- 			li.item
	//- 		//- 				a.link
	//- 		//- 					i(class="fa fa-building")
	//- 		//- 			li.item
	//- 		//- 				a.link
	//- 		//- 					i(class="fa fa-ticket-alt")
	//- 		//- 			li.item
	//- 		//- 				a.link
	//- 		//- 					i(class="fa fa-shopping-cart")
	//- 		//- 	.data
	//- 		//- 		.wrapper
	//- 		//- 			.phones(v-for="phone in user.phones")
	//- 		//- 				span.phone {{ phone.phone }}
	//- 		//- 		.wrapper
	//- 		//- 		.wrapper
	//- 				.wrapper


</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import { GET_ALL_CUSTOMERS } from '@/queries/Queries';
// import Calendar from '@/components/partials/Calendar.vue';
// import ChartBar from '@/components/partials/ChartBar'

@Component({
	name: 'Customers',
	components: { Nav },
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
	users: object = {}
	// user: any = {}
	// showCompanies: boolean = false
	// showDetails: boolean = true
	// showTickets: boolean = false
	// showPurchases: boolean = false
	// letter: string = ''
	// address: object
	// color: string = ''
	// detailsNav: boolean = true
	// purchasesNav: boolean = false
	// ticketsNav: boolean = false
	// days: any = {}

	async created()
	{
		// 		// this.user = this.users[0]
		// 		// this.address = this.user.address[0]
		// 		// this.letter = this.user.name[0]
		// 		// this.color = this.colors[0]
		// 		// this.aux = this.users
		// console.log(this.$apollo)
		return await this.$apollo.query({query: GET_ALL_CUSTOMERS}).then((res: any) => { this.users = res.data.users.data }).catch((res: any) => console.log(res))
	}	


	// async created()
	// {
	// 	return await this.$apollo
	// 		.query({
	// 	 		query: GET_ALL_USERS
	// 	 	})
	// 		.then(res => {
	// 			this.users = res.data.users.data;
	// 			this.user = this.users[0]
	// 			this.address = this.user.address[0]
	// 			this.letter = this.user.name[0]
	// 			this.color = this.colors[0]
	// 			this.aux = this.users
	// 		})
	// }	

	// async showUser(key)
	// {
	// 	this.user = this.users[key]
	// 	if (this.user.address[0])
	// 		this.address = this.user.address[0]
	// 	else
	// 		this.address = null
	// 	this.letter = this.user.name[0]
	// 	this.color = this.colors[key]
	// }

	// show(key)
	// {
	// 	switch(key)
	// 	{
	// 		case 'details':
	// 			this.showDetails = true
	// 			this.showTickets = false
	// 			this.showPurchases = false
	// 			this.detailsNav = true
	// 			this.purchasesNav = false
	// 			this.ticketsNav = false
	// 			break
	// 		case 'purchases':
	// 			this.showPurchases = true
	// 			this.showDetails = false
	// 			this.showTickets = false
	// 			this.purchasesNav = true
	// 			this.detailsNav = false
	// 			this.ticketsNav = false
	// 			break
	// 		case 'tickets':
	// 			this.showTickets = true
	// 			this.showPurchases = false
	// 			this.showDetails = false
	// 			this.ticketsNav = true
	// 			this.detailsNav = false
	// 			this.purchasesNav = false
	// 	}

	// }

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

	// async createTicket()
	// {
	// 	return await this.$apollo
	// 		.mutate({
	// 			mutation: CREATE_TICKET,
	// 			variables: {
	// 				userID: this.user.id,
	// 				title: this.title.toString(),
	// 				message: this.message.toString(),
	// 				channel: "Web"
	// 			}
	// 		})
	// 		.then(res => {
	// 			this.user.tickets = res.data.updateUser.tickets
	// 			this.showT = !this.showT
	// 		})
	// }


// console.log(this.tickets.filter(t => {let r = false; k.map((key, i) => {(t[key] !== v[i])? r = true : null}); return !r}))
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
$font: #4F4C5F


.banner
	width: 100%
	height: 20%

.filter
	width: 100%
	height: 20%

.customers
	width: 100%
	height: 55%

</style>