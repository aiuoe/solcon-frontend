import gql from 'graphql-tag';

export const TICKET_COMMENTS = gql(`query
params($id: ID!)
{
ticket(id: $id)
{
  id
  comments
  {
    id
    message
    created_at
    user_id
    {
      id
      name
      role
      lastname
    }
    ticket_id
    {
      id
      title
      message
    }
  }
}
}`)

export const COMMENT_UPSERT = gql(`
mutation($id: ID, $ticket_id: ID!, $message: String!)
{
commentUpsert(id: $id, ticket_id: $ticket_id, message: $message)
{
  id
  message
  created_at
  user_id
  {
    id
    name
    role
    lastname
  }
  ticket_id
  {
    id
    title
    message
  }
}}`)

export const COMMENT_DELETE = gql(`
mutation($id: ID!)
{
	commentDelete(id: $id)
	{
		id
	}
}`)