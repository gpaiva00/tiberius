export const getRandomQuote = (quotes: string[]): string => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}
