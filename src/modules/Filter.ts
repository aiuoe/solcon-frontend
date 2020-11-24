export function capitalize (value: any)
{
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function upperCase(value: any)
{
	if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
}