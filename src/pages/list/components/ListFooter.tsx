import { useEffect, useState } from 'react'
import EmojiPicker, { EmojiClickData, EmojiStyle, SkinTones } from 'emoji-picker-react'
import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'

import { Divider, FooterContainer, InputText } from '@/shared/components'
import { Check, Plus, Smiley } from '@phosphor-icons/react'
import { DEFAULT_ICON_PROPS } from '@/consts'

interface ListCardFooterProps {
  handleAddItem: (itemText: string) => void
  editingItemText?: string
  hasEmojiPicker?: boolean
}

export default function Footer({ handleAddItem, editingItemText, hasEmojiPicker = false }: ListCardFooterProps) {
  const [inputTextValue, setInputTextValue] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  const handleAdd = () => {
    setInputTextValue('')
    handleAddItem(inputTextValue)
  }

  const handleInputTextChange = (value: string) => {
    setInputTextValue(value)

    if (!value.length) {
      // cancel editing
    }
  }

  const handleTriggerEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker)

  const handleAddEmojiToInputText = (emoji: EmojiClickData) => {
    setInputTextValue(`${inputTextValue}${emoji.emoji}`)
    handleTriggerEmojiPicker()
  }

  useEffect(() => {
    if (editingItemText?.length) {
      setInputTextValue(editingItemText)
    }
  }, [editingItemText])

  return (
    <div>
      {showEmojiPicker && (
        <EmojiPicker
          defaultSkinTone={SkinTones.NEUTRAL}
          onEmojiClick={handleAddEmojiToInputText}
          skinTonesDisabled
          previewConfig={{
            showPreview: false,
          }}
          emojiStyle={EmojiStyle.APPLE}
          autoFocusSearch={false}
        />
      )}
      <Divider />
      <FooterContainer>
        <div className="flex flex-1 items-center gap-4">
          {hasEmojiPicker && (
            <button
              className="icon-button"
              onClick={handleTriggerEmojiPicker}
            >
              <Smiley {...DEFAULT_ICON_PROPS} />
            </button>
          )}
          <ReactQuill
            placeholder="digite o nome da tarefa"
            onChange={handleInputTextChange}
            value={inputTextValue}
            className="max-h-96 w-full"
            modules={{
              toolbar: [['bold', 'italic']],
            }}
            formats={['header', 'bold', 'italic']}
          />
          <button
            className="icon-button"
            onClick={handleAdd}
            disabled={!inputTextValue.length}
          >
            {editingItemText?.length ? <Check {...DEFAULT_ICON_PROPS} /> : <Plus {...DEFAULT_ICON_PROPS} />}
          </button>
        </div>
      </FooterContainer>
    </div>
  )
}
