export const getDayFromDateString = (dateString: string): string => {
  const date = new Date(dateString)
  date.setHours(0, 0, 0, 0) // normalize to the start of the day

  const today = new Date()
  today.setHours(0, 0, 0, 0) // normalize to the start of the day

  // Calculate difference in days
  const diffInDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  switch (diffInDays) {
    case 0:
      return 'hoje'
    case 1:
      return 'amanhã'
    case -1:
      return 'ontem'
    case -2:
      return 'anteontem'
    default:
      return date.toLocaleDateString()
  }
}
