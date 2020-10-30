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