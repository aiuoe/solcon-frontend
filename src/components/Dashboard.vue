<template lang="pug">
	.container
		Nav
		main.main.start-start
			h4 Google Design
			p Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium fugiat consectetur distinctio debitis itaque ab iure porro ea a quis. Neque qui rem quisquam praesentium molestiae, velit dolorum commodi tempora, earum itaque libero ullam similique ipsum. Hic aperiam vitae nemo, aliquid iure laboriosam, deserunt porro illum quam, molestiae distinctio! Quidem.
		span lorem ipsu
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

.main
	display: flex
	flex-direction: column


</style>
