interface Array<T>
{
	delete(id: number): void
	orderBy(params: any): void
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
					this.sort((a, b) => (b[key] < a[key])? 1 : -1 )
				else if (v == 'asc')
					this.sort((a, b) => (b[key] > a[key])? 1 : -1 )
			}
		})
	})
}