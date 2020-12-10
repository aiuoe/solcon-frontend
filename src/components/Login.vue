<template lang="pug">
	.container.center
		.decorate
			svg(class="svg-circle" 
			viewBox="0 0 300 300" 
			version="1.1" 
			xmlns="http://www.w3.org/2000/svg")
				circle(class="circle" cx="0" cy="0" :r="radius" fill="#D15B57")

		.tabs.evenly-center
			a(:class="['tab', 'center', 'link', {'tab-active': !inor}]" @click="inor = false") Entrar
			a(:class="['tab', 'center', 'link', {'tab-active': inor}]" @click="inor = true") Crear Cuenta

		form(@submit.prevent="login" class="form center-column" v-if="!inor")
			input(v-model="email" class="input" type="text" placeholder="Correo" autocomplete="false" required)
			input(v-model="password" class="input" type="password" placeholder="Contraseña" autocomplete="false" required)
			input(type="submit" class="btn btn-login" value="Entrar")

		form(@submit.prevent="signup" class="form form-secondary center-column" v-if="inor")
			input(v-model="name" class="input" type="text" placeholder="Nombre" required)
			input(v-model="lastname" class="input" type="text" placeholder="Apellido" required)
			input(v-model="email" class="input" type="text" placeholder="Correo" required)
			input(v-model="password" autocomplete="false" class="input" type="password" placeholder="Contraseña" required)
			input(type="submit" class="btn btn-signup" value="Enviar")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { COMPANIES } from '@/graphql/queries/company'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import { DB } from '@/modules/DB'

@Component({
	name: 'Login',
	methods:
	{
		...mapActions(['roleSet', 'companySet'])
	}
})
export default class Login extends Vue {
	email: string = ''
	password: string = ''
	name: string = ''
	lastname: string = ''
	rePassword: string = ''
	referred: number = 1	
	params: any = {}
	radius: number = 300
	db: any
	inor: boolean = false
	companySet!: (value: object | null) => any

	async created()
	{
		this.db = DB

		setInterval(() =>
		{
			this.radius = Math.floor(Math.random() * (250 - 350)) + 250
		}, 1000)
	}

	async login()
	{
		this.params = {
			email: this.email, 
			password: this.password
		}
		await axios.post(`${process.env.VUE_APP_API_URL}/api/auth/login`, this.params)
			.then(res => { 
				window.localStorage.setItem('token', res['data']['access_token'])
				if (this.$store.state.company == undefined)
				{
					this.db.companies.get({lid: 1})
					.then((res: any) => {
						if (res)
						{
							this.companySet(res)
							this.$router.push({path: 'inicio'})
						}
						else
						{
							this.db.companies.clear()
							this.$apollo.query({query: COMPANIES})
							.then(res => {
								if (res.data.me.companies.length)
								{
									this.db.companies.bulkAdd(res.data.me.companies)
								}
								else
									this.$router.push({path: 'empresa'})
							})
							.catch((err: any) => { console.log(err) })
							}
						})
						.catch((err: any) => { console.log(err) })
				}
			})
			.catch((err: any) => { console.log(err) })
		
		// end method
	}

	async signup()
	{
		this.params = {
			name: this.name, 
			lastname: this.lastname, 
			email: this.email, 
			password: this.password, 
			refd: this.referred
		}

		return await axios
			.post(`${process.env.VUE_APP_API_URL}/api/auth/signup`, this.params)
			.then((res: any) => { this.inor = false })
			.catch(err => console.log(err))
	}
	// end class
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.container
	position: relative
	width: 100vw
	height: 100vh
	overflow: hidden
	background-color: var(--background)

	.decorate
		display: flex
		justify-content: center

		.svg-circle
			position: absolute
			width: 300px
			height: 300px
			top: 0px
			left: 0px

			.circle
				transition: r 3s ease-out

	.tabs
		width: 100%
		height: 50px
		border-bottom: 3px solid var(--background)

		.tab
			width: 50%
			height: 100%
			color: var(--font)
			font-size: 20px

			&:nth-child(1)
				border-top-left-radius: 20px
			
			&:nth-child(2)
				border-top-right-radius: 20px

			&-active
				border-bottom: 3px solid var(--primary)

			&:hover
				background: var(--primary)


	.form
		width: 100%
		height: 30%
		box-sizing: border-box
		background-color: var(--contrast)
		// box-shadow: var(--shadow)

		&-secondary
			height: 45%

		.input
			width: 80%
			height: 35px
			margin: 5px 0px
			border-radius: 3px
			color: var(--font)

.btn
	width: 40%
	height: 35px
	color: var(--font)
	font-family: sans-serif
	font-size: 15px
	border-radius: 3px
	background-color: var(--contrast)
	border-radius: 3px
	box-shadow: var(--shadow)
	border: 2px solid var(--background)

@media screen and (min-width: 576px)
	.container
		.form
			width: 70%

		.tabs
			width: 70%

@media screen and (min-width: 768px)
	.container
		.form
			width: 50%
		
		.tabs
			width: 50%

@media screen and (min-width: 992px)
	.container
		.form
			width: 40%

		.tabs
			width: 40%

@media screen and (min-width: 1024px)
	.container
		.form
			width: 30%

		.tabs
			width: 30%

</style>
