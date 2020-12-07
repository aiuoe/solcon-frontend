export function decodeJWT (param: string): any
{
	return JSON
		.parse(decodeURIComponent(atob(window.localStorage.getItem('token')!
		.split('.')[1])
		.split('')
		.join('')))[param]
}