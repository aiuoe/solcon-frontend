<template lang="pug">
	.container
		Header
		Nav
		main.main.evenly-center
			.graphs.center-between-column
				.graph.box
				.graph.box
			section.section.center-between-column
				.banner
				.customers.center-start-column
					.loader(v-if="loading")
						Loader
					.btn-filter(v-if="!loading")
						a(class="link start-center" @click="customerFilter") Filtrar
							i(class="fa fa-filter") 
					.customer-filter(v-if="!loading")
						a(style="cursor: pointer;" @click="filter('name')") nombre
					ul.list-column.p-7(id="customers" v-if="!loading" @scroll="customersGet")
						li(class="item p-7 start-center" v-for="customer, key in customers" @click="customerShow(key)")
							a(class="link font") {{ customer.name | capitalize }} - {{ customer.lastname | capitalize }}
			.aside.box
				.loader(v-if="loading")
					Loader
				.wrapper.start-column(v-if="!loading")
					.back.start-center
						a(class="link" @click="back")
							i(class="fa fa-angle-left")
					.photo.start-center
						span(class="letter center font" v-if="customer.name") {{ customer.name[0] | toUpperCase }}
					.menu
						ul.list
							li.item
								a.link(@click="menuToggle('ticketsMenuShow')")
									i(:class="['fa', 'fa-ticket-alt', 'center', {'active' : ticketsMenuShow}]")
							li.item
								a.link(@click="menuToggle('purchasesMenuShow')")
									i(:class="['fa', 'fa-shopping-cart', 'center', {'active' : purchasesMenuShow}]")
							li.item
								a.link(@click="menuToggle('companiesMenuShow')")
									i(:class="['fa', 'fa-building', 'center', {'active' : companiesMenuShow}]")
							li.item
								a.link(@click="menuToggle('customerMenuShow')")
									i(:class="['fa', 'fa-user', 'center', {'active' : customerMenuShow}]")

					.content

						.customer-details(v-if="customerMenuShow")
							p Nombre: {{ customer.name }}
							p Apellido: {{ customer.lastname }}
							p Correo: {{ customer.email }}
						//- TICKETS
						.tickets(v-if="ticketsMenuShow")
							Ticket(v-bind:customer.sync="customer" v-bind:tickets.sync="customer.tickets")
						.companies(v-if="companiesMenuShow")
						.purchases(v-if="purchasesMenuShow")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import Header from '@/components/partials/Header.vue';
import Ticket from '@/components/partials/Ticket.vue';
import { GET_ALL_CUSTOMERS } from '@/graphql/Queries';
import Loader from '@/components/partials/Loader.vue';
import { capitalize, upperCase } from '@/modules/Filter';
import { mapState, mapActions } from 'vuex'
import gql from 'graphql-tag';
// import Calendar from '@/components/partials/Calendar.vue';
import '@/modules/Array'

@Component({
	name: 'Customers',
	components: { Header, Nav, Loader, Ticket },
	filters: {
	  capitalize: capitalize,
	  toUpperCase: upperCase
	},
	methods:
	{
		...mapActions(['customerSet'])
	}
})
export default class Customers extends Vue {
	customers: any = {}
	customer: any = {}
	page: number = 1
	total: number = 1
	hasMorePages: boolean = true
	id: number = 0
	loading: boolean = false
	customerMenuShow: boolean = true
	companiesMenuShow: boolean = false
	purchasesMenuShow: boolean = false
	ticketsMenuShow: boolean = false
	customerSet!: (value: object | undefined) => any

	async created()
	{
		this.loading = true
		await this.$apollo.query({ query: GET_ALL_CUSTOMERS, variables: { page: 1 }})
		.then((res: any) => 
			{ 
				this.customers = res.data.users.data
				this.total = res.data.users.paginatorInfo.total
				if (this.customers.length == this.total)
					this.hasMorePages = false
				this.customer = this.customers[0]
				this.loading = false
			})
		.catch((res: any) => console.log(res))

		const obs = this.$apollo.subscribe({
			query: gql(`subscription
				UserUpdated
				{
					userUpdated
					{
						id
						name
						lastname
						email
					}
				}`)})
		obs.subscribe({
			next: (data: any) => { 
				this.customers.upsert(data.data.userUpdated)
				this.customer = this.customers[0]
			},
			error: (error: any) => console.log(error)
		})
	}

	async customersGet()
	{
		const { 
			scrollTop, 
			offsetHeight, 
			scrollHeight } = document.querySelector<HTMLElement>('#customers')!
		if ( (scrollTop + offsetHeight) == scrollHeight)
			if ( this.hasMorePages )
			{
				this.page++
				await this.$apollo.query({ query: GET_ALL_CUSTOMERS, variables: { page: this.page }})
				.then((res: any) => {	
					this.customers = this.customers.concat(res.data.users.data)
					this.hasMorePages = res.data.users.paginatorInfo.hasMorePages
				})
			}
	}

	async filter(key: any)
	{
		let params = {
			"lastname": {order: 'desc'},
			"name": {order: 'desc'}
		}
		this.customers.orderBy(params)
	}

	async customerFilter()
	{
		let box: any = document.querySelector('.customer-filter'),
				listCustomers: any = document.querySelector('.list-column')

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
		this.customerSet(this.customers[id])
	}


	menuToggle(key: any)
	{
		switch (key)
		{
			case 'customerMenuShow':
				this.customerMenuShow = true
				this.companiesMenuShow = false
				this.purchasesMenuShow = false
				this.ticketsMenuShow = false
				break
			case 'ticketsMenuShow':
				this.customerMenuShow = false
				this.companiesMenuShow = false
				this.purchasesMenuShow = false
				this.ticketsMenuShow = true
				break
			case 'purchasesMenuShow':
				this.customerMenuShow = false
				this.companiesMenuShow = false
				this.purchasesMenuShow = true
				this.ticketsMenuShow = false
				break
			case 'companiesMenuShow':
				this.customerMenuShow = false
				this.companiesMenuShow = true
				this.purchasesMenuShow = false
				this.ticketsMenuShow = false
				break
			default:
				this.customerMenuShow = true
				this.companiesMenuShow = false
				this.purchasesMenuShow = false
				this.ticketsMenuShow = false
				break
		}
	}

	back()
	{
		let aside: any = document.querySelector('.aside')
		aside.style.display = 'none'
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
	height: 19%
	box-shadow: var(--shadow)
	background-color: var(--contrast)

.customers
	width: 100%
	height: 80%
	position: relative
	padding: 35px 7px 7px 7px
	box-sizing: border-box
	overflow: hidden
	box-shadow: var(--shadow)
	background-color: var(--contrast)

	.customer-filter
		display: none
		width: 100%
		height: 0%
		padding: 10px
		box-sizing: border-box

	.list-column
		width: 100%
		height: 100%

		.item
			width: 100%
			height: 30px
			margin-bottom: 7px
			border: 1px solid var(--background)
			border-radius: 3px


// ASIDE
.aside
	width: calc(100% - 14px)
	height: 94%
	display: none
	position: absolute
	padding: 10px
	box-sizing: border-box

.loader
	width: 100%
	height: 100%


// show
.back
	width: 100%
	height: 30px

	.fa
		color: var(--font)
		font-size: 40px

.photo
	width: 100%
	height: 50px

	.letter
		width: 50px
		height: 50px
		border-radius: 50%
		background-color: var(--background)
		font-size: 25px

.menu
	width: 100%
	height: 35px
	background-color: var(--background)
	border-radius: 20px
	margin: 10px 0px

	.list
		width: 100%
		height: 100%
		justify-content: space-evenly

		.item
			width: 200px
			height: 100%
			border: 0px

			.link
				width: 100%
				height: 100%

				.fa
					width: 100%
					height: 100%

.content
	width: 100%
	height: calc(100% - 92px)

	.tickets
		width: 100%
		height: 100%


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


@media screen and (min-width: 768px)
	
	.graphs
		width: 30%
		height: 100%

		.graph
			width: 100%
			height: 49.5%


	.section
		width: 35%
		height: 100%

	.aside
		position: relative
		width: 35%
		height: 100%
		display: flex
		padding: 10px
		box-sizing: border-box

	.back
		display: none
	
@media screen and (min-width: 1024px)
	
	.aside
		width: 30%


</style>