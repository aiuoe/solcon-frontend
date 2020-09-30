<template lang="pug">
	.container.center
		form(@submit.prevent="signup" class="form center-column box")
			.wrapper
				select(v-model="relationship" class="select" required)
					option(label="Abg" value="Abg")
					option(label="Doc" value="Doc")
					option(label="Lic" value="Lic" [selected])
				input(v-model="name" class="input" type="text" placeholder="Nombre: " required)
			input(v-model="lastname" class="input" type="text" placeholder="Apellido: " required)
			input(v-model="email" class="input" type="text" placeholder="Email: " required)
			input(v-model="password" autocomplete="false" class="input" type="password" placeholder="Contraseña: " required)
			input(v-model="password" autocomplete="false" class="input" type="rePassword" placeholder="Repetir Contraseña: " required)
			.wrapper
				router-link(to="login" class="link center") Entrar
				input(type="submit" class="btn btn-signup" value="Enviar")
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

		return await axios.post('http://localhost:8000/api/auth/signup', this.params).then((response: any) => { if (response['status'] === 200) this.$router.push({ path: 'login' })}).catch((error: any) => {console.log(error)})
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

	.form
		width: 100%
		height: 100%

		.wrapper
			width: 80%
			height: 40px

			.select
				width: 20%
				height: 37px
				align-self: center
				border: 0px
				outline: none
				border: 1px solid lightgray
				background-color: $w
				color: $font

			.input
				width: 80%
				height: 35px
				margin: 5px 0px
				outline: none
				text-indent: 10px
				border: 1px solid lightgray
				color: $font


		.input
			width: 80%
			height: 35px
			margin: 5px 0px
			outline: none
			text-indent: 10px
			border: 1px solid lightgray
			color: $font

		.btn
			display: flex
			justify-content: center
			align-items: center
			width: 30%
			outline: none
			border: 0px
			height: 35px
			cursor: pointer
			color: var(--font)
			text-decoration: none
			align-self: center
			font-family: sans-serif
			font-size: 15px
			border-radius: 3px

			&-signup
				background-color: $success

				&:hover
					background-color: darken($success, 10%)

		.link
			background-color: var(--warning)
			width: 30%
			height: 35px
			border-radius: 3px
			outline: none
			text-decoration: none
			color: var(--font)
			font-size: 15px

			&:hover
				color: darken($info, 50%)
				text-decoration: none

			&:focus
				color: $warning



@media screen and (min-width: 500px)
	.container
		.form
			width: 85%

@media screen and (min-width: 576px)
	.container
		.form
			width: 50%

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
