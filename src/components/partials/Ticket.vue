<template lang="pug">
	.tickets.center-start-column
		.btn-group
			a(class="ticket-filter p-7 evenly-center" @click="ticketToggle('filter')")
				i(class="fa fa-filter")
				span Filtrar / Ordenar
			a(class="btn btn-info center" @click="ticketToggle('store')") Nuevo

		//- filter
		div.filter(v-if="filter")
			a(@click="orderBy('pinned')") Anclado
		input(class="input input-search" v-if="list" type="text" placeholder="Buscar")

		//- form
		form(@submit.prevent="upsert" class="form-column p-7" v-if="form")
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
			input(class="btn btn-create" type="submit" value="Enviar")

		//- list
		ul.list-column.p-7(ref="listFilter" v-if="list")
			li.item.p-7(v-for="ticket in tickets")
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
						a(class="link evenly-center")
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
	title: string = ''
	message: string = ''
	public: boolean = false
	pinned: boolean = false
	priority: boolean = false
	status: boolean = false
	method: any = null
	params: any = {}
	order: boolean = false
	tickets: any = {}
	customer: any = this.$store.state.customer

	@Prop() cid: any

	@Watch('cid', {immediate: true}) 
	onCustomerChanged()
	{
		this.$apollo.query({query: USER_TICKETS, variables: { id: this.cid, page: 1 }})
		.then(res => {
			this.tickets = res.data.user.tickets.data
		})
		.catch(err => console.log(err))
		console.log(this)
	}

	async created()
	{

	}

	orderBy(key: any)
	{
		switch(key)
		{
			case 'pinned': 
				this.pinned = !this.pinned
				this.params[key] = (this.pinned)? {order: 'desc'} : {order: 'asc'}
				break
			case 'status':
				this.status = !this.status
				this.params[key] = (this.status)? {order: 'desc'} : {order: 'asc'}
				break
		}
		this.tickets.orderBy(this.params)
		this.tickets.map((t: any) => {
			console.log(t.pinned)
		})
	}

	ticketToggle(key: string)
	{
		if (key == 'store')
		{
			if (this.filter) this.filter = false
			this.method = 'store'
			this.list = !this.list
			this.form = !this.form
		}
		else if (key == 'update')
		{
			if (this.filter) this.filter = false
			this.method = 'update'
			this.list = !this.list
			this.form = !this.form
		}
		else if (key == 'filter')
		{
			if (this.form)
			{
				this.form = !this.form
				this.list = !this.list
			}
			this.filter = !this.filter
		}
	}

	clear()
	{
		this.title = ''
		this.message = ''
		this.public = false,
		this.pinned = false,
		this.priority = false,
		this.status = false 
	}

	async upsert()
	{
		if (this.method == 'store')
		{
			return await this.$apollo.mutate({
				mutation: TICKET_UPSERT, 
				variables: {
					users: [this.$store.state.me.id, this.cid],
					title: this.title,
					message: this.message,
					pinned: this.pinned,
					public: this.public,
					priority: this.priority,
					status: this.status,
					due_date: "2020-12-16"
				}})
				.then(res => {
					this.tickets.push(res.data.ticketUpsert)
					this.form = !this.form
					this.list = !this.list
					this.clear()
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