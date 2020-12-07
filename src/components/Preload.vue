<template lang="pug">
	.component-container.center
		Loader
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loader from '@/components/partials/Loader.vue';
import { HAS_COMPANY } from '@/graphql/queries/company'
import { capitalize, upperCase } from '@/modules/Filter'
import { mapActions } from 'vuex'
import '@/modules/Array'

@Component({
	name: 'Preload',
	components: { Loader },
	filters: {capitalize: capitalize, upperCase: upperCase},
	methods:
	{
		...mapActions(['roleSet', 'companyIDSet'])
	}
})
export default class Preload extends Vue {

	roleSet!: (value: boolean) => any
	companyIDSet!: (value: number | null) => any

	async created()
	{
		if (window.localStorage.getItem('token') != null)
			await this.roleSet((JSON.parse(decodeURIComponent(atob(window.localStorage.getItem('token')!.split('.')[1]).split('').join(''))).role == 'admin')? true : false)
		else
		{
			window.localStorage.removeItem('token')
			this.$router.push({ path: 'login' }) 
		}

		await this.$apollo.query({query: HAS_COMPANY})
		.then(res => {
			if (res.data.me.companies.data.length)
			{
				this.companyIDSet(res.data.me.companies.data.first().id)
				this.$router.push({ path: 'inicio' })
			}
			else
				this.$router.push({ path: 'empresa' })

		})
	}

	async create()
	{

	}

	async update()
	{

	}

	async destroy(id: number)
	{

	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.component-container
	width: 100vw
	height: 100vh
</style>