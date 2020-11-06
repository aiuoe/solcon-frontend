import gql from 'graphql-tag';

export const TICKET_CREATE = gql(`
	mutation($uID: ID, $title: string, $message: string, $public: boolean, $status: boolean, $pinned: boolean, $priority: boolean, $channel: string)
	{
		updateUser(id: $uID, input: 
		{
			tickets:
			{
				create:
				{
					title: $title,
					message: $message,
					public: $public,
					status: $status,
					pinned: $pinned,
					priority: $priority,
					channel: $channel
				}
			}
		})
		{
			tickets
			{
				title
				message
				public
				priority
				status
				pinned
				channel
			}
		}
	}
`)

export const CREATE_ACCOUNT = gql(`mutation ($type_id: ID!, $name: String!, $description: String!, $parent_id: ID!)
{
  createAccount (input: {
    type_id: $type_id,
    name: $name,
    parent_id: $parent_id,
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

export const DELETE_ACCOUNT = gql(` mutation($id: ID!)
{ deleteAccount(id: $id)
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