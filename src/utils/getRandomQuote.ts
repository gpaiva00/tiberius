import { QUOTES } from '@/consts'

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * QUOTES.length)
  return QUOTES[randomIndex]
}
