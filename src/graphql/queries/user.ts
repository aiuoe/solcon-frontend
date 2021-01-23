import gql from 'graphql-tag';

export const USER_TICKETS = gql(`query
params($id: ID!)
{
	user(id: $id)
	{
		tickets
		{
			id
			title
			message
			pinned
			public
			priority
			status
			channel
			due_date
			created_at
			updated_at
			Ncomments
		}
	}
}`)