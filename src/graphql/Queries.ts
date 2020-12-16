import gql from 'graphql-tag';

export const GET_ALL_CUSTOMERS = gql(`query 
paginator($page: Int!)
{ 
 users(first: 20, page: $page)
 {
   data
   {
     id
     name
     lastname
     email
     sex
     dni
     rif
     Ncompanies
     Ntickets
     created_at
   }
  paginatorInfo
  {
    total
    hasMorePages
  }
 }
}`)

export const ACCOUNTS = gql(`query 
company_find($id: ID!)
{
  company(id: $id)
  { 
    id
    accounts(first: 10)
    {
      data
      {
        id
        name
        description
      }
    }
  }
}`)

export const CURRENCIES = gql(`query
{ 
  currencies
  {
    data
    {
      id
      name
      abbreviation
    }
  }
}`)