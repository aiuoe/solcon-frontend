<template lang="pug">
	section(class="nav")
		nav(class="center")
			ul(class="list-column-no-scroll")
				li(class="item center")
					router-link(to="inicio" class="link")
						i(class="fa fa-home center")
						span.start-center Inicio

				li(class="item center") 
					router-link(to="ventas" class="link")
						i(class="fa fa-store center")
						span.start-center Ventas

				li(class="item center") 
					router-link(to="compras" class="link")
						i(class="fa fa-shopping-cart center")
						span.start-center Compras

				li(class="item center-column") 
					router-link(to="banco" class="link not")
						i(class="fa fa-landmark center")
						span.start-center Banco
						i(class="fa fa-chevron-right center")
					ul.sub-menu(v-if="bank")
						li.sub-item
							i(class="fa fa-wallet center")
							a() Cuentas
						li.sub-item
							i(class="fa fa-file-invoice center")
							a() Trasacciones
				
				//- li(class="item center")
				//- 	router-link(to="empresa" class="link")
				//- 		i(class="fa fa-building center")
				//- 		span.start-center Empresa

				li(class="item center" v-if="admin") 
					router-link(to="clientes" class="link not")
						i(class="fa fa-users center")
						span.start-center Clientes
						i(class="fa fa-chevron-right center")

				li(class="item center" v-if="admin") 
					router-link(to="settings" class="link")
						i(class="fa fa-cog center")
						span.start-center Ajustes

				li(class="item center") 
					router-link(to="reportes" class="link")
						i(class="fa fa-chart-pie center")
						span.start-center Reportes

				li(class="item center") 
					router-link(to="perfil" class="link")
						i(class="fa fa-user center")
						span.start-center Perfil

				li(class="item center") 
					a(class="link" @click="setTheme")
						i(class="fa fa-adjust center")
						span.start-center Tema
				
				li(class="item center") 
					a(class="link" @click="logout")
						i(class="fa fa-sign-out-alt center")
						span.start-center Salir
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex'
import { HAS_COMPANY } from '@/graphql/queries/company'
import { decodeJWT } from '@/modules/Jwt'
import gql from 'graphql-tag';
import axios from 'axios';
import '@/modules/Array'

@Component({
	name: 'Nav',
	computed:
	{
		...mapState(['admin', 'company_id'])
	},
	methods:
	{
		...mapActions(['roleSet', 'companyIDSet'])
	}
})
export default class Nav extends Vue {

	@Prop() bank: any
	theme: any = null
	roleSet!: (value: boolean) => any
	companyIDSet!: (value: boolean) => any

	async created()
	{
		if (this.$store.state.admin == null)
			this.roleSet((decodeJWT('role') == 'admin')? true : false)

		if (this.$store.state.company_id == null)
			this.companyIDSet(decodeJWT('company_id'))

		this.theme = window.localStorage.getItem('theme')
		if (this.theme == null)
		{
			window.localStorage.setItem('theme', '1')
			this.theme = '1'
		}
		if (this.theme == '0')
		{
			document.documentElement.style.setProperty ('--background', '#2D2D2D')
			document.documentElement.style.setProperty ('--contrast', '#353535')
			document.documentElement.style.setProperty ('--shadow', 'none')
			document.documentElement.style.setProperty ('--shadow-primary', 'none')
			document.documentElement.style.setProperty ('--font', 'antiquewhite')
		}
	}

	setTheme()
	{
		if (this.theme == '1')
			this.theme = '0'
		else
			this.theme = '1'

		if (this.theme == '1')
		{
			document.documentElement.style.setProperty ('--background', '#f6f2ed')
			document.documentElement.style.setProperty ('--contrast', '#ffffff')
			document.documentElement.style.setProperty ('--shadow', '0 0 1px rgba(0,0,0,.2), 0 2px 4px rgba(0,0,0,.1)')
			document.documentElement.style.setProperty ('--shadow-primary', '5px 5px 10px .1px rgba(209, 91, 87, .5)')
			document.documentElement.style.setProperty ('--font', '#2D2D2D')
		}
		else
		{
			document.documentElement.style.setProperty ('--background', '#2D2D2D')
			document.documentElement.style.setProperty ('--contrast', '#353535')
			document.documentElement.style.setProperty ('--shadow', 'none')
			document.documentElement.style.setProperty ('--shadow-primary', 'none')
			document.documentElement.style.setProperty ('--font', 'antiquewhite')
		}

		window.localStorage.setItem('theme', this.theme)
	}

	async logout()
	{
		return await axios
		.post(`${process.env.VUE_APP_API_URL}/api/auth/logout`, {}, {"headers": {"Authorization": `Bearer ${window.localStorage.getItem('token')}`}})
		.then(res => 
		{
			window.localStorage.removeItem('token')
			this.$router.push({ path: 'login' })
		})
		.catch(err => console.log(err))
	}
}
</script>

<style lang="sass" scoped>
.nav
	position: fixed
	bottom: 0px
	left: 0px
	height: 50px
	width: 100vw
	display: flex
	align-items: center

	nav
		width: 100%
		height: 100%
		overflow: hidden

.list
	width: 100%
	height: 100%

.router-link-active 
	border-top: 3px solid var(--primary)

.not
	display: none

@media screen and (min-width: 1024px)
	.nav
		bottom: 0
		left: 0
		height: 100vh
		width: 170px

		nav
			width: 100%
			height: 80%

	.list-column-no-scroll
		width: 100%
		height: 100%

		.item
			width: 100%
			min-height: 50px
			margin-bottom: 0px
			box-sizing: border-box
			// border-bottom: 2px solid var(--background)

			.link
				width: calc(100% - 3px)
				height: 50px
				display: grid
				grid-template-columns: 25% 50% 25%
				justify-content: space-between
				align-items: center

				span 
					height: 100%

				.fa
					height: 100%
					font-size: 20px

			.sub-menu
				list-style: none
				width: 100%
				overflow: hidden
				background-color: var(--background)

				.sub-item
					display: grid
					grid-template-columns: 25% 75%
					grid-template-rows: auto
					padding: 7px 0px
					color: var(--font)

	.router-link-active 
		border-top: 0px
		border-right: 3px solid var(--primary)

		.fa-chevron-right
			transform: rotate(90deg)

	.not
		display: flex



</style>