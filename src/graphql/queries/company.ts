import gql from 'graphql-tag';

export const COMPANIES = gql(` query
{
	me
	{
		companies
		{
			id
			name
			rif
			fyc
		}
	}
}`)