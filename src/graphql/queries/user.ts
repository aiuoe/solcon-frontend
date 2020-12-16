import gql from 'graphql-tag';

export const USER_TICKETS = gql(`query
params($id: ID!, $page: Int!)
{
	user(id: $id)
	{
		tickets(first: 20, page: $page)
		{
			data
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
			}
		}
	}
}`)