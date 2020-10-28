<template lang="pug">
	.wrapper-100
		.grid
			.circle-1
			.circle-2
			.circle-3
			.circle-4
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	name: 'Loader'
})
export default class Loader extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
	$size: 20px
	$radius: 100%

.wrapper-100
	width: 100%
	height: 100%
	display: flex
	justify-content: center
	align-items: center
	position: absolute
	background-color: var(--p)

	.grid
		width: 100px
		height: 100px
		display: flex
		justify-content: center
		align-items: center
		position: relative
		animation: rotation 1s infinite

		// display: grid
		// grid-template-columns: repeat(2, 20px)
		// grid-template-rows: repeat(2, 20px)
		// justify-content: center
		// align-content: center


		.circle-1
			width: $size
			height: $size
			border-radius: $radius
			background-color: var(--warning)
			position: absolute

		.circle-2
			width: $size
			height: $size
			border-radius: $radius
			background-color: var(--success)
			position: absolute

		.circle-3
			width: $size
			height: $size
			border-radius: $radius
			background-color: var(--danger)
			position: absolute

		.circle-4
			width: $size
			height: $size
			border-radius: $radius
			background-color: var(--info)
			position: absolute

@keyframes rotation
	from
		transform: rotate(0deg)
	to
		transform: rotate(360deg) 

@for $i from 1 through 4
	$a: 0px
	$b: 0px
	.circle-#{$i}
		animation: translation-#{$i} 1s infinite

		@if $i==1
			$a: 20px
			$b: 20px
		@else if $i==2
			$a: -20px
			$b: -20px
		@else if $i==3
			$a: -20px
			$b: 20px
		@else if $i==4
			$a: 20px
			$b: -20px

	@keyframes translation-#{$i}
		0%
			transform: translate(0, 0) 
		25%
			transform: translate($a, $b) 
		50%
			transform: translate($a, $a) 
		75%
			transform: translate($b, $a) 

</style>