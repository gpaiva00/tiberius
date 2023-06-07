import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface InputTextWithFormattingProps {
  inputTextValue: string
  setInputTextValue: (value: string) => void
  handleBlur?: () => void
  placeholder?: string
  formats?: string[]
  disabled?: boolean
  ref?: React.RefObject<ReactQuill>
  handleOnKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
}

export default function InputTextWithFormatting({
  inputTextValue,
  setInputTextValue,
  handleBlur,
  placeholder,
  disabled = false,
  ref,
  handleOnKeyDown,
}: InputTextWithFormattingProps) {
  return (
    <div className="text-editor">
      <ReactQuill
        ref={ref}
        placeholder={placeholder}
        onChange={setInputTextValue}
        onBlur={handleBlur}
        onKeyDown={handleOnKeyDown}
        value={inputTextValue}
        preserveWhitespace
        modules={{
          toolbar: [['bold', 'italic', 'underline', 'strike']],
        }}
        formats={['bold', 'italic', 'underline', 'strike']}
        readOnly={disabled}
      />
    </div>
  )
}
