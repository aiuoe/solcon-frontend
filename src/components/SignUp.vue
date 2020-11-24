<template lang="pug">
	.container.center
		.decorate
			.circle
			.circle
			.circle
		form(@submit.prevent="signup" class="form box center-column")
			.wrapper
				select(v-model="relationship" class="select" "required")
					option(label="Abg" value="3")
					option(label="Doc" value="2")
					option(label="Lic" value="1")
				input(v-model="name" class="input" type="text" placeholder="Nombre: " required)
			input(v-model="lastname" class="input" type="text" placeholder="Apellido: " required)
			input(v-model="email" class="input" type="text" placeholder="Correo: " required)
			input(v-model="password" autocomplete="false" class="input" type="password" placeholder="Contraseña: " required)
			input(v-model="rePassword" autocomplete="false" class="input" type="Password" placeholder="Repetir Contraseña: " required)
			.wrapper
				input(type="submit" class="btn btn-signup" value="Enviar")
				router-link(to="login" class="btn btn-primary center") Entrar

			div(class="alert alert-danger" v-if="error") {{ message }}	
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component({
	name: 'SignUp'
})
export default class SignUp extends Vue {
	relationship: number = 1
	name: string = ''
	lastname: string = ''
	email: string = ''
	password: string = ''
	rePassword: string = ''
	referred: number = 1
	origin: number = 1
	params: object = {}
	error: boolean = false
	message: string = ''

	async signup()
	{
		this.params = {
			relp_id: this.relationship, 
			name: this.name, 
			lastname: this.lastname, 
			email: this.email, 
			password: this.password, 
			refd: this.referred, 
			org_id: this.origin
		}

		return await axios
			.post(`${process.env.VUE_APP_API_URL}/api/auth/signup`, this.params)
			.then((res: any) => { this.$router.push({ path: 'login' })})
			.catch((error: any) => {
				this.error = true
				this.message = 'Ah ocurrido un error en el registro!'
				setTimeout(() => {
					this.error = false
				}, 2000)
			})
	}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.container
	position: relative
	width: 100vw
	height: 100vh
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
		height: 70%
		background-color: var(--contrast)

		.wrapper
			width: 80%
			height: 40px
			display: flex
			justify-content: space-evenly
			align-items: center

			.select
				width: 25%
				height: 37px
				align-self: center
				background-color: var(--background)
				color: var(--font)
				outline: none
				text-indent: 15px
				border: var(--border)
				border-right: 0px

			.input
				width: 75%
				height: 35px
				margin: 5px 0px
				border: var(--border)
				text-indent: 5px
				color: var(--font)
				border-left: 0px


		.input
			width: 80%
			height: 35px
			margin: 5px 0px
			border: var(--border)
			color: var(--font)

		.wrapper
			width: 80%
			height: 40px
			margin-top: 10px

			.btn-signup
				width: 40%
				height: 35px
				color: #2d2d2d
				background-color: white
				font-family: sans-serif
				font-size: 15px
				box-shadow: var(--shadow)

			.btn-primary
				width: 40%
				height: 35px
				color: white
				font-size: 15px
				box-shadow: var(--shadow-primary)



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
