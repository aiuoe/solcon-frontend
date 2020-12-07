interface HTMLElement
{
	css(styles: object): void
}

HTMLElement.prototype.css = function (styles: object): void
{
	Object.entries(styles).map((s: any) => {
		const [key, value] = s
		this.style[key] = value
	})
}