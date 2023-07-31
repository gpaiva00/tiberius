export default function isTextInputEmpty(inputValue: string) {
  const stripped = inputValue.replace(/<[^>]*>?/gm, '').trim()
  return !stripped.length
}
