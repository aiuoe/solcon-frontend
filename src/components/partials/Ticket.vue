<template lang="pug">
	.tickets.start-center-column
		.btn-group
			a(class="btn btn-new" @click="toggleForm") Nuevo

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


</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	name: 'Ticket',
})
export default class Ticket extends Vue {
	form: boolean = false
	title: string = ''
	message: string = ''
	channel: string = 'web'
	public: boolean = false
	pinned: boolean = false
	priority: boolean = false
	status: boolean = false

	async handleForm()
	{


	}

}
</script>

<style lang="sass" scoped>

.tickets
	width: 100%
	height: 100%

.btn-group
	width: 100%
	margin-bottom: 7px
	display: flex
	justify-content: flex-end
	align-items: center

	.btn-new
		align-self: flex-end
		background-color: var(--info)

.form-column
	border: 3px solid var(--background)

.form-group
	width: 90%

.input
	width: 90%
	color: var(--dark)

	&::placeholder
		color: var(--dark)

.textarea
	width: 90%
	color: var(--dark)

	&::placeholder
		color: var(--dark)

.label
	color: var(--font)

.btn-create
	width: 30%
	background-color: var(--success)

</style>