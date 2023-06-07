export const getInputLength = (inputValue: string) => {
  const stripped = inputValue.replace(/<[^>]*>?/gm, '').trim()
  return stripped.length
}
