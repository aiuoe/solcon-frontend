export const $ = function(selector: string): any
{
	return document.querySelector<HTMLElement>(selector)!
}