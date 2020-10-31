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
					ul.list-column.p-7(v-if="!loading")
						li(class="item p-7 start-center" v-for="customer, key in customers" @click="customerShow(key)")
							a(class="link font") {{ customer.name | capitalize }} {{ customer.lastname | capitalize }}
			.aside.box
				.loader(v-if="loading")
					Loader
				.wrapper(v-if="!loading")
					.back.start-center
						a(class="link" @click="back")
							i(class="fa fa-angle-left")
					.photo.center
						span(class="letter center font" v-if="customer.name") {{ customer.name[0] | toUpperCase }}
					.menu
						ul.list
							li.item
								a.link(@click="menuToggle('ticketsMenuShow')")
									i(class="fa fa-ticket-alt center")
							li.item
								a.link(@click="menuToggle('purchasesMenuShow')")
									i(class="fa fa-shopping-cart center")
							li.item
								a.link(@click="menuToggle('companiesMenuShow')")
									i(class="fa fa-building center")
							li.item
								a.link(@click="menuToggle('customerMenuShow')")
									i(class="fa fa-user center")

					.content

						.customer-details(v-if="customerMenuShow")
							p Nombre: {{ customer.name }}
							p Apellido: {{ customer.lastname }}
							p Correo: {{ customer.email }}

						//- TICKETS
						.tickets.evenly-center-column(v-if="ticketsMenuShow")

							a(class="btn btn-new" @click="ticketBtnCreateToggle") Nuevo

							form(@submit.prevent="ticketCreate" class="form" id="ticketFormCreate" v-if="ticketCreateForm")

								input(v-model="title" type="text" class="input input-flat" placeholder="Titulo: ")
								textarea(v-model="message" class="textarea textarea-flat" placeholder="Mensaje: ")

								.form-group

									.switch.p-7
										label.shape
											input(class="checkbox" type="checkbox" id="public" v-model="public")
											span(class="slider")
										label(for="public" class="label") Publico - Privado

									.switch.p-7
										label.shape
											input(class="checkbox" type="checkbox" id="pinned" v-model="pinned")
											span(class="slider")
										label(for="pinned" class="label") Anclado


								.form-group

									.switch.p-7
										label.shape
											input(class="checkbox" type="checkbox" id="priority" v-model="priority")
											span(class="slider")
										label(for="priority" class="label") Urgente - Normal

									.switch.p-7
										label.shape
											input(class="checkbox" type="checkbox" id="status" v-model="status")
											span(class="slider")
										label(for="status" class="label") Abierto - Cerrado

								input(class="btn btn-create" type="submit" value="Crear")

							ul(class="list-column p-7" id="listTicket")
								li(:class="['item', {'item-info': !ticket.status, 'item-danger': ticket.status}]" v-for="ticket in customer.tickets")
									a(class="link start-start-column")
										span Creado por: {{ ticket.user_id[0].name | capitalize }} {{ ticket.user_id[0].lastname | capitalize }}
										span Titulo: {{ ticket.title }}
										span Mensaje: {{ ticket.message }}
										span Creado el: {{ ticket.created_at }}
									.actions
										a(class="action") 
											i(v-if="!ticket.status" class="fa fa-lock")
											i(v-if="ticket.status" class="fa fa-lock-open")
										a(class="action")
											i(v-if="!ticket.priority" class="fa fa-lock")
											i(v-if="ticket.priority" class="fa fa-lock")
										a(class="action")
											i(v-if="!ticket.pinned" class="fa fa-star fa-star-danger")
											i(v-if="ticket.pinned" class="fa fa-star fa-star-warning")
										a(class="action")
											i(v-if="!ticket.public" class="fa fa-lock")
											i(v-if="ticket.public" class="fa fa-lock-open")

									//- .controls
									//- 	a(class="control")			
						
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
import { GET_ALL_CUSTOMERS } from '@/graphql/Queries';
import Loader from '@/components/partials/Loader.vue';
import gql from 'graphql-tag';
// import Calendar from '@/components/partials/Calendar.vue';
// import ChartBar from '@/components/partials/ChartBar'

@Component({
	name: 'Customers',
	components: { Nav, Loader },
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
	title: string = ''
	message: string = ''
	public: boolean = false
	priority: boolean = false
	pinned: boolean = false
	status: boolean = false
	channel: string = 'web'
	ticketCreateForm: boolean = false

	async created()
	{
		this.loading = true
		return await this.$apollo.query({query: GET_ALL_CUSTOMERS})
		.then((res: any) => 
			{ 
				this.customers = res.data.users.data
				this.customer = this.customers[0]
				console.log(this.customer)
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

	ticketBtnCreateToggle()
	{
		let list: any = document.querySelector('#listTicket')
		let form: any = document.querySelector('#ticketFormCreate')
		if (this.ticketCreateForm)
		{
			this.ticketCreateForm = false	
			list.style.height = '100%'
			form.style.height = '0%'
		}
		else
		{
			this.ticketCreateForm = true
			list.style.height = '50%'
		}
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

	async ticketCreate()
	{

		return await this.$apollo
			.mutate({	mutation: gql(`	mutation($uID: ID!, $toID: ID!, $title: String, $message: String, $public: Boolean, $status: Boolean, $pinned: Boolean, $priority: Boolean, $channel: String)
			{
				updateUser(id: $uID, input: 
				{
					tickets:
					{
						create:
						{
							users: 
							{
								connect: [$toID]
							},
							title: $title,
							message: $message,
							public: $public,
							status: $status,
							pinned: $pinned,
							priority: $priority,
							channel: $channel
						}
					}
				})
				{
					tickets
					{
						title
						message
						public
						priority
						status
						pinned
						channel
					}
				}
			}`),
			variables: 
			{
				uID: 1,
				toID: this.customer.id,
				title: this.title,
				message: this.message,
				public: this.public,
				priority: this.priority,
				status: this.status,
				pinned: this.pinned,
				channel: this.channel
			}			
		})
		.then(res => {
			this.customer.tickets = res.data.updateUser.tickets
			this.ticketCreateForm = false
			let list: any = document.querySelector('#listTicket')
			list.style.height = '100%'
		})
		.catch(err => console.log(err))
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

.tickets
	width: 100%
	height: 100%

	.list-column
		width: 100%
		height: 100%

		.item
			width: 100%
			margin-bottom: 7px
			display: flex
			justify-content: space-between

			.link
				width: 70%
				height: 100%
				display: flex
				flex-direction: column
				padding: 7px
				box-sizing: border-box
				font-size: 17px

			.actions
				width: 30%
				height: 100%
				display: grid
				grid-template-columns: repeat(2, 50%)
				grid-template-rows: repeat(2, 50%)

				.action
					display: flex
					justify-content: center
					align-items: center
					width: 100%
					height: 100%
					background-color: var(--background)
					color: var(--font)
					text-align: center
					cursor: pointer

			.controls
				.control



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
	background-color: var(--background)
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
	height: calc(100% - 155px)




// BUTTONS
.btn-new
	width: 25%
	padding: 7px
	margin-bottom: 7px
	box-sizing: border-box
	align-self: flex-end
	text-align: center
	font-weight: bold
	font-size: 20px
	color: white
	background-image: linear-gradient(to right, var(--success), teal) 

.btn-create
	background-image: linear-gradient(to right, var(--info), darken(slateblue, 10%))
	width: 25%
	color: white
	font-size: 20px
	font-weight: bold

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





// FORMS
.form
	height: 49%
	margin-bottom: 7px
	background-color: var(--background)

	.input
		background-color: white
		color: var(--background)
		font-size: 20px

		&::placeholder
			color: var(--background)

	.textarea
		background-color: white
		color: var(--background)
		font-size: 18px

		&::placeholder
			color: var(--background)



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

	.back
		display: none
	
@media screen and (min-width: 1024px)
	
	.aside
		width: 30%


</style>