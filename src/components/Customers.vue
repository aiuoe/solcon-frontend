<template lang="pug">
	.container
		Header
		Nav
		main.main.evenly-center
			.graphs.center-between-column
				.graph.box
				.graph.box
			section.section.center-between-column
				.banner.box
				.customers.box.center-start-column
					.loader(v-if="loading")
						Loader
					.btn-filter(v-if="!loading")
						a(class="link start-center" @click="customerFilter") Filtrar
							i(class="fa fa-filter") 
					.customer-filter(v-if="!loading")
						span compras
						span tickets
					ul.list-column.p-7(v-if="!loading")
						li(class="item p-7 start-center" v-for="customer, key in customers" @click="customerShow(key)")
							a(class="link font") {{ customer.name | capitalize }} {{ customer.lastname | capitalize }}
			.aside.box
				.loader(v-if="loading")
					Loader
				.wrapper.center-column(v-if="!loading")
					.back.start-center
						a(class="link" @click="back")
							i(class="fa fa-angle-left")
					.photo.center
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
								a.link(:class="{active : companiesMenuShow}" @click="menuToggle('companiesMenuShow')")
									i(:class="['fa', 'fa-building', 'center', {'active' : companiesMenuShow}]")
							li.item
								a.link(:class="{active : customerMenuShow}" @click="menuToggle('customerMenuShow')")
									i(:class="['fa', 'fa-user', 'center', {'active' : customerMenuShow}]")

					.content

						.customer-details(v-if="customerMenuShow")
							p Nombre: {{ customer.name }}
							p Apellido: {{ customer.lastname }}
							p Correo: {{ customer.email }}

						//- TICKETS
						.tickets(v-if="ticketsMenuShow")
							Ticket(:tickets.sync="customer.tickets")
						
						.companies(v-if="companiesMenuShow")
							ul.list-column
								li.item(v-for="company in customer.companies")
									a.link
										p Nombre: {{ company.name }}
										p Rif: {{ company.rif }}
										p Cierre Fiscal: {{ company.fyc }}

						.purchases(v-if="purchasesMenuShow")
							ul.list-column
								li.item(v-for="purchase in customer.purchases")
									a.link
										p {{ purchase }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import Header from '@/components/partials/Header.vue';
import Ticket from '@/components/partials/Ticket.vue';
import { GET_ALL_CUSTOMERS } from '@/graphql/Queries';
import Loader from '@/components/partials/Loader.vue';
import gql from 'graphql-tag';
// import Calendar from '@/components/partials/Calendar.vue';
// import ChartBar from '@/components/partials/ChartBar'

@Component({
	name: 'Customers',
	components: { Header, Nav, Loader, Ticket },
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
	customerMenuShow: boolean = true
	companiesMenuShow: boolean = false
	purchasesMenuShow: boolean = false
	ticketsMenuShow: boolean = false

	async created()
	{
		this.loading = true
		return await this.$apollo.query({query: GET_ALL_CUSTOMERS})
		.then((res: any) => 
			{ 
				this.customers = res.data.users.data
				this.customer = this.customers[0]
				this.loading = false
				console.log(typeof this.customers)
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
	height: 19%

.customers
	width: 100%
	height: 80%
	position: relative
	padding: 35px 7px 7px 7px
	box-sizing: border-box
	overflow: hidden

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
			background-color: var(--background)
			margin-bottom: 7px


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
	height: 100px

	.letter
		width: 100px
		height: 100px
		border-radius: 50%
		background-color: var(--background)
		font-size: 50px

.menu
	width: 100%
	height: 35px
	// background-color: var(--background)
	border: 2px solid var(--background)
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

				// .active
					// background-color: transparent !important
					// border-radius: 25px

.content
	width: 100%
	height: calc(100% - 155px)

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