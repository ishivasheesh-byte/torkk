export function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function isValidEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value)
}
