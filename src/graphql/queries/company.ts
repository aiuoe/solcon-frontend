import gql from 'graphql-tag';

export const COMPANIES = gql(` query
{
	me
	{
		id
		companies
		{
			id
			name
			rif
			fyc
		}
	}
}`)