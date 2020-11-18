interface Array<T>
{
	delete(id: number): void
	orderBy(params: any): void
}

Array.prototype.delete = function (id: number): void
{
	let index: number = this.indexOf( this.find( (item: any) => item.id == id ) )
		this.splice(index, 1)
}

Array.prototype.orderBy = function (params: any): void
{
	
}
