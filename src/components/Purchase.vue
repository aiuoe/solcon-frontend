<template lang="pug">
	.container
		Header
		Nav
		main.main.evenly-center

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/components/partials/Nav.vue';
import Header from '@/components/partials/Header.vue';
import Loader from '@/components/partials/Loader.vue';
import { capitalize, upperCase } from '@/modules/Filter'
import '@/modules/Array'

@Component({
	name: 'Purchase',
	components: { Header, Nav, Loader },
	filters: {
	  capitalize: capitalize,
	  toUpperCase: upperCase
	}
})
export default class Purchase extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>