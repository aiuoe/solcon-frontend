import gql from 'graphql-tag';

export const TICKET_CREATE = gql(`
	mutation()
	{
		updateUser(id: $uID, input: 
		{
			tickets:
			{
				create:
				{
					title: $title,
					message: $message,
					private: $private,
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
				private
				priority
				status
				pinned
				channel
			}
		}
	}
`)