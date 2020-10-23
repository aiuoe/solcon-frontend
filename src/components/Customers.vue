<template lang="pug">
	.container
		Nav
		main.main.evenly-center-column
			section.section.evenly-center-column
				.box.banner
				.box.customers.start-center-column
					.btn-filter
						a(class="link start-center" @click="customerFilter") Filtrar
							i(class="fa fa-filter") 
					.customer-filter
						span compras
						span tickets
					ul.list-column
						li(class="item start-center" v-for="customer, key in customers" @click="customerShow(key)")
							a(class="link font") {{ customer.name | capitalize }} {{ customer.lastname | capitalize }}
			.customer-show.box.start-center-column
				.back
					a(class="link" @click="customerHide")
						i(class="fa fa-angle-left")
				.photo.center
					span(class="center font") {{ letter | toUpperCase }}
				span(class="fullname center font") {{ customer.name | capitalize }} {{ customer.lastname | capitalize }}
				.menu
					ul.list
						li.item
							a.link
								i(class="fa fa-shopping-cart center")
						li.item
							a.link
								i(class="fa fa-ticket-alt center")
						li.item
							a.link
								i(class="fa fa-user center")

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
	customers: any = {}
	customer: any = {}
	address: object = {}
	letter: string = ''

	async created()
	{
		return await this.$apollo.query({query: GET_ALL_CUSTOMERS})
		.then((res: any) => 
			{ 
				this.customers = res.data.users.data
				this.customer = this.customers[0]
				this.letter = this.customer.name[0]
			})
		.catch((res: any) => console.log(res))
	}	

	async customerShow(key: number)
	{
		let box: any = document.querySelector('.customer-show')
		box.style.display = 'flex'
		this.customer = this.customers[key]
		if (this.customer.address[0] != null)
			this.address = this.customer.address[0]
		else
			this.address = {}
		this.letter = this.customer.name[0]
	}

	async customerHide()
	{
		let box: any = document.querySelector('.customer-show')
		box.style.display = 'none'
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

.customer-show
	width: calc(100% - 14px)
	height: 94%
	display: none
	position: absolute
	padding: 10px
	box-sizing: border-box

	.menu
		width: 100%
		height: 35px
		background-color: var(--background)

		.list
			width: 100%
			height: 100%
			justify-content: space-evenly

			.item
				width: 200px
				height: 100%
				border: 0px
				padding: 0px

				.link
					width: 100%
					height: 100%

					.fa
						width: 100%
						height: 100%

.back
	width: 100%
	height: 25px

	.link

		.fa
			font-size: 25px

.photo
	width: 100%
	height: 85px
	margin-bottom: 10px

	span
		width: 85px
		height: 85px
		border-radius: 50%
		background-color: var(--background)
		font-size: 50px

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
	margin-bottom: 5px
	padding: 10px
	box-sizing: border-box
	cursor: pointer
	border: 1px solid var(--light)
	border-radius: 3px



@media screen and (min-width: 768px)
	.section
		align-self: flex-start
		width: 55%
		height: 100%

	.customer-show
		width: 40%
		height: 100vh
		display: flex
		position: absolute
		right: 0px
		padding: 10px
		box-sizing: border-box

	.back
		display: none
	


</style>