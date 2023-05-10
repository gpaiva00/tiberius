type InputTextProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function InputText({ placeholder, onChange, onKeyDown, value }: InputTextProps) {
  return (
    <input
      type="text"
      className="h-inputText w-inputText rounded-sm border-default bg-lightGray px-2 py-4 font-light outline-none  "
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      autoFocus
    />
  )
}
