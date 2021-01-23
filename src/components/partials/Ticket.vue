<template lang="pug">
.w100per-h100per-column
	.tickets.center-start-column(v-if="!commentToggle")
		.ticket-menu.evenly-center
			a(class="ticket-filter")
				i(class="fa fa-sort-amount-up-alt fa-h")
			input(class="ticket-search" v-if="!form" type="text" placeholder="Buscar")
			a(class="ticket-new")
				i(class="fa fa-plus fa-h")
			a(class="ticket-new")
				i(class="fa fa-ellipsis-h fa-h")

		//- filter
		div.filter(v-if="filter")
			a(@click="orderBy('pinned')") Anclado


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
			li.item(class="ticket" v-for="item in tickets" :id="'ticket-' + item.id")
				div.ticket-head.between-center.p-7
					span.ticket-date {{ item.created_at | date }}
					a
						i(class="far fa-heart")
					a
						i(class="far fa-star")
				.center-column.p-7
					span.ticket-title {{ item.title | extract(30) }}
					span.ticket-message.p-7 {{ item.message | extract(100) }}
				//- .controls
				//- 	.control
				//- 		a(class="link evenly-center")
				//- 			i(class="fa fa-thumbs-up")
				//- 			span {{ '100' }}
				//- 	.control
				//- 		a(class="link evenly-center" @click="comment(item.id)")
				//- 			i(class="fa fa-comment")
				//- 			span {{ item.Ncomments }}
				//- 	.control
				//- 		a(class="link evenly-center" @click="toggle(2, item.id)" title="Editar")
				//- 			i(class="fa fa-edit")
				//- 	.control
				//- 		a(class="link evenly-center" @click="deleteTicket(item.id)" title="Borrar")
				//- 			i(class="fa fa-trash")

	.comments(v-if="commentToggle")
		Comment(v-bind:ticketId="ticketId" v-bind:commentToggle.sync="commentToggle")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TICKET_UPSERT, TICKET_DELETE } from '@/graphql/mutations/ticket'
import { USER_TICKETS } from '@/graphql/queries/user'
import { MAIL_RAW } from '@/graphql/mail'
import Comment from '@/components/partials/Comment.vue';
import { capitalize, upperCase, extract, date } from '@/modules/Filter'
import { $ } from '@/modules/Selector'
import '@/modules/Array'

@Component({
	name: 'Ticket',
	components: { Comment },
	filters: {capitalize: capitalize, upperCase: upperCase, extract: extract, date: date },
})
export default class Ticket extends Vue {
	form: boolean = false
	filter: boolean = false
	list: boolean = true
	params: any = {}
	order: boolean = false
	ticketId: number = 0
	notify: boolean = false
	commentToggle: boolean = false
	orderQuery: any = {
		created_at: 'desc', 
		pinned: 'asc', 
		status: 'asc'
	}
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
			this.tickets = res.data.user.tickets
			this.tickets.orderBy(this.orderQuery)
		})
		.catch(err => console.log(err))
	}

	comment(id: number)
	{
		this.commentToggle = true
		this.ticketId = this.tickets.get(id).id
	}

	priority(id: number, $event: any)
	{
		this.ticket = this.tickets.get(id)
		this.ticket.priority = !this.ticket.priority
		this.upsert()
		$event.target.classList.toggle('priority')
	}

	pinned(id: number, $event: any)
	{
		$(`#ticket-${id}`).classList.toggle('pinned')
		this.ticket = this.tickets.get(id)
		this.ticket.pinned = !this.ticket.pinned
		this.upsert()
	}

	status(id: number, $event: any)
	{
		this.ticket = this.tickets.get(id)
		this.ticket.status = !this.ticket.status
		this.upsert()
		$event.target.classList.toggle('status')
	}

	public(id: number, $event: any)
	{
		this.ticket = this.tickets.get(id)
		this.ticket.public = !this.ticket.public
		this.upsert()
		$event.target.classList.toggle('public')
	}

	clear()
	{
		this.ticket.id = 0
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
				this.list = true
				this.form = false
			}
			else
			{
				this.list = false
				this.form = true
				this.filter = false
			}
		}
		else if (key == 2)
		{
			this.list = false
			this.form = true
			this.ticket = this.tickets.get(id)
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
				console.log(res.data.ticketUpsert)
				this.tickets.upsert(res.data.ticketUpsert)
				this.tickets.orderBy(this.orderQuery)
				this.form = false
				this.list = true
				this.clear()
			})
			.catch(err => console.log(err))
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


	.btn-info
		width: 25%
		color: white
		font-weight: bold



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


.comments
	width: 100%
	min-height: 100%

.ticket
	width: 100%
	background-color: var(--contrast)
	border: 2px solid var(--background)

	&-head
		width: 100%
		height: 30px

	&-date
		color: slategray

	&-filter
		height: 100%

	&-menu
		width: 100%
		height: 40px

	&-search
		height: 70%
		border: 2px solid var(--background)
		outline: none
		text-indent: 14px
		border-radius: 20px

		&:focus
			border: 2px solid var(--font)

	&-title
		padding: 7px
		box-sizing: border-box
		border-bottom: 1px solid var(--background)
</style>