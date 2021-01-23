import gql from 'graphql-tag';

export const TICKET_UPSERT = gql(`
mutation ($id: ID, $users: [ID!], $title: String!, $message: String!, $pinned: Boolean!, $public: Boolean!, $priority: Boolean!, $status: Boolean!, $due_date: Date!)
{
  ticketUpsert(input: {
    id: $id, 
    users: {
      sync: $users
    },
    title: $title,
    message: $message,
    pinned: $pinned,
    public: $public,
    priority: $priority,
    status: $status,
    channel: "web",
    due_date: $due_date
  })
  {
    id
    title
    message
    pinned
    priority
    public
    status
    channel
    created_at
    updated_at
    due_date
    Ncomments
    user_id
    {
      id
    }
  }
}`)

export const TICKET_DELETE = gql(`
mutation($id: ID!)
{
	ticketDelete(id: $id)
	{
		id
	}
}`)