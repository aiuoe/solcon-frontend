interface Array<T>
{
	upsert(item: any): void
	delete(id: number): void
	orderBy(params: any): void
	where(key: string, operator: string, value: string): any
	get(id: number): any
}

Array.prototype.upsert = function (item: any) {
	if (this[this.indexOf(this.find((i: any) => i.id == item.id))])
		this[this.indexOf(this.find((i: any) => i.id == item.id))] = item
	else
		this.push(item) 
}

Array.prototype.delete = function (id: number): void
{
	this.splice(this.indexOf( this.find( (item: any) => item.id == id ) ), 1)
}

Array.prototype.orderBy = function (params: any): void
{
	Object.entries(params).map((p: any) => {
		const [key, value] = p

		if (value == 'asc')
			this.sort((a, b) => (b[key] < a[key])? 1 : -1)
		else if (value == 'desc')
			this.sort((a, b) => (b[key] > a[key])? 1 : -1)
	})
}

Array.prototype.where = function (key: string, operator: string, value: string)
{
	switch(operator)
	{
		case '==':
			return this.filter((i: any) => i[key] == value)
		break
		case '!=':
			return this.filter((i: any) => i[key] != value)
		break
		case '>=':
			return this.filter((i: any) => i[key] >= value)
		break
		case '<=':
			return this.filter((i: any) => i[key] <= value)
		break
    case '<':
      return this.filter((i: any) => i[key] < value)
    break
    case '>':
      return this.filter((i: any) => i[key] > value)
    break
	}
}

Array.prototype.get = function (id: number): any
{
	return this[this.indexOf(this.find((i: any) => i.id == id))]
}