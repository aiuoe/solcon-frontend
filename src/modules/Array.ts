interface Array<T>
{
	search(id: number): any[]
	update(id: number, value: any): void
	delete(id: number): void
	orderBy(params: any): void
	first(): any
	upsert(item: any): void
}

interface String
{
	isString(): boolean
}

interface Date
{
	valid(): boolean
}

Date.prototype.valid = function (): boolean
{
	return !isNaN(this.getTime())
}

Array.prototype.upsert = function (item: any) {
	if (this[this.indexOf(this.find((i: any) => i.id == item.id))])
		this[this.indexOf(this.find((i: any) => i.id == item.id))] = item
	else
		this.push(item) 
}

Array.prototype.first = function (): any
{
	return this[0]
}

Array.prototype.search = function (id: number): any[]
{
	return this[this.indexOf(this.find((i: any) => i.id == id))]
}

Array.prototype.update = function (id: number, value: any): void
{
	this[this.indexOf(this.find((i: any) => i.id == id))] = value
}

Array.prototype.delete = function (id: number): void
{
	this.splice(this.indexOf( this.find( (item: any) => item.id == id ) ), 1)
}

Array.prototype.orderBy = function (params: any): void
{
	Object.entries(params).map((p: any) => {
		const [key, value] = p
		Object.entries(value).map((val: any) => {
			const [k, v] = val
			if (k == 'order')
			{
				if (v == 'desc')
					this.sort((a, b): any => {
						if (typeof b[key] === 'string' && !new Date(a[key]).valid())
							return (b[key][0].toLowerCase() < a[key][0].toLowerCase())? 1 : -1;
						else
							(b[key] < a[key])? 1 : -1;
					})
				else if (v == 'asc')
					this.sort((a, b):any => {
						(b[key] > a[key])? 1 : -1 
					})
			}
		})
	})
}