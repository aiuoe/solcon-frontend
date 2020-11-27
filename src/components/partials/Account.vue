<template lang="pug">
	.component-container.center-column
		.head.between-center.p-7
			a(class="link")
				i(class="fa fa-filter fa-color-info")
				span.p-7 Filtrar
			.search.between-center
				input(class="input input-search" type="text" placeholder="Buscar ")
				i(class="fa fa-search")
			a(class="btn btn-info" @click="toggleCreate(null)") Nueva Cuenta
			
		.cwrapper(v-if="cwrapper")

			//- form create
			form(class="form-column p-7" v-if="accountCreate" @submit.prevent="create")
				.form-group-start-center-column.m-b-7
					span(class="label") Tipo
					select(v-model="type_id" class="select select-info" required)
						option(v-for="type in types" class="option" :value="type.id") {{ type.name | capitalize }}
				
				input(v-model="name" class="input" type="text" placeholder="Nombre de la cuenta")
				input(v-model="description" class="input" type="text" placeholder="Descripcion de la cuenta")
				.form-group.evenly-center
					input(class="btn btn-info btn-circle" type="submit" value="Crear")
					a(class="btn btn-danger btn-circle center" @click="cancel") Cancelar

			//- form update
			form(class="form-column p-7" v-if="accountUpdate" @submit.prevent="update")
				
				span(class="label") Tipo de cuenta
				select(v-model="type_id" class="select select-info m-b-7")
					option(v-for="type in types" class="option" v-bind:value="type.id") {{ type.name | capitalize }}

				span(class="label") Cuenta padre
				select(v-model="parent_id" class="select select-info m-b-7")
					option(v-for="account in accounts" class="option" v-bind:value="account.id") {{ account.name | capitalize }}

				input(v-model="name" class="input" type="text" placeholder="Nombre de la cuenta")
				input(v-model="description" class="input" type="text" placeholder="Descripcion de la cuenta")
				.form-group.evenly-center
					input(class="btn btn-info btn-circle" type="submit" value="Actualizar")
					a(class="btn btn-danger btn-circle center" @click="cancel") Cancelar

		.data
			ul(id="listAccount" class="list-column p-7")
				li(class="item" v-for="account in accounts")
					span(class="start-center p-7") {{ account.name }}
					.actions
						.action
							a(class="btn btn-info center" @click="toggleCreate(account.id)")
								i(class="fa fa-plus")
						.action
							a(class="btn btn-warning center" @click="toggleUpdate(account.id)")
								i(class="fa fa-edit")
						.action
							a(class="btn btn-danger center" @click="destroy(account.id)")
								i(class="fa fa-trash")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loader from '@/components/partials/Loader.vue';
import { ACCOUNT_CREATE, ACCOUNT_UPDATE, ACCOUNT_DELETE } from '@/graphql/Mutations'
import { TYPES, ACCOUNTS } from '@/graphql/Queries'
import { capitalize, upperCase } from '@/modules/Filter'
import '@/modules/Array'

@Component({
	name: 'Account',
	components: { Loader},
	filters: {capitalize: capitalize, upperCase: upperCase}
})
export default class Account extends Vue {
	accounts: any = {}
	account: any = {}
	types: any = {}
	cwrapper: boolean = false
	accountCreate: boolean = false
	accountUpdate: boolean = false

	id: number = 0
	name: string = ''
	description: string = ''
	type_id: any = null
	parent_id: any = null

	async created()
	{
		await this.$apollo.query({query: TYPES})
			.then(res => {this.types = res.data.types.data})

		await this.$apollo.query({query: ACCOUNTS})
			.then(res => {this.accounts = res.data.me.accounts})

		if (!this.accounts.length)
		{
			this.cwrapper = !this.cwrapper
			this.accountCreate = !this.accountCreate
		}
	}

	cancel()
	{
		this.cwrapper = false
		document.querySelector<HTMLElement>('.data')!.style.height = '90%'
	}

	toggleCreate(id: any = null)
	{
		this.name = ''
		this.description = ''
		this.cwrapper = true
		this.type_id = null
		this.parent_id = id
		document.querySelector<HTMLElement>('.data')!.style.height = '50%'
		this.accountCreate = true
		this.accountUpdate = false
	}

	toggleUpdate(id: any = null)
	{
		this.cwrapper = true
		document.querySelector<HTMLElement>('.data')!.style.height = '50%'
		this.accountUpdate = true
		this.accountCreate = false

		if (id)
		{
			this.id = id
			this.type_id = this.accounts.search(id).type_id.id
			this.parent_id = this.accounts.search(id).parent_id
			this.name = this.accounts.search(id).name
			this.description = this.accounts.search(id).description
		}
	}

	async create()
	{
		await this.$apollo.mutate({mutation: ACCOUNT_CREATE, variables: {
			name: this.name,
			description: this.description,
			type_id: this.type_id,
			parent_id: this.parent_id
		}})
		.then(res => {
			this.accounts.push(res.data.accountCreate)
			this.name = ''
			this.description = ''
			this.type_id = null
			this.parent_id = null
			this.cwrapper = !this.cwrapper
			this.accountCreate = !this.accountCreate
			document.querySelector<HTMLElement>('.data')!.style.height = '90%'
		})
		.catch(err => {console.log(err)})
	}

	async update()
	{
		await this.$apollo.mutate({mutation: ACCOUNT_UPDATE, variables: {
			id: this.id,
			name: this.name,
			description: this.description,
			type_id: this.type_id,
			parent_id: this.parent_id
		}})
		.then(res => {
			this.accounts.update(this.id, res.data.accountUpdate)
			this.cwrapper = !this.cwrapper
			this.accountUpdate = !this.accountUpdate
			document.querySelector<HTMLElement>('.data')!.style.height = '90%'
		})
	}

	async destroy(id: number)
	{
		await this.$apollo
		.mutate({mutation: ACCOUNT_DELETE, variables: { id: id }})
		.then(res => {this.accounts.delete(id)})
		.catch(err => {console.log(err)})
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.component-container
	width: 100%
	height: 100%

.graphs
	width: 30%
	height: 100%

	.graph
		width: 100%
		height: 49.5%

.content
	width: 65%
	height: 100%

	.head
		width: 100%
		height: 10%
		overflow: hidden

		.search
			position: relative
			width: 50%
			height: 30px

			.fa
				width: 50px
				height: 100%
				background-color: var(--contrast)
				border: 1px solid var(--background)
				border-left: 0px
				top: 0px
				right: 0px
				display: flex
				justify-content: center
				align-items: center
				border-top-right-radius: 10px
				border-bottom-right-radius: 10px
				cursor: pointer

	.cwrapper
		width: 70%
		height: 40%

		.form-column
			width: 100%
			height: 100%

			&-title
				font-size: 20px
				align-self: flex-start
				color: var(--font)

			.input
				text-indent: 14px

			.btn
				width: 45%
				font-size: 17px
				font-weight: bold

			.select 
				width: 100%

	.data
		width: 100%
		height: 90%


.item
	width: 100%
	display: grid
	grid-template-columns: 80% 20%
	box-sizing: border-box
	border: 1px solid var(--background)

	span
		width: 100%
		height: 100%

	.actions
		width: 100%
		height: 100%
		display: flex
		justify-content: space-between

		.action
			width: 100%
			height: 100%
			display: flex

			a
				width: 100%
				height: 100%

				.fa
					color: white

</style>