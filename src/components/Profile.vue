<template lang="pug">
	.container
		Header
		Nav
		main.main.evenly-center
			.content.box.p-7
			.aside.box.start-start-column
				.head.center
					.portrait
						img(class="img" src="http://lorempixel.com/400/300/nature")
					.photo
						img(class="img" src="http://lorempixel.com/400/300/people")
				.menu
					ul.list
						li.item.center
							a.link.center(@click="menuToggle('tickets')")
								i(class="fa fa-ticket-alt center")
						li.item.center
							a.link.center(@click="menuToggle('purchasesMenuShow')")
								i(class="fa fa-shopping-cart center")
						li.item.center
							a.link.center(@click="menuToggle('companiesMenuShow')")
								i(class="fa fa-building center")
						li.item.center
							a.link.center(@click="menuToggle('details')")
								i(class="fa fa-user center")
				.body
					.details(v-if="details")
					.tickets.p-7(v-if="tickets")
						Ticket(:tickets.sync="me.tickets")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import Header from '@/components/partials/Header.vue';
import Loader from '@/components/partials/Loader.vue';
import Ticket from '@/components/partials/Ticket.vue';
// import { ME } from '@/graphql/Queries';
import '@/modules/Array'

@Component({
	name: 'Profile',
	components: { Header, Nav, Loader, Ticket },
	filters: {
	  capitalize: function (value: any)
	  {
	    if (!value) return ''
	    value = value.toString()
	    return value.charAt(0).toUpperCase() + value.slice(1)
	  },
	  toUpperCase: function(value: any)
	  {
	  	if (!value) return ''
	    value = value.toString()
		  return value.toUpperCase()
	  }
	}
})
export default class Profile extends Vue {

	me: any = {}
	tickets: boolean = false
	details: boolean = true

	async created()
	{
		// await this.$apollo.query({query: ME})
		// 	.then(res => { this.me = res.data.me })
	}

	menuToggle(key: string)
	{
		switch(key)
		{
			case 'details':
				this.tickets = false
				this.details = true
				break
			case 'tickets':
				this.details = false
				this.tickets = true
				break
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.content
	width: 65%
	height: 100%

.aside
	width: 30%
	height: 100%

.head
	width: 100%
	height: 30%
	position: relative

	.portrait
		width: 100%
		height: 100%

	.photo
		position: absolute
		width: 100px
		height: 100px
		cursor: pointer
		border-radius: 50%
		border: 3px solid var(--primary) 

		img
			width: 100%
			height: 100%
			border-radius: 50%


.menu
	width: 100%
	height: 50px
	background-color: var(--background)

	.list
		width: 100%
		height: 100%

		.item
			width: 100%
			height:100%

			.link
				width: 100%
				height: 100%

.body
	width: 100%
	height: calc(70% - 50px)

	.details
		width: 100%
		height: 100%

	.tickets
		width: 100%
		height: 100%
</style>