<template lang="pug">
	.container.center
		.decorate
			.circle
			.circle
			.circle

		form(@submit.prevent="login" class="form center-column")
			input(v-model="email" class="input" type="text" placeholder="Correo: " autocomplete="false" required)
			input(v-model="password" class="input" type="password" placeholder="Contraseña: " autocomplete="false" required)
			.wrapper.evenly-center
				input(type="submit" class="btn btn-login" value="Entrar")
				router-link(to="signup" class="btn btn-primary center") Nueva
			div(class="alert alert-danger" v-if="error") {{ message }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex'
import { decodeJWT } from '@/modules/Jwt'
import axios from 'axios';

@Component({
	name: 'Login',
	methods:
	{
		...mapActions(['roleSet', 'companyIDSet'])
	}
})
export default class Login extends Vue {
	email: string = ''
	password: string = ''
	params: any = {}
	error: boolean = false
	message: string = ''
	admin: boolean = false
	roleSet!: (value: boolean) => any
	companyIDSet!: (value: number | null) => any

	async login()
	{
		this.params = {
			email: this.email, 
			password: this.password
		}
		await axios.post(`${process.env.VUE_APP_API_URL}/api/auth/login`, this.params)
			.then(res => { 
				window.localStorage.setItem('token', res['data']['access_token'])
				if (decodeJWT('company_id'))
				{
					this.companyIDSet(decodeJWT('company_id'))
					this.$router.push({ path: 'inicio' })
				}
				else
					this.$router.push({ path: 'empresa' })

			})
			.catch(error => { 
				this.error = true 
				this.message = 'Usuario o contraseñas invalidas!'
				setTimeout(() => {
					this.error = false
				}, 2000)
				this.email = ''
				this.password = ''
			})
		
		// end method
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


	.circle
		position: absolute
		top: 0px
		border-radius: 100%

		&:nth-child(1)
			width: 55vw
			height: 115vh
			top: -40px
			background-color: #206934
			right: -25vw
		
		&:nth-child(2)
			width: 50vw
			height: 110vh
			top: -30px
			background-color: #2C8F47
			right: -25vw

		&:nth-child(3)
			width: 45vw
			height: 100vh
			background-color: var(--success)
			right: -25vw

	.form
		width: 100%
		height: 30%
		box-sizing: border-box
		background-color: var(--contrast)
		box-shadow: var(--shadow)

		.input
			width: 80%
			height: 35px
			margin: 5px 0px
			border-radius: 3px
			color: var(--font)

		.wrapper
			width: 80%
			height: 40px
			margin-top: 10px

		.evenly-center
			flex-wrap: nowrap

			.btn-login
				width: 40%
				height: 35px
				color: #2d2d2d
				font-family: sans-serif
				font-size: 15px
				border-radius: 3px
				background-color: white
				border-radius: 3px
				box-shadow: var(--shadow)

			.btn-primary
				width: 40%
				height: 35px
				font-size: 15px
				border-radius: 3px
				font-weight: bold
				color: white
				box-shadow: var(--shadow-primary)

		.alert
			width: 80%
			height: 40px
			margin-top: 10px
			display: flex
			justify-content: center
			align-items: center
			color: white
			font-size: 17px

@media screen and (min-width: 576px)
	.container
		.form
			width: 70%

@media screen and (min-width: 768px)
	.container
		.form
			width: 50%

@media screen and (min-width: 992px)
	.container
		.form
			width: 40%

@media screen and (min-width: 1024px)
	.container
		.form
			width: 30%

</style>
