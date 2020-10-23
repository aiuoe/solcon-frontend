<template lang="pug">
	.container
		Nav
		main.main.start-start
			section.section
				ul.list
					li(class="box item center")
						router-link(to="business" class="link center")
							i(class="fa fa-building center")
					li(class="box item center")
						router-link(to="products" class="link center") 
							i(class="fa fa-dolly center")
					li(class="box item center")
						a(class="link center") 
							i(class="fa fa-wallet center")
					li(class="box item center") 
						router-link(to="purchases" class="link center")
							i(class="fa fa-shopping-cart center")
					li(class="box item center")
						router-link(to="tickets" class="link center")
							i(class="fa fa-ticket-alt center")
					li(class="box item center" v-show="rol === 4") 
						router-link(to="customers" class="link center")
							i(class="fa fa-users center")
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

	rol: string = ""

	async created ()
	{
		this.rol = JSON.parse(decodeURIComponent(atob(window.localStorage.getItem('token')!.split('.')[1]).split('').join(''))).rol
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
