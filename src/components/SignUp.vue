<template lang="pug">
	.container.center
		form(@submit.prevent="signup" class="form center-column")
			.wrapper
				select(v-model="relationship" class="select" required)
					option(label="Abg" value="Abg")
					option(label="Doc" value="Doc")
					option(label="Lic" value="Lic" [selected])
				input(v-model="name" class="input" type="text" placeholder="Nombre: " required)
			input(v-model="lastname" class="input" type="text" placeholder="Apellido: " required)
			input(v-model="email" class="input" type="text" placeholder="Correo: " required)
			input(v-model="password" autocomplete="false" class="input" type="password" placeholder="Contraseña: " required)
			input(v-model="password" autocomplete="false" class="input" type="rePassword" placeholder="Repetir Contraseña: " required)
			.wrapper
				input(type="submit" class="btn btn-signup" value="Enviar")
				router-link(to="login" class="btn btn-primary center") Entrar
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component({
	name: 'SignUp'
})
export default class SignUp extends Vue {
	relationship: string = ''
	name: string = ''
	lastname: string = ''
	email: string = ''
	password: string = ''
	rePassword: string = ''
	referred: number = 1
	origin: number = 1
	params: object = {}

	async signup()
	{
		this.params = {
			relp: this.relationship, 
			name: this.name, 
			lastname: this.lastname, 
			email: this.email, 
			password: this.password, 
			refd: this.referred, 
			org: this.origin
		}

		return await axios.post('https://staging-solcon.herokuapp.com/api/auth/signup', this.params).then((response: any) => { if (response['status'] === 200) this.$router.push({ path: 'login' })}).catch((error: any) => {console.log(error)})
	}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
$w: #fff
$b: #f6f2ed
$info: #91D2FC
$warning: #FDD194
$danger: #F291A4
$success: #83D0CA
$font: #4F4C5F
$shadow: 5px 5px 10px 1px rgba(211, 211, 211, .4)
$light: lightgray
$dark: darkgray

.container
	position: relative
	width: 100vw
	height: 100vh
	background-color: white

	.form
		width: 100%
		height: 100%

		.wrapper
			width: 80%
			height: 40px

			.select
				width: 25%
				height: 37px
				align-self: center
				background-color: $w
				color: $font
				outline: none
				text-indent: 15px
				border-radius: 50px
				border-top-right-radius: 0px
				border-bottom-right-radius: 0px
				border: var(--border)
				border-right: 0px

			.input
				width: 75%
				height: 35px
				margin: 5px 0px
				border: var(--border)
				text-indent: 5px
				color: $font
				border-top-left-radius: 0px
				border-bottom-left-radius: 0px
				border-left: 0px


		.input
			width: 80%
			height: 35px
			margin: 5px 0px
			border: var(--border)
			color: $font
			border-radius: 50px

		.wrapper
			width: 80%
			height: 40px
			margin-top: 10px

			.btn-signup
				width: 40%
				height: 35px
				color: var(--font)
				background-color: white
				font-family: sans-serif
				font-size: 15px
				border-radius: 50px
				box-shadow: var(--shadow)


			.btn-primary
				width: 40%
				height: 35px
				color: var(--white)
				font-size: 15px
				border-radius: 50px
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
