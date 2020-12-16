import gql from 'graphql-tag';

export const ACCOUNT_CREATE = gql(`
mutation ($type: TYPE_ACCOUNT!, $name: String!, $description: String!, $parent_id: ID, $currency_id: ID!, $company_id: ID!)
{
  accountCreate (input: {
    company_id: $company_id,
    parent_id: $parent_id,
    currency_id: $currency_id,
    type: $type,
    name: $name,
    description: $description
  })
  {
    id
    name
    description
    type
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
	} 
}`)