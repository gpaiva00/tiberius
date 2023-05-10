import { ReactNode } from "react"

const renderTextWithLinks = (itemText: string): ReactNode => {
  const urlPattern = /(https?:\/\/[^\s]+)/g
  const textParts = itemText.split(urlPattern);

  const elements = textParts.map((part, index) => {
    if (part.match(urlPattern)) {
      return (
        <a className="text-primary hover:underline" key={index} href={part} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });

  return <>{elements}</>;
}

interface ItemTextFormattedProps {
  itemText: string
}

export default function ItemTextFormatted({ itemText }: ItemTextFormattedProps) {

  return (
    <span>
      {renderTextWithLinks(itemText)}
    </span>
  )
}
