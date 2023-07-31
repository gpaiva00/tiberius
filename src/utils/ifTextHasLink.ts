import { URL_REGEX } from '@/constants'

export const ifTextHasLink = (text: string) => {
  return text.match(URL_REGEX)
}
