<template lang="pug">
	header
		.me.evenly-center
			.profile.center
				span {{ letter }}
			.name
				span {{ name }}
		nav.header

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	name: 'Header',
})
export default class Header extends Vue {
	letter: string = 'R'
	name: string = 'Rubén Cortez'
}
</script>

<style lang="sass" scoped>
header
	width: 100vw
	height: 70px
	background-color: var(--contrast)
	display: flex
	justify-content: flex-end

.me
	width: 170px
	height: 70px
	background-image: linear-gradient(to right, #4E5366, #9497A3)

	.profile
		width: 50px
		height: 50px
		border-radius: 50%
		background-color: var(--primary)

	.name

		span
			color: var(--font)

.header
	width: calc(100vw - 170px)
	height: 70px
	background-color: var(--contrast)
	box-shadow: var(--shadow)

</style>