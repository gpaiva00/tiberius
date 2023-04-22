import classNames from "classnames"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string
  icon?: React.ReactNode
}

export default function Button({ text, icon, ...props }: ButtonProps) {

  return (
    <button
      className={'py-2 px-5 bg-primary rounded-default text-white text-lg hover:bg-black hover:text-lightenPrimary transition-colors'}
      {...props}
    >
      {text}
    </button>
  )
}