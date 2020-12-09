import Dexie from 'dexie'

class DataBase extends Dexie
{
	companies: any
	constructor()
	{
		super('solcon')
		this.version(1).stores({
			companies: '++lid,id,name,rif,fyc'
		})
		this.companies = this.table('companies')
	}
}

export const DB = new DataBase()