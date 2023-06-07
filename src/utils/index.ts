import { copyToClipboard } from '@/utils/copyToClipboard'
import { getDayFromDateString } from '@/utils/getDayFromDateString'
import { getInputLength } from '@/utils/getInputLength'
import { getRandomQuote } from '@/utils/getRandomQuote'
import { ifTextHasLink } from '@/utils/ifTextHasLink'
import { sortListsByPosition } from '@/utils/sortListsByPosition'
import { sortTasksByStatus } from '@/utils/sortTasksByStatus'
import { getFromStorage, setToStorage } from '@/utils/storage'

export {
  getDayFromDateString,
  getRandomQuote,
  sortTasksByStatus,
  sortListsByPosition,
  setToStorage,
  getFromStorage,
  copyToClipboard,
  ifTextHasLink,
  getInputLength,
}
