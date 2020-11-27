import gql from 'graphql-tag';

export const TICKET_CREATE = gql(`
mutation($connect: ID, $title: String!, $message: String!, $pinned: Boolean!, $public: Boolean!, $priority: Boolean!, $status: Boolean!, $channel: String!)
{
	createTicket(connect: $connect, input: 
	{
	  title: $title,
	  message: $message,
	  pinned: $pinned,
	  public: $public,
	  priority: $priority,
	  status: $status,
	  channel: $channel
	})
	{
	  id
		title
		message
		channel
		public
		priority
		pinned
		status
	}
}`)

export const DELETE_TICKET = gql(`
mutation($id: ID!)
{
	deleteTicket(id: $id)
	{
		id
	}
}`)

export const ACCOUNT_CREATE = gql(`
mutation ($type_id: ID!, $name: String!, $description: String!, $parent_id: ID)
{
  accountCreate (input: {
    parent_id: $parent_id,
    type_id: $type_id,
    name: $name,
    description: $description
  })
  {
    id
    name
    description
    type_id
    {
    	id
    	name
    }
    parent_id
  }
}`)

export const ACCOUNT_UPDATE = gql(`
mutation($id: ID!, $name: String!, $description: String! $type_id: ID!, $parent_id: ID)
{
  accountUpdate(input: {
    id: $id,
    name: $name,
    description: $description,
    type_id: $type_id,    
    parent_id: $parent_id
  })
  {
    id
    name
    description
    type_id
    {
    	id
    	name
    }
    parent_id
  }
}`)

export const ACCOUNT_DELETE = gql(`
mutation($id: ID!)
{ accountDelete(id: $id)
	{ 
		id 
		name 
		description 
		parent_id 
		type_id 
		{ 
			id 
			name 
		} 
	} 
}`)