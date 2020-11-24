<template lang="pug">
	.container
		Header
		Nav(bank="true")
		main.main.evenly-center

			.graphs.center-between-column
				.graph.box
				.graph.box

			.content.box.center-between-column.p-7
				Account
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import Header from '@/components/partials/Header.vue';
import Account from '@/components/partials/Account.vue';
import Loader from '@/components/partials/Loader.vue';

@Component({
	name: 'Bank',
	components: { Header, Nav, Account, Loader },
})
export default class Bank extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.graphs
	width: 30%
	height: 100%

	.graph
		width: 100%
		height: 49.5%

.content
	width: 65%
	height: 100%

</style>