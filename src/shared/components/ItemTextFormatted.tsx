import { URL_REGEX } from '@/consts'
import DOMPurify from 'dompurify'

export default function FormattedItemText(itemText: string | undefined) {
  if (!itemText) return ''
  // this regex is getting </p> tag. remove it
  const pTagRegex = /<\/p>/gi
  const itemTextWithoutPTag = itemText.replace(pTagRegex, '')

  // TODO: limit links only to items and not list names

  let htmlWithLinks = itemTextWithoutPTag.replace(URL_REGEX, '<a class="default-link" href="$1">$1</a>')

  // Replace <strong> with <b>
  htmlWithLinks = htmlWithLinks.replace(/<strong>/g, '<b style="font-weight: 700;">').replace(/<\/strong>/g, '</b>')

  // sanitize the html string
  const sanitizedHTML = DOMPurify.sanitize(htmlWithLinks)

  return (
    <div
      className="text-sm dark:text-darkTextLight md:text-base"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  )
}
