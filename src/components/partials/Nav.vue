<template lang="pug">
	section(class="nav")
		nav(class="center")
			ul(class="list center")
				li(class="center")
					router-link(to="dashboard" class="link") 
						i(class="fa fa-home center")
				li(class="center")
					router-link(to="business" class="link") 
						i(class="fa fa-building center")
				li(class="center")
					router-link(to="products" class="link") 
						i(class="fa fa-dolly center")
				li(class="center")
					a(class="link") 
						i(class="fa fa-wallet center")
				li(class="center") 
					router-link(to="purchases" class="link")
						i(class="fa fa-shopping-cart center")
				li(class="center")
					router-link(to="tickets" class="link") 
						i(class="fa fa-ticket-alt center")
				//- li(class="center")
				//- 	router-link(to="profile" class="link") 
				//- 		i(class="fa fa-user")
				li(class="center" v-show="rol === 4") 
					router-link(to="customers" class="link")
						i(class="fa fa-users center")
				li(class="center") 
					a(class="link" @click="setTheme")
						i(class="fa fa-adjust center")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	name: 'Nav',
})
export default class Nav extends Vue {

	rol: string = ""
	light: string = `${process.env.BASE_URL}css/light.css`
	dark: string = `${process.env.BASE_URL}css/dark.css`
	ele: any = document.querySelector('#theme')
	theme: any = ''

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
}
</script>

<style lang="sass" scoped>
section
	position: fixed
	bottom: 0px
	// top: 0px
	left: 0px
	// width: 50px
	height: 50px
	// height: 100vh
	width: 100vw
	overflow: hidden
	z-index: 2

	nav
		width: 100%
		height: 100%

		.list
			width: 100%
			height: 100%
			list-style: none			

			li
				width: 100%
				height: 50px
				border-top-left-radius: 10px
				border-bottom-left-radius: 10px

				.link
					width: 100%
					height: 100%
					text-decoration: none
					color: #3C3F72
					cursor: pointer

					i
						width: 100%
						height: 100%
						font-size: 20px
						order: -1

				.router-link-active 
					border-top: 2px solid var(--primary)

</style>
