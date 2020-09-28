<template lang="pug">
	.container
		Nav
		main.main
			
	//- 		//- .container-fluid
				
	//- 		//- 	.graphs
	//- 		//- 		div(class="box banner")
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			.bubble
	//- 		//- 			span.title Clientes
	//- 		//- 			img(src="../../assets/muneca.png")
	//- 		//- 		div(class="box graph")
	//- 		//- 		div(class="box graph")

	//- 		//- 	.users
	//- 		//- 		div(class="box filter")

	//- 		//- 			.queries
	//- 		//- 				span(class="tag" @click="filter('all')") todos
	//- 		//- 				span(class="tag" @click="filter('purchases')") compras
	//- 		//- 				span(class="tag" @click="filter('tickets')") tickets

	//- 		//- 			.calendar
	//- 		//- 				.fromto
	//- 		//- 					span(v-if="fDate != null" class="fromto") Desde: {{fDate[0]}}/{{fDate[1]}}/{{fDate[2]}}
	//- 		//- 					span(v-if="lDate != null" class="fromto") Hasta: {{lDate[0]}}/{{lDate[1]}}/{{lDate[2]}}
	//- 		//- 				//- Calendar(@sendDate="getDate")

	//- 		//- 		div(class="box customers")
	//- 		//- 			ul.list
	//- 		//- 				li.item(v-for="(user, key) in users" @click="showUser(key)")
	//- 		//- 					.profile
	//- 		//- 						span.photo(:style="{backgroundColor: colors[key]}") {{ user.name[0] | toUpperCase }}
	//- 		//- 					.data-user
	//- 		//- 						div.fullname
	//- 		//- 							span {{ user.name | capitalize }} {{ user.lastname | capitalize }}


	//- 		//- div(class="box aside")
	//- 		//- 	.head
	//- 		//- 		.profile
	//- 		//- 			.photo(:style="{backgroundColor: color}")
	//- 		//- 				span {{ letter | toUpperCase }}
	//- 		//- 		div(class="details font")
	//- 		//- 			span {{ user.name | capitalize }} {{ user.lastname | capitalize }}
	//- 		//- 			span(v-if="address != null") {{ address.country | capitalize }} - {{ address.state | capitalize }}
	//- 		//- 	.nav
	//- 		//- 		ul.list
	//- 		//- 			li.item
	//- 		//- 				a.link
	//- 		//- 					i(class="fa fa-user")
	//- 		//- 			li.item
	//- 		//- 				a.link
	//- 		//- 					i(class="fa fa-building")
	//- 		//- 			li.item
	//- 		//- 				a.link
	//- 		//- 					i(class="fa fa-ticket-alt")
	//- 		//- 			li.item
	//- 		//- 				a.link
	//- 		//- 					i(class="fa fa-shopping-cart")
	//- 		//- 	.data
	//- 		//- 		.wrapper
	//- 		//- 			.phones(v-for="phone in user.phones")
	//- 		//- 				span.phone {{ phone.phone }}
	//- 		//- 		.wrapper
	//- 		//- 		.wrapper
	//- 				.wrapper


</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import gql from 'graphql-tag';
import Nav from '@/components/partials/Nav.vue';
import {GET_ALL_CUSTOMERS} from '@/queries/Queries';
// import Calendar from '@/components/partials/Calendar.vue';
// import ChartBar from '@/components/partials/ChartBar'

// const GET_ALL_CUSTOMERS = gql(`query 
// { 
//  users(first: 10)
//  {
//    data
//    {
//      id
//      relp
//      name
//      lastname
//      email
//      sex
//      dni
//      rif
//      Ncompanies
//      Ntickets
//      companies
//      {
//        id
//        name
//        rif
//        fyc
//      }
//      address
//      {
//        id
//        label
//        address
//        country
//        state
//        city
//        province
//        zip_code
//      }
//      emails
//      {
//        id
//        email_alt
//      }
//      phones
//      {
//        id
//        label
//        phone
//      }
//      currencies
//      {
//        id
//      }
//      languages
//      {
//        id
//      }
//      products
//      {
//        id
//        name
//        description
//        price
//        created_at
//      }
//      tickets
//      {
//        id
//        title
//        message
//        channel
//        priority
//        status
//        pinned
//        private
//        Ncomments
//        created_at
//        updated_at
//      }
//    }
//  }
// }`);


@Component({
	name: 'Customers',
	components: { Nav },
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
export default class Customers extends Vue {
	users: object = {}
	// user: any = {}
	// showCompanies: boolean = false
	// showDetails: boolean = true
	// showTickets: boolean = false
	// showPurchases: boolean = false
	// letter: string = ''
	// address: object
	// color: string = ''
	// detailsNav: boolean = true
	// purchasesNav: boolean = false
	// ticketsNav: boolean = false
	// days: any = {}

	// constructor()
	// { 
	// 	this.colors = ['#91D2FC', '#FDD194', '#F291A4', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']
	// 	this.aux = {}
	// 	this.firstDate = null
	// 	this.lastDate = null
	// 	this.key = 'all'
	// 	this.showT = true
	// 	this.title = ''
	// 	this.message = ''
	// 	this.priority = false
	// 	this.fDate = null
	// 	this.lDate = null
	// 	this.keyUser = 0
	// 	this.address = {}
	// 	super(); 
	// }

	async created()
	{
		// 		// this.user = this.users[0]
		// 		// this.address = this.user.address[0]
		// 		// this.letter = this.user.name[0]
		// 		// this.color = this.colors[0]
		// 		// this.aux = this.users
		// console.log(this.$apollo)
		return await this.$apollo.query({query: GET_ALL_CUSTOMERS}).then((res: any) => { this.users = res.data.users.data })
	}	


	// async created()
	// {
	// 	return await this.$apollo
	// 		.query({
	// 	 		query: GET_ALL_USERS
	// 	 	})
	// 		.then(res => {
	// 			this.users = res.data.users.data;
	// 			this.user = this.users[0]
	// 			this.address = this.user.address[0]
	// 			this.letter = this.user.name[0]
	// 			this.color = this.colors[0]
	// 			this.aux = this.users
	// 		})
	// }	

	// async showUser(key)
	// {
	// 	this.user = this.users[key]
	// 	if (this.user.address[0])
	// 		this.address = this.user.address[0]
	// 	else
	// 		this.address = null
	// 	this.letter = this.user.name[0]
	// 	this.color = this.colors[key]
	// }

	// show(key)
	// {
	// 	switch(key)
	// 	{
	// 		case 'details':
	// 			this.showDetails = true
	// 			this.showTickets = false
	// 			this.showPurchases = false
	// 			this.detailsNav = true
	// 			this.purchasesNav = false
	// 			this.ticketsNav = false
	// 			break
	// 		case 'purchases':
	// 			this.showPurchases = true
	// 			this.showDetails = false
	// 			this.showTickets = false
	// 			this.purchasesNav = true
	// 			this.detailsNav = false
	// 			this.ticketsNav = false
	// 			break
	// 		case 'tickets':
	// 			this.showTickets = true
	// 			this.showPurchases = false
	// 			this.showDetails = false
	// 			this.ticketsNav = true
	// 			this.detailsNav = false
	// 			this.purchasesNav = false
	// 	}

	// }

	// getDate(date)
	// {
	// 	if (this.key != 'all')
	// 	{
	// 		if(this.firstDate == null)
	// 		{
	// 			this.firstDate = `${date[2]}-${date[1]+1}-${date[0]}`
	// 			this.fDate = date
	// 			this.lastDate = null
	// 			this.filter(this.key)
	// 		}
	// 		else
	// 		{
	// 			this.lastDate = `${date[2]}-${date[1]+1}-${date[0]}`
	// 			this.lDate = date
	// 			this.filter(this.key)
	// 			this.firstDate = null
	// 		}
	// 	}
	// }

	// filter(key)
	// {
	// 	this.key = key
	// 	switch(this.key)
	// 	{
	// 		case 'all':
	// 			this.fDate = null
	// 			this.lDate = null
	// 			this.users = this.aux
	// 			break
	// 		case 'purchases':
	// 			this.fDate = null
	// 			this.lDate = null
	// 			this.users = this.aux
	// 			this.users = this.users.filter(u => u.products.length > 0)
	// 			break
	// 		case 'tickets':
	// 			this.users = this.aux
	// 			this.users = this.users.filter(u => u.Ntickets > 0)				
	// 			if(this.firstDate != null)
	// 			{
	// 				this.users = this.aux
	// 				this.users = this.users.filter(u => (u.tickets.filter( t => {t.created_at = t.created_at.split('-').map(n => Math.abs(n)).join('-'); let a = new Date(t.created_at), b = new Date(this.firstDate); return a >= b }).length)? true : false)
	// 			}
	// 			if(this.firstDate != null && this.lastDate != null)
	// 			{
	// 				this.users = this.aux
	// 				this.users = this.users.filter(u => (u.tickets.filter(t =>{t.created_at = t.created_at.split('-').map(n => Math.abs(n)).join('-');let a = new Date(t.created_at),b = new Date(this.firstDate),c = new Date(this.lastDate);return a >= b && a <= c}).length)? true : false)
	// 			}
	// 			break
	// 	}
	// }

	// async createTicket()
	// {
	// 	return await this.$apollo
	// 		.mutate({
	// 			mutation: CREATE_TICKET,
	// 			variables: {
	// 				userID: this.user.id,
	// 				title: this.title.toString(),
	// 				message: this.message.toString(),
	// 				channel: "Web"
	// 			}
	// 		})
	// 		.then(res => {
	// 			this.user.tickets = res.data.updateUser.tickets
	// 			this.showT = !this.showT
	// 		})
	// }


// console.log(this.tickets.filter(t => {let r = false; k.map((key, i) => {(t[key] !== v[i])? r = true : null}); return !r}))
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
$shadow: 5px 5px 10px 1px rgba(211, 211, 211, .7)
$light: lightgray
$dark: darkgray


// .users
// 	width: 40%
// 	height: 100%
// 	padding: 5px
// 	box-sizing: border-box
// 	display: flex
// 	flex-direction: column
// 	justify-content: space-evenly
// 	align-items: center

// 	.filter
// 		width: 100%
// 		height: 20.5%
// 		padding: 5px
// 		display: flex
// 		flex-direction: column
// 		justify-content: space-between
// 		align-items: center
// 		overflow: hidden
// 		border-radius: 3px
// 		box-sizing: border-box

// .list
// 	list-style: none
// 	width: 100%
// 	height: 100%
// 	padding: 10px
// 	box-sizing: border-box
// 	overflow-y: scroll

// 	&::-webkit-scrollbar 
// 		width: 5px

// 	&::-webkit-scrollbar-thumb 
// 		background: orange
// 		border-radius: 50px

// 	.item
// 		width: 100%
// 		height: 30px
// 		margin-bottom: 5px
// 		display: flex
// 		cursor: pointer
// 		overflow: hidden

// .profile
// 	width: 10%
// 	height: 100%
// 	display: flex
// 	justify-content: center
// 	align-items: center

// 	.photo
// 		width: 100%
// 		height: 100%
// 		display: flex
// 		justify-content: center
// 		align-items: center
// 		background-color: $warning
// 		color: $font
// 		font-size: 20px

// .data-user
// 	width: 100%
// 	display: flex
// 	flex-direction: column
// 	justify-content: center
// 	align-items: flex-start
// 	padding: 5px
// 	box-sizing: border-box
// 	border-top: 1px solid $light
// 	border-bottom: 1px solid $light
// 	border-right: 1px solid $light

// 	span
// 		font-size: 15px
// 		font-family: sans-serif

// .customers
// 	width: 100%
// 	height: 73%
// 	display: flex
// 	justify-content: center
// 	align-items: center
// 	border-radius: 3px

// .graphs
// 	width: 60%
// 	height: 100%
// 	padding: 5px
// 	box-sizing: border-box
// 	display: flex
// 	flex-direction: column
// 	justify-content: space-evenly
// 	align-items: center

// 	.banner
// 		width: 100%
// 		height: 20%
// 		border-radius: 3px
// 		overflow: hidden
// 		display: flex
// 		justify-content: space-around
// 		position: relative

// 		.title
// 			position: absolute
// 			top: 30px
// 			left: 30px
// 			font-family: 'philosopher'
// 			font-size: 25px
// 			font-weight: 400

// 		.bubble
// 			border-radius: 50%
// 			position: absolute
// 			top: 0px
// 			left: -10px

// 			&:nth-child(1)
// 				width: 30px
// 				height: 30px
// 				background-color: $info
// 			&:nth-child(2)
// 				width: 50px
// 				height: 50px
// 				background-color: $danger
// 				left: 40px
// 				top: 80px
// 			&:nth-child(3)
// 				width: 35px
// 				height: 35px
// 				background-color: $warning
// 				left: 150px
// 				top: 40px
// 			&:nth-child(4)
// 				width: 50px
// 				height: 50px
// 				background-color: $success
// 				clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)
// 				border-radius: 0px
// 				left: 350px
// 				top: 30px
// 			&:nth-child(5)
// 				width: 70px
// 				height: 70px
// 				background-color: $danger
// 				clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)
// 				border-radius: 0px
// 				left: 400px
// 				top: 100px
// 			&:nth-child(6)
// 				width: 30px
// 				height: 30px
// 				background-color: $warning
// 				clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)
// 				border-radius: 0px
// 				left: 450px
// 				top: 30px
// 			&:nth-child(7)
// 				width: 20px
// 				height: 20px
// 				background-color: $info
// 				left: 150px
// 				top: 100px



// 		// .banner-users
// 		// 	width: 30%
// 		// 	height: 100%


// 	.graph
// 		width: 100%
// 		height: 35%
// 		border-radius: 3px
// 		display: flex
// 		justify-content: center
// 		align-items: center

// .queries
// 	width: 100%
// 	height: 30%
// 	padding: 5px
// 	display: flex
// 	justify-content: space-evenly
// 	align-items: space-evenly
// 	flex-wrap: wrap
// 	box-sizing: border-box

// 	.tag
// 		display: flex
// 		justify-content: center
// 		align-items: center
// 		max-height: 20px
// 		border-radius: 5px
// 		padding: 2px 5px
// 		background-color: $warning
// 		color: $font
// 		font-size: 12px
// 		cursor: pointer
// 		margin: 1px 0px
// 		box-sizing: border-box

// .calendar
// 	width: 100%
// 	height: 70%
// 	display: flex
// 	flex-direction: column
// 	justify-content: center
// 	align-items: center
// 	align-self: flex-end
// 	overflow: hidden
// 	border-radius: 3px

// 	.fromto
// 		display: flex
// 		justify-content: space-evenly
// 		padding: 5px
// 		box-sizing: border-box
// 		width: 100%
// 		height: 30%
// 		font-size: 10px
// 		font-family: sans-serif

// .aside
// 	width: 30%
// 	height: 100vh
// 	display: flex
// 	flex-direction: column

// 	.head
// 		width: 100%
// 		height: 70px
// 		// align-self: center
// 		// padding: 100px 0px
// 		// box-sizing: border-box
// 		display: flex
// 		justify-content: flex-start
// 		align-items: center
// 		border-bottom: 1px solid $b

// 		.profile
// 			width: 20%
// 			height: 100%
// 			display: flex
// 			justify-content: flex-end

// 			.photo
// 				width: 50px
// 				height: 50px
// 				border-radius: 50%
// 				display: flex
// 				justify-content: center
// 				align-items: center
// 				font-weight: bold
// 				// clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)

// 		.details
// 			width: 80%
// 			height: 100%
// 			padding: 20px
// 			box-sizing: border-box
// 			display: flex
// 			flex-direction: column
// 			align-items: flex-start
// 			justify-content: space-evenly

// 	.nav
// 		width: 100%
// 		height: 50px	
// 		border-bottom: 1px solid $b
// 		display: flex
// 		justify-content: center
// 		box-shadow: none

// 		.list
// 			width: 100%
// 			height: 100%
// 			display: flex
// 			justify-content: space-evenly
// 			align-items: center
// 			overflow-y: hidden

// 			.item
// 				display: flex
// 				justify-content: center
// 				align-items: center

// 	.data
// 		width: 100%
// 		padding: 10px
// 		box-sizing: border-box

// .wrapper

// 	.phones
// 		width: 100%
// 		background-color: red
// 		.phone
// 			width: 70%
// 			background-color: navy


// 		// 	.details
// 		// 		width: 100%
// 		// 		// background-color: lime
// 		// 		height: 20%
// 		// 		display: flex
// 		// 		flex-direction: column
// 		// 		justify-content: space-evenly
// 		// 		align-items: center

// 		// 		.photo
// 		// 			width: 100px
// 		// 			height: 100px
// 		// 			border-radius: 50%
// 		// 			background-color: $info
// 		// 			display: flex
// 		// 			justify-content: center
// 		// 			align-items: center
// 		// 			font-size: 50px
// 		// 			color: $w

// 		// 	.content
// 		// 		width: 100%
// 		// 		height: 80%
// 		// 		// background-color: hotpink

// 		// 		.list-nav
// 		// 			width: 100%
// 		// 			height: 10%
// 		// 			background-color: $b
// 		// 			list-style: none
// 		// 			display: flex
// 		// 			justify-content: space-evenly
// 		// 			align-items: center

// 		// 			li
// 		// 				cursor: pointer

// 		// 			.detailsNav
// 		// 				width: 50px
// 		// 				height: 30px
// 		// 				display: flex
// 		// 				justify-content: center
// 		// 				align-items: center
// 		// 				border-radius: 20px
// 		// 				background-color: $success

// 		// 			.purchasesNav
// 		// 				width: 50px
// 		// 				height: 30px
// 		// 				display: flex
// 		// 				justify-content: center
// 		// 				align-items: center
// 		// 				border-radius: 20px
// 		// 				background-color: $success

// 		// 			.ticketsNav
// 		// 				width: 50px
// 		// 				height: 30px
// 		// 				display: flex
// 		// 				justify-content: center
// 		// 				align-items: center
// 		// 				border-radius: 20px
// 		// 				background-color: $success



// 		// 		.list-content
// 		// 			list-style: none
// 		// 			width: 100%
// 		// 			height: 90%
// 		// 			padding: 10px
// 		// 			box-sizing: border-box
// 		// 			background-color: $w
// 		// 			display: flex
// 		// 			flex-direction: column
// 		// 			justify-content: flex-start
// 		// 			align-items: center

// 		// 			.item
// 		// 				width: 100%	
// 		// 				height: 100%
// 		// 				background-color: $w
// 		// 				padding: 5px
// 		// 				box-sizing: border-box
// 		// 				display: flex
// 		// 				flex-direction: column
// 		// 				justify-content: flex-start
// 		// 				overflow-y: scroll

// 		// 				&::-webkit-scrollbar 
// 		// 					width: 5px

// 		// 				&::-webkit-scrollbar-track 
// 		// 					background: $b

// 		// 				&::-webkit-scrollbar-thumb 
// 		// 					background: $info
// 		// 					border-radius: 20px

// 		// 				.wrapper-end
// 		// 					display: flex
// 		// 					justify-content: flex-end

// 		// 				.wrapper
// 		// 					width: 100%
// 		// 					display: flex
// 		// 					padding: 5px
// 		// 					box-sizing: border-box
// 		// 					justify-content: flex-start
// 		// 					align-items: flex-start
// 		// 					background-color: $w


// 		// 					.fa
// 		// 						margin-right: 10px
// 		// 						display: flex
// 		// 						justify-content: center
// 		// 						align-items: center
// 		// 						color: $font

// 		// 				.wrapper-column
// 		// 					width: 100%
// 		// 					display: flex
// 		// 					padding: 5px
// 		// 					box-sizing: border-box
// 		// 					flex-direction: column
// 		// 					justify-content: flex-start
// 		// 					align-items: flex-start
// 		// 					background-color: $w

// 		// 					span
// 		// 						text-align: left

// 		// 				.ticket
// 		// 					width: 100%
// 		// 					display: flex
// 		// 					flex-direction: column
// 		// 					align-items: flex-start
// 		// 					border-radius: 5px
// 		// 					color: $font
// 		// 					padding: 10px
// 		// 					box-sizing: border-box
// 							// border: 1px solid $light

// .form-create
// 	margin-top: 10px
// 	width: 100%
// 	padding: 5px
// 	box-sizing: border-box 
// 	background-color: $w
// 	display: flex
// 	flex-direction: column
// 	justify-content: space-evenly
// 	align-items: center

// 	input
// 		margin-bottom: 5px
// 		border: 1px solid $light
// 		border-radius: 3px
// 		outline: none
// 		width: 90%
// 		height: 30px
// 		text-indent: 10px

// 		&[type="submit"]
// 			width: 30%
// 			background-color: $font
// 			color: white
// 			cursor: pointer


// .btn
// 	padding: 5px
// 	box-sizing: border-box
// 	border: none
// 	outline: none
// 	cursor: pointer

// 	&-new
// 		background-color: $w
// 		border: 2px solid $font
// 		border-radius: 5px
// 		align-self: flex-end

// .purchase
// 	border: 1px solid $light
// 	border-radius: 3px
// 	color: $font

// .divider-horizontal
// 	width: 100%
// 	border: 1px solid $light
</style>