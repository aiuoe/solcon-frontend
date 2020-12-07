<template lang="pug">
	.component-container.center
		.upsert.box.center
			CompanyUpsert

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex'
import Loader from '@/components/partials/Loader.vue';
import Header from '@/components/partials/Header.vue';
import CompanyUpsert from '@/components/partials/CompanyUpsert.vue';
import Nav from '@/components/partials/Nav.vue';
import { capitalize, upperCase } from '@/modules/Filter'
import { $ } from '@/modules/Selector'
import '@/modules/Array'
import '@/modules/Dom'

@Component({
	name: 'Company',
	components: { Loader, Header, Nav, CompanyUpsert },
	filters: {capitalize: capitalize, upperCase: upperCase},
	computed:
	{
		...mapState(['admin', 'company_id'])
	},
	methods:
	{
		...mapActions(['companyIDSet'])
	}
})
export default class Company extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.component-container
	width: 100vw
	height: 100vh

.upsert
	width: 100%
	height: 100%

@media screen and (min-width: 576px)
	.upsert
		width: 55%
		height: 350px
</style>