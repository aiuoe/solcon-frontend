<template lang="pug">
	.container
		Nav
		main.main.start-start
			section.section
				ul.list
					//- li(class="box item center")
					//- 	router-link(to="business" class="link center")
					//- 		i(class="fa fa-building center")
					//- li(class="box item center")
					//- 	router-link(to="products" class="link center") 
					//- 		i(class="fa fa-dolly center")
					//- li(class="box item center")
					//- 	a(class="link center") 
					//- 		i(class="fa fa-wallet center")
					//- li(class="box item center") 
					//- 	router-link(to="purchases" class="link center")
					//- 		i(class="fa fa-shopping-cart center")
					//- li(class="box item center")
					//- 	router-link(to="tickets" class="link center")
					//- 		i(class="fa fa-ticket-alt center")
					li(class="box item center" v-show="admin") 
						router-link(to="customers" class="link center")
							i(class="fa fa-users center")
					li(class="box item center") 
						router-link(to="bank" class="link center")
							i(class="fa fa-landmark center")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import gql from 'graphql-tag';

@Component({
	name: 'Dashboard',
	components: { Nav }
})
export default class Dashboard extends Vue {

	rol: number = 0
	id: any = {}
	admin: boolean = false

	async created ()
	{
		this.rol = JSON.parse(decodeURIComponent(atob(window.localStorage.getItem('token')!.split('.')[1]).split('').join(''))).rol
		this.id = window.localStorage.getItem('id')

		if (this.rol == 4 || this.id == 1)
			this.admin = true
		// return await this.$apollo.query({
		// 	query: gql(`
		// 		query
		// 		{
		// 			me
		// 			{
		// 				id
		// 			}
		// 		}
		// 	`)})
		// .then(res => {
		// 	window.localStorage.setItem('id', res.data.me.id)
		// 	this.id = window.localStorage.getItem('id')
		// 	console.log(this.id)
		// })
		// .catch(err => console.log(err))
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.main
	display: flex
	flex-direction: column

.section
	width: 100%
	height: 100%
	display: flex
	justify-content: center
	align-items: center

.list
	padding: 10px
	box-sizing: border-box
	width: 100%
	height: 70%
	flex-wrap: wrap
	justify-content: space-evenly
	align-items: space-evenly

.item
	width: 30%
	height: 45%
	cursor: pointer
	border-radius: 3px

.link
	width: 100%
	height: 100%

@media screen and (min-width: 426px)
	.section
		display: none


</style>
