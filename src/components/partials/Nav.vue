<template lang="pug">
	section(class="nav")
		nav(class="center")
			ul(class="list-column-no-scroll")
				li(class="item p-7 center")
					router-link(to="dashboard" class="link")
						i(class="fa fa-home center")
						span.start-center Inicio
				//- li(class="center")
				//- 	router-link(to="business" class="link not") 
				//- 		i(class="fa fa-building center")
				//- li(class="center")
				//- 	router-link(to="products" class="link not") 
				//- 		i(class="fa fa-dolly center")
				//- li(class="center") 
				//- 	router-link(to="purchases" class="link not")
				//- 		i(class="fa fa-shopping-cart center")
				//- li(class="center")
				//- 	router-link(to="tickets" class="link not") 
				//- 		i(class="fa fa-ticket-alt center")
				li(class="item center-column") 
					router-link(to="bank" class="link not")
						i(class="fa fa-landmark center")
						span.start-center Banco
						i(class="fa fa-chevron-right center")
					ul.sub-menu(v-if="bank")
						li.sub-item
							i(class="fa fa-wallet center")
							a(@click="app") Cuentas
						li.sub-item
							i(class="fa fa-file-invoice center")
							a() Trasacciones

				li(class="item center" v-if="admin") 
					router-link(to="customers" class="link not")
						i(class="fa fa-users center")
						span.start-center Clientes
						i(class="fa fa-chevron-right center")

				li(class="item center" v-if="admin") 
					router-link(to="settings" class="link")
						i(class="fa fa-cog center")
						span.start-center Ajustes

				li(class="item center") 
					router-link(to="profile" class="link")
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
import gql from 'graphql-tag';
import axios from 'axios';

@Component({
	name: 'Nav',
})
export default class Nav extends Vue {

	@Prop() bank: any
	rol: number = 0
	id: any = null
	theme: any = ''
	admin: boolean = false
	// device: string = ""

	async created()
	{
		await this.$apollo.query({query: gql(`query { me { id } } `)})
		.then(res => { window.localStorage.setItem('id', res.data.me.id) })
		.catch(err => {
			window.localStorage.removeItem('token')
			this.$router.push({ path: 'signup' })
		})

		this.rol = JSON.parse(decodeURIComponent(atob(window.localStorage.getItem('token')!.split('.')[1]).split('').join(''))).rol
		// this.id = JSON.parse(decodeURIComponent(atob(window.localStorage.getItem('id')!.split('.')[1]).split('').join(''))).id
		this.id = window.localStorage.getItem('id')

		if (this.rol == 4 || this.id == 1)
			this.admin = true

		if (window.localStorage.getItem('theme') != null)
		{
			this.theme = window.localStorage.getItem('theme')
			if (this.theme == 'dark')
			{
				document.documentElement.style.setProperty ('--background', '#2D2D2D')
				document.documentElement.style.setProperty ('--contrast', '#353535')
				document.documentElement.style.setProperty ('--shadow', 'none')
				document.documentElement.style.setProperty ('--shadow-primary', 'none')
				document.documentElement.style.setProperty ('--font', 'antiquewhite')
			}
		}
		else
		{
			window.localStorage.setItem('theme', 'light')
			this.theme = 'light'
			document.documentElement.style.setProperty ('--background', '#f6f2ed')
			document.documentElement.style.setProperty ('--contrast', '#ffffff')
			document.documentElement.style.setProperty ('--font', '#2D2D2D')
			document.documentElement.style.setProperty ('--shadow', '5px 5px 10px 1px rgba(211, 211, 211, .7)')
			document.documentElement.style.setProperty ('--shadow-primary', '5px 5px 10px .1px rgba(209, 91, 87, .5)')
		}
		// this.storage_device()
		// this.device = window.localStorage.getItem('device')!
		// console.log(this.$apollo)
	}

	app()
	{
		alert('wh')
	}

	setTheme()
	{

		if (this.theme == 'light')
		{
			document.documentElement.style.setProperty ('--background', '#2D2D2D')
			document.documentElement.style.setProperty ('--contrast', '#353535')
			document.documentElement.style.setProperty ('--shadow', 'none')
			document.documentElement.style.setProperty ('--shadow-primary', 'none')
			document.documentElement.style.setProperty ('--font', 'antiquewhite')
			window.localStorage.setItem('theme', 'dark')
			this.theme = 'dark'
		}
		else if (this.theme == 'dark')
		{
			window.localStorage.setItem('theme', 'light')
			this.theme = 'light'
			document.documentElement.style.setProperty ('--background', '#f6f2ed')
			document.documentElement.style.setProperty ('--contrast', '#ffffff')
			document.documentElement.style.setProperty ('--shadow', '5px 5px 10px 1px rgba(211, 211, 211, .7)')
			document.documentElement.style.setProperty ('--shadow-primary', '5px 5px 10px .1px rgba(209, 91, 87, .5)')
			document.documentElement.style.setProperty ('--font', '#2D2D2D')
		}
	}

	async logout()
	{
		return await axios
		.post(`${process.env.VUE_APP_API_URL}/api/auth/logout`, {}, {"headers": {"Authorization": `Bearer ${window.localStorage.getItem('token')}`}})
			.then(res => 
			{
				window.localStorage.removeItem('token')
				window.localStorage.removeItem('id')
				this.id = null
				if (window.localStorage.getItem('token') == null) 
					this.$router.push({ path: 'login' })
			})
			.catch(err => console.log(err))
	}

	// storage_device()
	// {
	// 	window.addEventListener('resize', () => {
	// 		if ( navigator.userAgent.match(/Android/i) 
	// 			|| navigator.userAgent.match(/webOS/i) 
	// 			|| navigator.userAgent.match(/iPhone/i) 
	// 			|| navigator.userAgent.match(/iPad/i) 
	// 			|| navigator.userAgent.match(/iPod/i) 
	// 			|| navigator.userAgent.match(/BlackBerry/i) 
	// 			|| navigator.userAgent.match(/Windows Phone/i) )
	// 			window.localStorage.setItem('device', 'mobile')
	// 		else
	// 			window.localStorage.setItem('device', 'web')
	// 	})

	// 	if ( navigator.userAgent.match(/Android/i) 
	// 		|| navigator.userAgent.match(/webOS/i) 
	// 		|| navigator.userAgent.match(/iPhone/i) 
	// 		|| navigator.userAgent.match(/iPad/i) 
	// 		|| navigator.userAgent.match(/iPod/i) 
	// 		|| navigator.userAgent.match(/BlackBerry/i) 
	// 		|| navigator.userAgent.match(/Windows Phone/i) )
	// 		window.localStorage.setItem('device', 'mobile')
	// 	else
	// 		window.localStorage.setItem('device', 'web')
	// }
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
	align-items: flex-end

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
			height: 70%

	.list-column-no-scroll
		width: 100%
		height: 100%

		.item
			width: 100%
			min-height: 50px
			margin-bottom: 0px
			box-sizing: border-box
			border-bottom: 1px solid var(--background)

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