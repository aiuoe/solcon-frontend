import gql from 'graphql-tag';

export const HAS_COMPANY = gql(` query
{
	me
	{
		companies(first: 1)
		{
			data
			{
				id
			}
		}
	}
}`)