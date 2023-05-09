type InputTextProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function InputText({ placeholder, onChange, onKeyDown, value }: InputTextProps) {
  return (
    <input
      type="text"
      className="h-inputText w-inputText py-4 px-2 border-default rounded-sm outline-none font-light bg-lightGray  "
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      autoFocus
    />
  )
}
