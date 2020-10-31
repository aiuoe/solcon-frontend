<template lang="pug">
	section(class="nav")
		nav(class="center")
			ul(class="list center")
				li(class="center")
					router-link(to="dashboard" class="link") 
						i(class="fa fa-home center")
				li(class="center")
					router-link(to="business" class="link not") 
						i(class="fa fa-building center")
				li(class="center")
					router-link(to="products" class="link not") 
						i(class="fa fa-dolly center")
				li(class="center") 
					router-link(to="purchases" class="link not")
						i(class="fa fa-shopping-cart center")
				li(class="center")
					router-link(to="tickets" class="link not") 
						i(class="fa fa-ticket-alt center")
				li(class="center" v-show="rol === 4") 
					router-link(to="customers" class="link not")
						i(class="fa fa-users center")
				li(class="center") 
					a(class="link" @click="setTheme")
						i(class="fa fa-adjust center")
				li(class="center") 
					a(class="link" @click="logout")
						i(class="fa fa-sign-out-alt center")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({
	name: 'Nav',
})
export default class Nav extends Vue {

	rol: string = ""
	light: string = `${process.env.BASE_URL}css/light.css`
	dark: string = `${process.env.BASE_URL}css/dark.css`
	ele: any = document.querySelector('#theme')
	theme: any = ''
	// device: string = ""

	async created()
	{
		this.rol = JSON.parse(decodeURIComponent(atob(window.localStorage.getItem('token')!.split('.')[1]).split('').join(''))).rol
		if (window.localStorage.getItem('theme') != null)
		{
			this.theme = window.localStorage.getItem('theme')
			if (this.theme == 'light')
				this.ele.href = this.light
			else if (this.theme == 'dark')
				this.ele.href = this.dark
		}
		else
		{
			window.localStorage.setItem('theme', 'light')
			this.theme = 'light'
		}
		// this.storage_device()
		// this.device = window.localStorage.getItem('device')!
	}

	setTheme()
	{
		if (this.theme == 'light')
		{
			window.localStorage.setItem('theme', 'dark')
			this.theme = 'dark'
			this.ele.href = this.dark
		}
		else if (this.theme == 'dark')
		{
			window.localStorage.setItem('theme', 'light')
			this.theme = 'light'
			this.ele.href = this.light
		}
	}

	async logout()
	{
		return await axios
		.post('http://localhost:8000/api/auth/logout', {}, {"headers": {"Authorization": `Bearer ${window.localStorage.getItem('token')}`}})
			.then(res => 
			{
				window.localStorage.removeItem('token')
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
	overflow: hidden
	z-index: 2

	nav
		width: 100%
		height: 100%

.list
	width: 100%
	height: 100%

	li
		width: 100%
		height: 50px

.link
	width: 100%
	height: 100%

	i
		width: 100%
		height: 100%
		font-size: 20px

.router-link-active 
	border-top: 3px solid var(--primary)

.not
	display: none

@media screen and (min-width: 426px)
	.nav
		top: 0
		left: 0
		height: 100vh
		width: 50px

	.list
		width: 100%
		height: 100%
		flex-direction: column

		li
			width: 100%
			height: 50px

	.router-link-active 
		border-top: 0px
		border-right: 3px solid var(--primary)

	.not
		display: flex



</style>