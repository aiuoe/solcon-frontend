<template lang="pug">
	.tickets.center-start-column
		.btn-group
			a(class="ticket-filter p-7 evenly-center" @click="toggle(3)")
				i(class="fa fa-filter")
				span Filtrar / Ordenar
			a(class="btn btn-info center" @click="toggle(1)") Nuevo

		//- filter
		div.filter(v-if="filter")
			a(@click="orderBy('pinned')") Anclado

		input(class="input input-search" v-if="!form" type="text" placeholder="Buscar")

		//- form
		form(@submit.prevent="upsert" class="form-column p-7" v-if="form")
			input(v-model="ticket.title" type="text" class="input input-flat" placeholder="Titulo: ")
			textarea(v-model="ticket.message" class="textarea textarea-flat" placeholder="Mensaje: ")
			.form-group
				.switch.p-7
					label.shape
						input(class="checkbox" type="checkbox" id="public" v-model="ticket.public")
						span(class="slider")
					label(for="public" class="label") Publico Privado
				.switch.p-7
					label.shape
						input(class="checkbox" type="checkbox" id="pinned" v-model="ticket.pinned")
						span(class="slider")
					label(for="pinned" class="label") Anclado Desanclado
			.form-group
				.switch.p-7
					label.shape
						input(class="checkbox" type="checkbox" id="priority" v-model="ticket.priority")
						span(class="slider")
					label(for="priority" class="label") Urgente normal
				.switch.p-7
					label.shape
						input(class="checkbox" type="checkbox" id="status" v-model="ticket.status")
						span(class="slider")
					label(for="status" class="label") Abierto Cerrado
			input(class="btn btn-create" type="submit" value="Enviar")


		ul.list-column.p-7(ref="listFilter" v-if="!form")
			li.item.p-7(v-for="(ticket, key) in tickets")
				.start-center-column.p-7
					span {{ ticket.title }}
					span {{ ticket.message }}
					span Publico: {{ ticket.public }}
					span Urgente: {{ ticket.priority }}
					span Anclado: {{ ticket.pinned }}
					span Abierto: {{ ticket.status }}
					span Creado: {{ ticket.created_at }}
				.controls
					.control
						a(class="link evenly-center")
							i(class="fa fa-thumbs-up")
							span {{ '100' }}
					.control
						a(class="link evenly-center")
							i(class="fa fa-comment")
							span {{ '100' }}
					.control
						a(class="link evenly-center" @click="toggle(2, ticket.id)")
							i(class="fa fa-edit")
					.control
						a(class="link evenly-center" @click="deleteTicket(ticket.id)")
							i(class="fa fa-trash")

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TICKET_UPSERT, TICKET_DELETE } from '@/graphql/mutations/ticket'
import { USER_TICKETS } from '@/graphql/queries/user'
import '@/modules/Array'

@Component({
	name: 'Ticket',
})
export default class Ticket extends Vue {
	form: boolean = false
	filter: boolean = false
	list: boolean = true
	store: boolean = false
	params: any = {}
	order: boolean = false
	ticket = {
		id: '',
		title: '',
		message: '',
		pinned: false,
		priority: false,
		public: false,
		status: false,
		channel: 'web'
	}
	tickets: any = {}

	@Prop() cid: any

	@Watch('cid', {immediate: true}) 
	onCustomerChanged()
	{
		this.$apollo.query({query: USER_TICKETS, variables: { id: this.cid, page: 1 }})
		.then(res => {
			this.tickets = res.data.user.tickets.data
		})
		.catch(err => console.log(err))
	}

	toggle(key: number, id: number | null = null)
	{
		if (key == 1)
		{
			this.store = true
			this.list = false
			this.form = true
			this.filter = false
		}
		else if (key == 2)
		{
			this.store = false
			this.list = false
			this.form = true
			this.ticket = this.tickets[this.tickets.findIndex((t: any) => t.id == id)]
			this.filter = false
		}
		else if (key == 3)
		{
			this.form = false
			this.list = true
			this.filter = true
		}
	}

	async upsert()
	{
		if (this.store)
		{
			return await this.$apollo.mutate({
				mutation: TICKET_UPSERT, 
				variables: {
					users: [this.$store.state.me.id, this.cid],
					title: this.ticket.title,
					message: this.ticket.message,
					pinned: this.ticket.pinned,
					public: this.ticket.public,
					priority: this.ticket.priority,
					status: this.ticket.status,
					due_date: "2020-12-16"
				}})
				.then(res => {
					this.tickets.push(res.data.ticketUpsert)
					this.form = false
					this.list = true
				})
				.catch(err => console.log(err))
		}
		else
		{
			return await this.$apollo.mutate({
				mutation: TICKET_UPSERT, 
				variables: {
					id: this.ticket.id,
					users: [this.$store.state.me.id, this.cid],
					title: this.ticket.title,
					message: this.ticket.message,
					pinned: this.ticket.pinned,
					public: this.ticket.public,
					priority: this.ticket.priority,
					status: this.ticket.status,
					due_date: "2020-12-16"
				}})
				.then(res => {
					this.tickets.update(this.ticket.id, res.data.ticketUpsert)
					this.form = false
					this.list = true
				})
				.catch(err => console.log(err))
		}
	}

	async deleteTicket(id: number)
	{
		return await this.$apollo.mutate({mutation: TICKET_DELETE, variables: {id: id}})
		.then(res => { this.tickets.delete(id) })
	}
}
</script>

<style lang="sass" scoped>
.tickets
	width: 100%
	min-height: 100%

.list-column
	width: 100%
	height: 100%

.btn-group
	width: 100%
	margin-bottom: 14px
	display: flex
	justify-content: space-between
	align-items: center

	.ticket-filter
		width: 50%
		cursor: pointer

	.btn-info
		width: 25%
		color: white

.input-search
	border-radius: 25px
	height: 40px
	font-size: 17px

.filter
	width: 100%
	height: calc(30% - 7px)
	border: 1px solid var(--background)
	margin-bottom: 7px

.form-column
	// border: 1px solid var(--background)

.form-group
	width: 90%

.input
	width: 90%
	background-color: var(--contrast)
	border: 2px solid var(--background)
	color: var(--font)

	&::placeholder
		color: var(--font)

.textarea
	width: 90%
	background-color: var(--contrast)
	border: 2px solid var(--background)
	color: var(--font)

	&::placeholder
		color: var(--font)

.label
	color: var(--font)

.btn-create
	width: 30%
	background-color: var(--success)

.item
	width: 100%
	border: 1px solid var(--background)

	span

.controls
	width: 100%
	height: 30px
	border-top: 1px solid var(--background)
	display: grid
	grid-template-columns: repeat(4, 25%)

	.control

		.link
			width: 100%
			height: 100%

</style>