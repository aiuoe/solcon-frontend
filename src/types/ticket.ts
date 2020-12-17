export interface TICKET_TYPE
{
	id?: number
	title: string
	message: string
	channel: string
	pinned: boolean
	priority: boolean
	public: boolean
	status: boolean
	created_at?: Date
	updated_at?: Date
}