<template lang="pug">
.w100per-h100per-column
	.tickets.center-start-column(v-if="!commentToggle")
		.btn-group
			a(class="ticket-filter p-7 start-center" @click="toggle(3)")
				i(class="fa fa-filter mr-7")
				span Filtrar
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
					label(for="public" class="label fontS")
						i(class="fa fa-user-lock")
				.switch.p-7
					label.shape
						input(class="checkbox" type="checkbox" id="pinned" v-model="ticket.pinned")
						span(class="slider")
					label(for="pinned" class="label fontS")
						i(class="fa fa-star")
			.form-group
				.switch.p-7
					label.shape
						input(class="checkbox" type="checkbox" id="priority" v-model="ticket.priority")
						span(class="slider")
					label(for="priority" class="label fontS")
						i(class="fa fa-bell")
				.switch.p-7
					label.shape
						input(class="checkbox" type="checkbox" id="status" v-model="ticket.status")
						span(class="slider")
					label(for="status" class="label fontS")
						i(class="fa fa-lock")
			.form-group
				.switch.p-7
					label.shape
						input(class="checkbox" type="checkbox" id="status" v-model="notify")
						span(class="slider")
					label(for="status" class="label fontS")
						i(class="fa fa-envelope")
			input(class="btn btn-create" type="submit" value="Enviar")

		ul.list-column.p-7(ref="listFilter" v-if="!form")
			li.item.p-7(v-for="item in tickets")
				.options.end-center
					a(@click="pinned(item.id, $event)" title="Anclar")
						i(:class="['mr-7', 'fa', 'fa-star', {'pinned': item.pinned}]")
					a(@click="priority(item.id, $event)" title="Normal / Urgente")
						i(:class="['mr-7', 'fa', 'fa-bell', {'priority': item.priority}]")
					a(@click="public(item.id, $event)" title="Publico / Privado")
						i(:class="['mr-7', 'fa', 'fa-user-lock', {'public': item.public}]")
					a(@click="status(item.id, $event)" title="Abierto / Cerrado")
						i(:class="['mr-7', 'fa', 'fa-lock', {'status': item.status}]")

				.start-center-column.p-7
					span {{ item.title }}
					span {{ item.message }}
					.date
						i(class="fa fa-calendar-alt mr-7")
						span {{ item.created_at }}
				.controls
					.control
						a(class="link evenly-center")
							i(class="fa fa-thumbs-up")
							span {{ '100' }}
					.control
						a(class="link evenly-center" @click="comment(item.id)")
							i(class="fa fa-comment")
							span {{ item.Ncomments }}
					.control
						a(class="link evenly-center" @click="toggle(2, item.id)" title="Editar")
							i(class="fa fa-edit")
					.control
						a(class="link evenly-center" @click="deleteTicket(item.id)" title="Borrar")
							i(class="fa fa-trash")

	.comments(v-if="commentToggle")
		Comment(v-bind:ticketId="ticketId" v-bind:commentToggle.sync="commentToggle")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TICKET_UPSERT, TICKET_DELETE } from '@/graphql/mutations/ticket'
import { USER_TICKETS } from '@/graphql/queries/user'
import { MAIL_RAW } from '@/graphql/mail'
import Comment from '@/components/partials/Comment.vue';
import { $ } from '@/modules/Selector'
import '@/modules/Array'

@Component({
	name: 'Ticket',
	components: { Comment }
})
export default class Ticket extends Vue {
	form: boolean = false
	filter: boolean = false
	list: boolean = true
	store: boolean = false
	params: any = {}
	order: boolean = false
	ticketId: number = 0
	notify: boolean = false
	commentToggle: boolean = false
	ticket = {
		id: 0,
		title: '',
		message: '',
		pinned: false,
		priority: false,
		public: false,
		status: false,
		channel: 'web'
	}
	tickets: any = {}

	@Prop() customer: any

	@Watch('customer', {immediate: true}) 
	onCustomerChanged()
	{
		this.commentToggle = false
		this.$apollo.query({query: USER_TICKETS, variables: { id: this.customer.id, page: 1 }})
		.then(res => {
			this.tickets = res.data.user.tickets.data
		})
		.catch(err => console.log(err))
	}

	comment(id: number)
	{
		this.commentToggle = true
		this.ticketId = this.tickets.search(id).id
	}

	priority(id: number, $event: any)
	{
		this.store = false
		this.ticket = this.tickets.search(id)
		this.ticket.priority = !this.ticket.priority
		this.upsert()
		$event.target.classList.toggle('priority')
	}

	pinned(id: number, $event: any)
	{
		this.store = false
		this.ticket = this.tickets.search(id)
		this.ticket.pinned = !this.ticket.pinned
		this.upsert()
		$event.target.classList.toggle('pinned')
	}

	status(id: number, $event: any)
	{
		this.store = false
		this.ticket = this.tickets.search(id)
		this.ticket.status = !this.ticket.status
		this.upsert()
		$event.target.classList.toggle('status')
	}

	public(id: number, $event: any)
	{
		this.store = false
		this.ticket = this.tickets.search(id)
		this.ticket.public = !this.ticket.public
		this.upsert()
		$event.target.classList.toggle('public')
	}

	clear()
	{
		this.ticket.title = ''
		this.ticket.message = ''
		this.ticket.pinned = false
		this.ticket.priority = false
		this.ticket.status = false
		this.ticket.public = false
	}

	toggle(key: number, id: number | null = null)
	{
		if (key == 1)
		{
			if (this.form)
			{
				this.store = false
				this.list = true
				this.form = false
			}
			else
			{
				this.store = true
				this.list = false
				this.form = true
				this.filter = false
			}
		}
		else if (key == 2)
		{
			this.store = false
			this.list = false
			this.form = true
			this.ticket = this.tickets.search(id)
			this.filter = false
		}
		else if (key == 3)
		{
			if (this.filter)
			{
				this.filter = false
			}
			else
			{
				this.form = false
				this.list = true
				this.filter = true
			}
		}
	}

	async upsert()
	{
		if (this.notify)
		{
			this.$apollo
			.mutate({mutation: MAIL_RAW, variables: {
				to: this.customer.email,
				subject: this.ticket.title,
				message: this.ticket.message
			}})
			.then(res => console.log(res))
			.catch(err => console.log(err))
		}

		if (this.store)
		{
			return await this.$apollo.mutate({
				mutation: TICKET_UPSERT, 
				variables: {
					users: [this.$store.state.me.id, this.customer.id],
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
					this.clear()
				})
				.catch(err => console.log(err))
		}
		else
		{
			return await this.$apollo.mutate({
				mutation: TICKET_UPSERT, 
				variables: {
					id: this.ticket.id,
					users: [this.$store.state.me.id, this.customer.id],
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
					this.store = false
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
	height: 99%
	overflow: hidden

	.list-column
		width: 100%
		height: 99%

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
		font-weight: bold

.input-search
	width: 100%
	border-radius: 25px
	height: 35px
	font-size: 15px
	margin-bottom: 10px

.filter
	width: 100%
	height: calc(30% - 7px)
	border: 1px solid var(--background)
	margin-bottom: 7px

.form-column
	height: 350px

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
	height: 150px
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
	padding-bottom: 0px
	margin-bottom: 7px

.options
	.fa
		font-size: 20px

.pinned
	color: var(--warning)

.priority
	color: var(--success)

.status
	color: var(--danger)

.public
	color: var(--info)	

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

.comments
	width: 100%
	min-height: 100%
</style>