<template lang="pug">
	.wrapper
		.back.start-center
			a(class="link" @click="back")
				i(class="fa fa-angle-left")
		.photo.center
			span(class="letter center font" v-if="customer.name") {{ customer.name[0] | toUpperCase }}
		.menu
			ul.list
				li.item
					a.link(@click="menuToggle('tickets')")
						i(class="fa fa-ticket-alt center")
				li.item
					a.link(@click="menuToggle('purchases')")
						i(class="fa fa-shopping-cart center")
				li.item
					a.link(@click="menuToggle('companies')")
						i(class="fa fa-building center")
				li.item
					a.link(@click="menuToggle('customerDetails')")
						i(class="fa fa-user center")

		.content

			.customer-details(v-if="customerDetails")
				p Nombre: {{ customer.name }}
				p Apellido: {{ customer.lastname }}
				p Correo: {{ customer.email }}

			.tickets.evenly-center-column(v-if="tickets")
				a(class="btn btn-new") Nuevo
				form(class="form")
					input(type="text" class="input input-flat" placeholder="Titulo: ")
					textarea(class="textarea textarea-flat" placeholder="Mensaje: ")
					.group
						.form-wrapper
							label(for="public" class="label") Publico
							input(class="checkbox" type="checkbox" id="public" v-model="public")
						.form-wrapper
							label(for="pinned" class="label") Anclar
							input(class="checkbox" type="checkbox" id="pinned" v-model="pinned")
					.group
						.form-wrapper
							label(for="priority" class="label") Prioridad
							input(class="checkbox" type="checkbox" id="priority" v-model="priority")
						.form-wrapper
							label(for="status" class="label") Estado
							input(class="checkbox" type="checkbox" id="status" v-model="status")

				ul.list-column
					li(class="item start-center" v-for="ticket in customer.tickets")
						a.link
							p Titulo: {{ ticket.title }}
							p Mensaje: {{ ticket.message }}
							p Estado: {{ ticket.status? 'Abierto' : 'Cerrado' }}
							p Publico: {{ ticket.public? 'Si' : 'No' }}
							p Anclado: {{ ticket.pinned? 'Si' : 'No' }}
							p Prioridad: {{ ticket.priority? 'Urgente' : 'Normal' }}
							p Canal: {{ ticket.channel | capitalize }}
			
			.companies(v-if="companies")
				ul.list-column
					li.item(v-for="company in customer.companies")
						a.link
							p Nombre: {{ company.name }}
							p Rif: {{ company.rif }}
							p Cierre Fiscal: {{ company.fyc }}

			.purchases(v-if="purchases")
				ul.list-column
					li.item(v-for="purchase in customer.purchases")
						a.link
							p {{ purchase }}

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
	name: 'CustomerShow',
	components: { },
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
export default class CustomerShow extends Vue {
	@Prop() customer: any
	customerDetails: boolean = true
	companies: boolean = false
	purchases: boolean = false
	tickets: boolean = false
	public: boolean = false
	priority: boolean = false
	pinned: boolean = false
	status: boolean = false

	async created()
	{

	}

	menuToggle(key: any)
	{
		switch (key)
		{
			case 'customerDetails':
				this.customerDetails = true
				this.companies = false
				this.purchases = false
				this.tickets = false
				break
			case 'tickets':
				this.customerDetails = false
				this.companies = false
				this.purchases = false
				this.tickets = true
				break
			case 'purchases':
				this.customerDetails = false
				this.companies = false
				this.purchases = true
				this.tickets = false
				break
			case 'companies':
				this.customerDetails = false
				this.companies = true
				this.purchases = false
				this.tickets = false
				break
			default:
				this.customerDetails = true
				this.companies = false
				this.purchases = false
				this.tickets = false
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
		// return await this.$apollo.mutate({
			
		// })
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

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
			padding: 0px

			.link
				width: 100%
				height: 100%

				.fa
					width: 100%
					height: 100%

.content
	width: 100%
	height: calc(100% - 155px)
	padding: 7px
	box-sizing: border-box

.tickets
	width: 100%
	height: 100%
	padding: 7px
	box-sizing: border-box

.btn-new
	align-self: flex-end
	padding: 7px
	box-sizing: border-box
	background-color: var(--success) 
	color: white
	margin-bottom: 7px

.list-column
	width: 100%
	height: 50%
	padding: 7px
	box-sizing: border-box

	.item
		width: 100%
		padding: 7px
		box-sizing: border-box
		background-color: var(--background)
		cursor: pointer

.form
	height: 50%

	&-wrapper
		display: grid
		grid-template-columns: repeat(2, 50%)
		align-items: center
		// justify-items: center
		// align-content: center

.group
	width: 70%
	display: flex
	justify-content: space-evenly

.label
	justify-self: flex-end
	padding: 0px 7px

// .input
// 	background-color: var(--background)
// 	border: 0px

// .textarea
// 	width: 70%
// 	height: 70px
// 	border: 0px
// 	outline: none
// 	background-color: var(--background)

@media screen and (min-width: 768px)
	.back
		display: none

</style>