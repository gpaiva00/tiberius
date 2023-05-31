export const getGreetings = () => {
  const date = new Date()
  const hour = date.getHours()

  if (hour >= 6 && hour < 12) {
    return 'Bom dia'
  } else if (hour >= 12 && hour < 18) {
    return 'Boa tarde'
  } else {
    return 'Boa noite'
  }
}
