export const getDayFromDateString = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()

  if (date.toDateString() === today.toDateString()) {
    return 'hoje'
  }

  today.setDate(today.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'ontem'
  }

  today.setDate(today.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'anteontem'
  }

  return new Date(dateString).toLocaleDateString()
}
