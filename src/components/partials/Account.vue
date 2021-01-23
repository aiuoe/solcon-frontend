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
					select(v-model="type" class="select select-info m-b-7")
						option(v-for="(value, key) in types" class="option" v-bind:value="key") {{ value | capitalize}}

					span(class="label") Moneda
					select(v-model="currency" class="select select-info m-b-7")
						option(v-for="currency in currencies" class="option" v-bind:value="currency.id") {{ currency.name | capitalize}}

				input(v-model="name" class="input" type="text" placeholder="Nombre de la cuenta")
				input(v-model="description" class="input" type="text" placeholder="Descripcion de la cuenta")
				.form-group.evenly-center
					input(class="btn btn-info btn-circle" type="submit" value="Crear")
					a(class="btn btn-danger btn-circle center" @click="cancel") Cancelar

			//- form update
			//- form(class="form-column p-7" v-if="accountUpdate" @submit.prevent="update")
				
			//- 	span(class="label") Tipo de cuenta
			//- 	select(v-model="type_id" class="select select-info m-b-7")
			//- 		option(v-for="(value, key) in types" class="option" v-bind:value="key") {{ value | capitalize }}

			//- 	span(class="label") Cuenta padre
			//- 	select(v-model="parent_id" class="select select-info m-b-7")
			//- 		option(v-for="account in accounts" class="option" v-bind:value="account.id") {{ account.name | capitalize }}

			//- 	input(v-model="name" class="input" type="text" placeholder="Nombre de la cuenta")
			//- 	input(v-model="description" class="input" type="text" placeholder="Descripcion de la cuenta")
			//- 	.form-group.evenly-center
			//- 		input(class="btn btn-info btn-circle" type="submit" value="Actualizar")
			//- 		a(class="btn btn-danger btn-circle center" @click="cancel") Cancelar

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
import { ACCOUNTS, CURRENCIES } from '@/graphql/Queries'
import { capitalize, upperCase, extract } from '@/modules/Filter'
import { TYPE_ACCOUNT } from '@/types/type'
import '@/modules/Array'

@Component({
	name: 'Account',
	components: { Loader },
	filters: {capitalize: capitalize, upperCase: upperCase, extract: extract},
})
export default class Account extends Vue {
	accounts: any = {}
	currencies: any = {}
	account: any = {}
	cwrapper: boolean = false
	accountCreate: boolean = false
	accountUpdate: boolean = false
	types: TYPE_ACCOUNT = {income: "Ingreso", expense: "Gasto"}

	id: number = 0
	name: string = ''
	type: TYPE_ACCOUNT | null = null
	currency: any = {}
	description: string = ''
	parent_id: any = null

	async created()
	{
		await this.$apollo.query({query: ACCOUNTS, variables: {id: 1}})
			.then(res => { this.accounts = res.data.company.accounts.data })

		await this.$apollo.query({query: CURRENCIES})
			.then(res => { this.currencies = res.data.currencies.data })

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
		this.currency = ''
		this.cwrapper = true
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
			this.parent_id = this.accounts.search(id).parent_id
			this.name = this.accounts.search(id).name
			this.description = this.accounts.search(id).description
		}
	}

	async create()
	{
		console.log(this.type)
		await this.$apollo.mutate({mutation: ACCOUNT_CREATE, variables: {
			company_id: this.$store.state.company_id,
			currency_id: this.currency,
			parent_id: this.parent_id,
			name: this.name,
			description: this.description,
			type: this.type
		}})
		.then(res => {
			this.accounts.push(res.data.accountCreate)
			this.name = ''
			this.description = ''
			this.currency = ''
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