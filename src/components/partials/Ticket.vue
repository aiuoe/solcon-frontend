<template lang="pug">
	.tickets.center-start-column
		.btn-group
			a(class="btn btn-filter" @click="toggleForm('filter')")
				i(class="fa fa-filter")
				span Filtrar
			a(class="btn btn-new" @click="toggleForm('store')") Nuevo

		//- filter
		div.filter(v-if="filter")
			//- a(v-model="")



		//- form
		form(@submit.prevent="handleForm" class="form-column p-7" v-if="form")
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
		ul.list-column.p-7(v-if="list")
			li.item.p-7(v-for="ticket in tickets")
				.start-center-column.p-7
					span {{ ticket.title }}
					span {{ ticket.message }}
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TICKET_CREATE, DELETE_TICKET } from '@/graphql/Mutations'
import $ from '@/modules/jQuery'
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
	channel: string = 'web'
	public: boolean = false
	pinned: boolean = false
	priority: boolean = false
	status: boolean = false
	method: any = null

	@Prop({required: true}) tickets: any
	@Prop() cid: any

	async created()
	{
		console.log($)
	}

	mutate(name: string, value: any)
	{
		name = value
	}

	toggleForm(key: string)
	{
		if (key == 'store')
		{
			if (this.form)
				this.list = true
			else
				this.list = false
			this.filter = false
			this.method = 'store'
			this.form = !this.form
		}
		else if (key == 'update')
		{
			if (this.form)
				this.list = true
			else
				this.list = false

			this.method = 'update'
			this.filter = false
			this.form = !this.form
		}
		else if (key == 'filter')
		{
			if (this.filter)
				this.list = true
			else
				this.list = false
			this.form = false
			this.filter = !this.filter

		}
	}

	clear()
	{
		this.title = ''
		this.message = ''
		this.channel = 'web'
		this.public = false,
		this.pinned = false,
		this.priority = false,
		this.status = false 
	}

	async handleForm()
	{
		if (this.cid === undefined)
			this.mutate(this.cid, null)

		if (this.method == 'store')
			return await this.$apollo.mutate({
				mutation: TICKET_CREATE, 
				variables: {
					connect: this.cid,
					title: this.title,
					message: this.message,
					pinned: this.pinned,
					public: this.public,
					priority: this.priority,
					status: this.status,
					channel: this.channel
				}}).then(res => {
						this.tickets.push(res.data.createTicket)
						this.form = !this.form
						this.list = !this.list
						this.clear()
				})
		// else if (this.method == 'update')
			// return await this.$apollo.mutate({mutation: })
	}

	async deleteTicket(id: number)
	{
		return await this.$apollo.mutate({mutation: DELETE_TICKET, variables: {id: id}})
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
	margin-bottom: 7px
	display: flex
	justify-content: space-between
	align-items: center

	.btn-filter
		span
			margin-left: 7px

	.btn-new
		align-self: flex-end
		background-color: var(--info)

.filter
	width: 100%
	height: 100%
	background-color: red

.form-column
	border: 3px solid var(--background)

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