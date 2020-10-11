<template lang="pug">
	.container.center
		form(@submit.prevent="login" class="form center-column")
			input(v-model="email" class="input" type="text" placeholder="Correo: " autocomplete="false" required)
			input(v-model="password" class="input" type="password" placeholder="Contraseña: " autocomplete="false" required)
			.wrapper 
				input(type="submit" class="btn btn-login" value="Entrar")
				router-link(to="signup" class="btn btn-primary center") Nueva
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
		return await axios.post('https://amable-plus.herokuapp.com/api/auth/login', this.params)
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
		height: 100%
		box-sizing: border-box

		.input
			width: 80%
			height: 35px
			margin: 5px 0px
			border-radius: 30px
			color: $font
			border: var(--border)

		.wrapper
			width: 80%
			height: 40px
			margin-top: 10px

			.btn-login
				width: 40%
				height: 35px
				color: var(--font)
				font-family: sans-serif
				font-size: 15px
				border-radius: 3px
				background-color: $w
				border-radius: 30px
				box-shadow: var(--shadow)

			.btn-primary
				width: 40%
				height: 35px
				font-size: 15px
				border-radius: 50px
				font-weight: bold
				color: white
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
