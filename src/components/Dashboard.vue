<template lang="pug">
	.container
		Header
		Nav
			
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import Header from '@/components/partials/Header.vue';
import gql from 'graphql-tag'

@Component({
	name: 'Dashboard',
	components: { Header, Nav }
})
export default class Dashboard extends Vue {

	async created ()
	{

	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
