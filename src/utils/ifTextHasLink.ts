import { URL_REGEX } from '@/consts'

export const ifTextHasLink = (text: string) => {
  return text.match(URL_REGEX)
}
