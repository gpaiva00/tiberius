import EmojiPicker, { EmojiClickData, SkinTones } from 'emoji-picker-react'
import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'

import { Smiley } from '@phosphor-icons/react'

interface InputTextWithFormattingProps {
  inputTextValue: string
  setInputTextValue: (value: string) => void
  handleSubmit: () => void
  handleBlur?: () => void
  placeholder?: string
  formats?: string[]
  disabled?: boolean
}

interface QuillToolbarProps {
  handleTriggerEmojiPicker: () => void
  formats: string[]
}

const QuillToolbar = ({ handleTriggerEmojiPicker, formats }: QuillToolbarProps) => (
  <div id="toolbar">
    {formats.includes('bold') && <button className="ql-bold"></button>}
    {formats.includes('italic') && <button className="ql-italic"></button>}
    <button
      className="ql-emoji dark:text-lightenGray"
      onClick={handleTriggerEmojiPicker}
    >
      <Smiley />
    </button>
  </div>
)

export default function InputTextWithFormatting({
  inputTextValue,
  setInputTextValue,
  handleSubmit,
  handleBlur,
  placeholder,
  formats = ['bold', 'italic'],
  disabled = false,
}: InputTextWithFormattingProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  const quillRef = useRef<ReactQuill>(null)

  const handleTriggerEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker)

  const handleAddEmojiToInputText = (emojiData: EmojiClickData) => {
    const cursorPosition = quillRef?.current?.getEditor().getSelection()?.index
    quillRef?.current?.getEditor().insertText(cursorPosition ?? 0, emojiData.emoji)
    handleTriggerEmojiPicker()
  }

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.metaKey) {
      handleSubmit()
    }
  }

  return (
    <>
      {showEmojiPicker && (
        <EmojiPicker
          defaultSkinTone={SkinTones.NEUTRAL}
          onEmojiClick={handleAddEmojiToInputText}
          skinTonesDisabled
          previewConfig={{
            showPreview: false,
          }}
          autoFocusSearch={false}
        />
      )}
      <div className="text-editor w-full">
        <QuillToolbar
          handleTriggerEmojiPicker={handleTriggerEmojiPicker}
          formats={formats}
        />
        <ReactQuill
          ref={quillRef}
          placeholder={placeholder}
          onChange={setInputTextValue}
          onBlur={handleBlur}
          onKeyDown={handleOnKeyPress}
          value={inputTextValue}
          className="max-h-96w"
          modules={{
            toolbar: ['bold', 'italic'],
          }}
          formats={formats}
          readOnly={disabled}
        />
      </div>
    </>
  )
}
