<template lang="pug">
	.container
		Header
		Nav
		main.main.evenly-center
			.content.box.p-7
			.aside.box.start-start-column
				.head.center
					.portrait
						img(class="img" src="http://lorempixel.com/400/300/nature")
					.photo
						img(class="img" src="http://lorempixel.com/400/300/people")
				.menu
					ul.list
						li.item.center
							a.link.center(@click="menuToggle('tickets')")
								i(class="fa fa-ticket-alt center")
						li.item.center
							a.link.center(@click="menuToggle('purchasesMenuShow')")
								i(class="fa fa-shopping-cart center")
						li.item.center
							a.link.center(@click="menuToggle('companiesMenuShow')")
								i(class="fa fa-building center")
						li.item.center
							a.link.center(@click="menuToggle('details')")
								i(class="fa fa-user center")
				.body
					.details(v-if="details")
					.tickets(v-if="tickets")
						form(@submit.prevent="ticketCreate" class="form" v-if="ticketCreateForm")
							input(v-model="title" type="text" class="input input-flat" placeholder="Titulo: ")
							textarea(v-model="message" class="textarea textarea-flat" placeholder="Mensaje: ")
							.form-group
								.switch.p-7
									label.shape
										input(class="checkbox" type="checkbox" id="public" v-model="public")
										span(class="slider")
									label(for="public" class="label") Publico Privado
								.switch.p-7
									label.shape
										input(class="checkbox" type="checkbox" id="pinned" v-model="pinned")
										span(class="slider")
									label(for="pinned" class="label") Anclado Desanclado
							.form-group
								.switch.p-7
									label.shape
										input(class="checkbox" type="checkbox" id="priority" v-model="priority")
										span(class="slider")
									label(for="priority" class="label") Urgente normal
								.switch.p-7
									label.shape
										input(class="checkbox" type="checkbox" id="status" v-model="status")
										span(class="slider")
									label(for="status" class="label") Abierto Cerrado
							input(class="btn btn-create" type="submit" value="Crear")

						ul.list-column.p-7
							li.item.center-start-column.p-7(v-for="ticket in me.tickets")
								span {{ ticket.title }}
								span {{ ticket.message }}
								span {{ ticket.public }}
								span {{ ticket.pinned }}
								span {{ ticket.public }}
								.controls.evenly-center
									.control.start-center
										a(class="link") 
											i(class="fa fa-thumbs-up")
											span {{ '100' }}
									.control.center
										a(class="link evenly-center")
											i(class="fa fa-comment")
											span {{ '100' }}
									.control.center
										a(class="link evenly-center")
											i(class="fa fa-edit")
									.control.center
										a(class="link" @click="deleteTicket(ticket.id)")
											i(class="fa fa-trash")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import Header from '@/components/partials/Header.vue';
import Loader from '@/components/partials/Loader.vue';
import { ME } from '@/graphql/Queries';
import { DELETE_TICKET } from '@/graphql/Mutations';
import '@/modules/Array'

@Component({
	name: 'Profile',
	components: { Header, Nav, Loader },
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
export default class Profile extends Vue {

	me: any = {}
	tickets: boolean = false
	details: boolean = true

	async created()
	{
		await this.$apollo.query({query: ME})
			.then(res => { this.me = res.data.me })
	}

	menuToggle(key: string)
	{
		switch(key)
		{
			case 'details':
				this.tickets = false
				this.details = true
				break
			case 'tickets':
				this.details = false
				this.tickets = true
				break
		}
	}

	async deleteTicket(id: number)
	{
		return await this.$apollo.mutate({mutation: DELETE_TICKET, variables: {id: id}})
		.then(res => { this.me.tickets.delete(id) })
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.content
	width: 65%
	height: 100%

.aside
	width: 30%
	height: 100%

.head
	width: 100%
	height: 30%
	position: relative

	.portrait
		width: 100%
		height: 100%

	.photo
		position: absolute
		width: 100px
		height: 100px
		cursor: pointer
		border-radius: 50%
		border: 3px solid var(--primary) 

		img
			width: 100%
			height: 100%
			border-radius: 50%

	.profile

.menu
	width: 100%
	height: 50px
	background-color: var(--background)

	.list
		width: 100%
		height: 100%

		.item
			width: 100%
			height:100%

			.link
				width: 100%
				height: 100%

.body
	width: 100%
	height: calc(70% - 50px)

	.details
		width: 100%
		height: 100%

	.tickets
		width: 100%
		height: 100%

		.item
			border: 1px solid var(--background)

			.controls
				width: 100%
				height: 30px

				.control
					height: 100%


</style>