import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

import { Divider, FooterContainer, InputTextWithFormatting } from '@/shared/components'
import { Check, Plus } from '@phosphor-icons/react'
import { DEFAULT_ICON_PROPS } from '@/consts'

interface ListCardFooterProps {
  handleAddItem: (itemText: string) => void
  editingItemText?: string
}

export default function Footer({ handleAddItem, editingItemText }: ListCardFooterProps) {
  const [inputTextValue, setInputTextValue] = useState<string>('')

  const isTextInputEmpty = !inputTextValue.length || inputTextValue === '<p><br></p>'

  const handleAdd = () => {
    setInputTextValue('')
    handleAddItem(inputTextValue)
  }

  useEffect(() => {
    if (editingItemText?.length) {
      setInputTextValue(editingItemText)
    }
  }, [editingItemText])

  return (
    <div>
      <Divider />
      <FooterContainer>
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <InputTextWithFormatting
            inputTextValue={inputTextValue}
            setInputTextValue={setInputTextValue}
            handleSubmit={handleAdd}
            placeholder="digite o nome da tarefa"
          />
          <button
            className="icon-button"
            onClick={handleAdd}
            disabled={isTextInputEmpty}
          >
            {editingItemText?.length ? (
              <Check {...DEFAULT_ICON_PROPS} />
            ) : (
              <Plus {...DEFAULT_ICON_PROPS} />
            )}
          </button>
        </div>
      </FooterContainer>
    </div>
  )
}
