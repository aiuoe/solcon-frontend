<template lang="pug">
	header.header
		nav.nav
			.spacer
			.notify.evenly-center
				a(class="link")
					i(class="far fa-moon fa-h")
				a(class="link")
					i(class="far fa-bell fa-h")
			.profile.center
				.photo.center
					span R


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
.header
	width: calc(100vw - 170px)
	height: 70px
	position: fixed
	background-color: var(--contrast)

	.nav
		width: 100%
		height: 100%
		display: flex
		align-items: center

		.spacer
			width: 80%

		.notify
			width: 10%
			height: 100%

			a
				.fa
					font-size: 25px

		.profile
			width: 10%
			height: 100%
			align-self: flex-end

			.photo
				width: 50px
				height: 50px
				border-radius: 50%
				background-color: var(--background)
</style>