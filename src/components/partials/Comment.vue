<template lang="pug">
.messages.w100per-h100per-column
	.section
		a(class="link start-center" @click="$emit('update:commentToggle', false)")
			i(class="fa fa-chevron-left")
	ul(class="list-column list-comment p-7" id="list")
		li(class="item p-7" v-for="c in comments")
			div(v-if="c.user_id.role == 'admin'" class="end-center")
				span.p-7.comment {{ c.message }}
				a(@click="edit(c.id)")
					i(class="fa fa-edit")
				a(@click="destroy(c.id)")
					i(class="fa fa-trash")
			div(v-if="c.user_id.role == 'staff'" class="end-center")
				span.p-7.comment {{ c.message }}
			div(v-if="c.user_id.role == 'user'" class="start-center")
				a(@click="popper = !popper")
					i(class="fa fa-ellipsis-h")
				span.p-7.comment {{ c.message }}
			div(v-if="c.user_id.role == 'customer'" class="start-center")
				span.p-7.comment {{ c.message }}

	form(@submit.prevent="upsert" class="form center")
		input(v-model="comment.message" class="input" type="text" placeholder="Escribe tu comentario")
		button(class="center link" type="submit")
			i(class="fa fa-paper-plane")

	</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { TICKET_COMMENTS, COMMENT_UPSERT, COMMENT_DELETE } from '@/graphql/comments'
import { $ } from '@/modules/Selector'
import '@/modules/Array'
import '@/modules/Dom'

@Component({
	name: 'Comment'
})
export default class Comment extends Vue {

	@Prop() ticketId: any
	comments: any = {}
	comment: any = {
		id: 0,
		message: ''
	}

	async created()
	{
		this.$apollo.query({query: TICKET_COMMENTS, variables: {id: this.ticketId}})
		.then(res => {
			this.comments = res.data.ticket.comments
		})
	}

	async updated()
	{
		$('.list-comment').scrollTop = $('.list-comment').scrollHeight
	}

	edit(id: number)
	{
		this.comment = this.comments.search(id)
	}

	async upsert()
	{
		await this.$apollo.mutate({mutation: COMMENT_UPSERT, variables: {id: this.comment.id, ticket_id: this.ticketId, message: this.comment.message}})
		.then(res => {
			if (this.comment.id)
				this.comments.update(this.comment.id, res.data.commentUpsert)
			else
				this.comments.push(res.data.commentUpsert)
			this.comment.id = 0
			this.comment.message = ''
		})
	}

	async destroy(id: number)
	{
		return await this.$apollo.mutate({mutation: COMMENT_DELETE, variables: {id: id}})
		.then(res => { this.comments.delete(id) })
	}
}
</script>

<style lang="sass" scoped>
.section
	height: 10%
	width: 100%

	.link
		width: 100%
		height: 30px
		background-color: var(--contrast)
		border: 0px
		border-radius: 0px

.list-column
	height: 83%

.item
	height: auto

.comment
	width: 50%
	height: auto
	background-color: var(--background)
	word-wrap: break-word
	word-break: break-all
	overflow: hidden

.form
	width: 100%
	height: 8%
	padding: 0px
	overflow: hidden

.input
	width: 85%
	height: 85%
	margin: 0px
	border-right: 0px
	border-top-right-radius: 0px
	border-bottom-right-radius: 0px

.link 
	background-color: var(--contrast)
	border: 0px
	width: 15%
	height: 95%
	font-size: 20px
	outline: none
	border: 2px solid var(--background)
	border-left: 0px
	border-top-right-radius: 7px
	border-bottom-right-radius: 7px
</style>