export const getFromStorage = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const setToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
