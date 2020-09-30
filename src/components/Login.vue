<template lang="pug">
	.container.center
		form(@submit.prevent="login" class="form center-column box")
			input(v-model="email" class="input" type="text" placeholder="Correo: " autocomplete="false" required)
			input(v-model="password" class="input" type="password" placeholder="Contraseña: " autocomplete="false" required)
			.wrapper 
				input(type="submit" class="btn btn-login" value="Entrar")
				router-link(to="signup" class="link center") Nueva Cuenta
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

	async login()
	{
		this.params = {
			email: this.email, 
			password: this.password
		}
		return await axios.post('http://localhost:8000/api/auth/login', this.params)
			.then(res => {
				window.localStorage.setItem('token', res['data']['access_token']);
				this.$router.push({ path: 'dashboard' });
			})
			.catch(error => {
				console.error('Error:' + error)
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
$shadow: 5px 5px 10px 1px rgba(211, 211, 211, .4)
$light: lightgray
$dark: darkgray

.container
	position: relative
	width: 100vw
	height: 100vh
	overflow: hidden

	.form
		width: 100%
		height: 100%
		box-sizing: border-box

		.wrapper
			width: 80%
			height: 40px

		.input
			width: 80%
			height: 35px
			margin: 5px 0px
			outline: none
			text-indent: 10px
			border: 1px solid lightgray
			color: $font

		.btn-login
			width: 30%
			height: 35px
			color: var(--font)
			font-family: sans-serif
			font-size: 15px
			border-radius: 3px
			background-color: $success

			&:hover
				background-color: darken($success, 10%)

		.link
			background-color: var(--warning)
			width: 40%
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



@media screen and (min-width: 576px)
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
