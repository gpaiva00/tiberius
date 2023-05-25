import DOMPurify from 'dompurify'

export const formattedItemText = (itemText: string) => {
  const urlRegex = /(https?:\/\/[^\s$.?#].[^\s]*)/gi
  let htmlWithLinks = itemText.replace(urlRegex, '<a class="default-link" href="$1">$1</a> ')

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
