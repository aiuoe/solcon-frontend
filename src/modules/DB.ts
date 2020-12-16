import Dexie from 'dexie'

class DataBase extends Dexie
{
	companies: any
	me: any

	constructor()
	{
		super('solcon')
		
		this.version(1).stores({
			companies: '++lid,id,name,rif,fyc',
			me: '++lid,id,name,lastname,email'
		})

		this.companies = this.table('companies')
		this.me = this.table('me')
	}
}

export const DB = new DataBase()