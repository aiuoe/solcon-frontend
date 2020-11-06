<template lang="pug">
	.container.center
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
import axios from 'axios';

@Component({
	name: 'Login'
})
export default class Login extends Vue {
	email: string = ''
	password: string = ''
	params: any = {}
	error: boolean = false
	message: string = ''

	async login()
	{
		this.params = {
			email: this.email, 
			password: this.password
		}
		return await axios.post(`${process.env.VUE_APP_API_URL}/api/auth/login`, this.params)
			.then(res => {
				window.localStorage.setItem('token', res['data']['access_token'])
				this.$router.push({ path: 'dashboard' })
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
$light: lightgray
$dark: darkgray

.container
	position: relative
	width: 100vw
	height: 100vh
	overflow: hidden
	background-color: white

	.form
		width: 100%
		height: 30%
		box-sizing: border-box
		background-color: white

		.input
			width: 80%
			height: 35px
			margin: 5px 0px
			border-radius: 3px
			color: $font
			border: var(--border)

		.wrapper
			width: 80%
			height: 40px
			margin-top: 10px

		.evenly-center
			flex-wrap: nowrap

			.btn-login
				width: 40%
				height: 35px
				color: $font
				font-family: sans-serif
				font-size: 15px
				border-radius: 3px
				background-color: $w
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
