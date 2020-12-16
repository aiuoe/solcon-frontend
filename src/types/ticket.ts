export interface TICKET_TYPE
{
	title: string
	message: string
	channel: string
	pinned: boolean
	priority: boolean
	pubic: boolean
	status: boolean
	due_date?: Date
}