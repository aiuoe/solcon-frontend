<template lang="pug">
//- create
form(class="form-column" v-if="add" @submit.prevent="create")
	.start-center-column.head.p-7.m-b-7
		h3.title.p-7 Crear Empresa
		hr.divider-column
	.wizard
		div.steps
			.center-column
				div(class="circle center" id="circleOne")
					span 1
				span(class="desc") Nombre
			div(class="divider" id="dividerOne")
			.center-column
				div(class="circle center" id="circleTwo")
					span 2
				span(class="desc") Registro
			div(class="divider" id="dividerTwo")
			.center-column
				div(:class="['circle', 'center', {'circle-success': vthree}]")
					span 3
				span(class="desc") Cierre

	div.tab.center(v-if="one")
		input(v-model="company.name" class="input" type="text" placeholder="Nombre de la empresa" required)
	div.tab.center(v-if="two")
		input(v-model="company.rif" class="input" type="text" placeholder="Registro fiscal de la empresa")
	div.tab.center(v-if="three")
		input(v-model="company.fyc" class="input" type="date")

	.controls.between-center.p-7
		a(class="control evenly-center p-7" v-opacity="!one" @click="prev")
			i(class="fa fa-chevron-left")  
			span Anterior
		
		input(class="control p-7" type="submit" value="Crear" v-show="three")

		a(class="control evenly-center p-7" @click="next" v-show="!three") 
			span Siguiente
			i(class="fa fa-chevron-right") 

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex'
import Loader from '@/components/partials/Loader.vue';
import { COMPANY_CREATE } from '@/graphql/mutations/company'
import { capitalize, upperCase } from '@/modules/Filter'
import { COMPANY_TYPE } from '@/types/company'
import { $ } from '@/modules/Selector'
import '@/modules/Array'
import '@/modules/Dom'

@Component({
	name: 'CompanyUpsert',
	components: { Loader },
	filters: {capitalize: capitalize, upperCase: upperCase},
	computed:
	{
		...mapState(['company_id'])
	},
	methods:
	{
		...mapActions(['companyIDSet'])
	}
})
export default class CompanyUpsert extends Vue {

	companyIDSet!: (value: boolean) => any
	vone: boolean = false
	vtwo: boolean = false
	vthree: boolean = false
	one: boolean = true
	two: boolean = false
	three: boolean = false
	add: boolean = true
	company: COMPANY_TYPE = {
		name: '',
		rif: '',
		fyc: ''
	}

	async created()
	{

	}

	next()
	{
		if(this.one)
		{
			if (this.company.name.length)
			{
				this.one = false
				this.two = true
				this.three = false
				this.vone = true
				$('.input')
				.css({borderColor: getComputedStyle(document.documentElement).getPropertyValue('--background')})
				$('#circleOne')
				.css({boxShadow: '0px 0px 3px 5px rgba(52, 168, 83, .7)'})
				$('#dividerOne')
				.css({backgroundColor: 'rgba(52, 168, 83, .7)'})
			}
			else
			{
				this.vone = false
				$('#circleOne')
				.css({boxShadow: '0px 0px 3px 5px rgba(234, 67, 53, .7)'})
				$('.input').css({borderColor: '#EA4335'})
				$('#dividerOne')
				.css({backgroundColor: 'rgba(234, 67, 53, .7)'})
			}
		}
		else
		{
			if (this.company.rif.length >= 5)
			{
				this.two = false
				this.three = true
				this.one = false
				this.vtwo = true
				$('.input')
				.css({borderColor: getComputedStyle(document.documentElement).getPropertyValue('--background')})
				$('#circleTwo')
				.css({boxShadow: '0px 0px 3px 5px rgba(52, 168, 83, .7)'})
				$('#dividerTwo')
				.css({backgroundColor: 'rgba(52, 168, 83, .7)'})
			}
			else
			{
				this.vtwo = false
				$('#circleTwo')
				.css({boxShadow: '0px 0px 3px 5px rgba(234, 67, 53, .7)'})
				$('.input')
				.css({borderColor: '#EA4335'})
				$('#dividerTwo')
				.css({backgroundColor: 'rgba(234, 67, 53, .7)'})
			}
		}
	}

	prev()
	{
		if(this.two)
		{
			this.two = false
			this.one = true
			this.three = false
			$('.input')
			.css({borderColor: getComputedStyle(document.documentElement).getPropertyValue('--background')})
			$('#circleTwo')
			.css({boxShadow: `0px 0px 3px 5px ${getComputedStyle(document.documentElement).getPropertyValue('--background')}`})
			$('#dividerTwo')
			.css({backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background')})
		}
		else if (this.three)
		{
			this.three = false
			this.two = true
			this.one = false
		}
	}

	async create()
	{
		await this.$apollo.mutate({mutation: COMPANY_CREATE, variables: {
			name: this.company.name,
			rif: this.company.rif,
			fyc: this.company.fyc
		}})
		.then(res => 
		{
			this.companyIDSet(res.data.companyCreate.id)
			this.$router.push({path: 'inicio'})
		})
		.catch(err => 
		{
			window.localStorage.remove('token')
			this.$router.push({path: 'login'})
		})
	}

	async update()
	{

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.form-column
	width: 100%
	min-height: 100%

.head
	width: 100%

	.title
		width: 100%
		align-self: flex-start
		color: var(--font)
		margin-bottom: 0px

	.divider-column
		border: 0px
		width: calc(100% - 14px)
		height: 2px
		background-color: var(--background)
		margin: 0px 7px
		box-sizing:	border-box	

.wizard
	width: 95%
	height: 150px

	.steps
		width: 100%
		height: 100%
		display: grid
		grid-template-columns: 70px auto 70px auto 70px
		justify-items: center
		align-content: center

		.circle
			width: 70px
			height: 70px
			border-radius: 50%
			background-color: var(--contrast)
			margin-bottom: 14px
			box-shadow: 0px 0px 3px 5px var(--background)

			&-success
				box-shadow: 0px 0px 3px 5px rgba(52, 168, 83, .7)

			span
				color: var(--font)
				font-size: 50px

		.divider
			width: 100%
			height: 3px
			background-color: var(--background)
			align-self: center
			margin-bottom: 14px

		.desc
			color: var(--font)
.tab
	width: 100%

	.input
		width: 70%
		height: 40px

.controls
	width: 100%
	height: 50px

	.control
		background-color: var(--contrast)
		cursor: pointer
		width: 100px
		// box-shadow: var(--shadow)
		border: 2px solid var(--background)
		border-radius: 7px
		font-size: 17px
		color: var(--font)

@media screen and (min-width: 576px)
	.wizard
		width: 70%
</style>