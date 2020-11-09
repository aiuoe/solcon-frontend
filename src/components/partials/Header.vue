<template lang="pug">
	header.header

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
	background-color: var(--contrast)
	box-shadow: var(--shadow)

</style>