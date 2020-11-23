<template lang="pug">
	.container
		Header
		Nav
		main.main.evenly-center
			.content.box.p-7
				h2.title Cuentas
				ul(class="list-column p-7")
					li(class="item" v-for="account in accounts")
						span(class="data start-center") {{ account.name }}
						.actions
							.action
								a(class="btn btn-info center" @click="addAccount(account.id)")
									i(class="fa fa-plus")
							.action
								a(class="btn btn-warning center")
									i(class="fa fa-edit")
							.action
								a(class="btn btn-danger center" @click="deleteAccount(account.id)")
									i(class="fa fa-trash")

			div.asd.box.p-7
				form(class="form-column p-7" v-if="create" @submit.prevent="createAccount" )
					h1.form-title.m-b-7 Crear
					.form-group-start-center-column.m-b-7
						span(class="label") Tipo
						select(v-model="type_id" class="select select-info" required)
							option(v-for="type in types" class="option" :label="type.name | capitalize" :value="type.id")
					input(v-model="name" class="input input-flat" type="text" placeholder="Nombre de la cuenta:")
					input(v-model="description" class="input input-flat" type="text" placeholder="Descripcion de la cuenta:")
					input(class="btn btn-info" type="submit" value="Crear")

				form(class="form-column box p-7" v-if="update")
					h1.form-title Actualizar Cuentas
					span(class="label") Tipo de cuenta
					select(class="select select-info")
						option(v-for="type in types" class="option" :label="type.name | capitalize" :value="type.id")
					span(class="label") Cuenta padre
					select(class="select select-info")
						option(v-for="account in accounts" class="option" :label="account.name | capitalize" :value="account.id")
					input(class="input input-flat" type="text" placeholder="Nombre de la cuenta:")
					input(class="input input-flat" type="text" placeholder="Descripcion de la cuenta:")
					input(class="btn btn-info" type="submit" value="Actualizar")




</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import Header from '@/components/partials/Header.vue';
import { GET_ALL_CUSTOMERS } from '@/graphql/Queries';
import Loader from '@/components/partials/Loader.vue';
import gql from 'graphql-tag';
import { CREATE_ACCOUNT, DELETE_ACCOUNT } from '@/graphql/Mutations'
import { TYPES, ACCOUNTS } from '@/graphql/Queries'
import '@/modules/Array'
// import Calendar from '@/components/partials/Calendar.vue';
// import ChartBar from '@/components/partials/ChartBar'

@Component({
	name: 'Bank',
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
export default class Bank extends Vue {
	accounts: any = []
	types: any = {}
	create: boolean = false
	update: boolean = false

	name: string = ''
	description: string = ''
	type_id: number = 0
	parent_id: number = 0

	async created()
	{
		this.$apollo.query({query: TYPES})
			.then(res => {this.types = res.data.types.data})
		return await this.$apollo.query({query: ACCOUNTS})
			.then(res => {
				this.accounts = res.data.me.accounts
				if (!this.accounts.length)
					this.create = true

			})
	}

	addAccount(parent_id: number)
	{
		this.parent_id = parent_id
		this.create = true
	}

	async createAccount()
	{
		return await this.$apollo.mutate({mutation: CREATE_ACCOUNT, variables: {
			name: this.name,
			description: this.description,
			type_id: this.type_id,
			parent_id: this.parent_id
		}})
		.then(res => { 
			this.accounts.push(res.data.createAccount)
			this.name = '' 
			this.description = '' 
			this.type_id = 0 
			this.parent_id = 0
			this.create = false
		})
		.catch(err => { console.log(err) })
	}

	async deleteAccount(id: number)
	{

		return await this.$apollo
		.mutate({mutation: DELETE_ACCOUNT, variables: { id: id }})
		.then(res => { 
			this.accounts.delete(id)
			if (!this.accounts.length)
				this.create = true
		})
		.catch(err => { console.log(err) })
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.asd
	width: 30%
	height: 100%

.form
	width: 100%
	height: 50%

	&-title
		font-size: 20px
		align-self: flex-start
		color: var(--font)

.select 
	width: 100%

.input
	width: 100%
	border: 1px solid var(--background)
	background-color: var(--contrast)


.btn
	font-size: 17px
	font-weight: bold

.content
	width: 65%
	height: 100%

	.title
		color: white

.item
	display: grid
	grid-template-columns: 85% 15%
	padding: 0px 0px 0px 7px
	box-sizing: border-box

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