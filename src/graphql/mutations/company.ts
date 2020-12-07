import gql from 'graphql-tag';

export const COMPANY_CREATE = gql(`
mutation($name: String!, $rif: String!, $fyc: Date!)
{
  companyCreate(
    name: $name,
    rif: $rif,
    fyc: $fyc
  )
  {
    id
    name
    rif
    fyc
  }
}`)