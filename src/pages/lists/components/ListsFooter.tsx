import { useState } from 'react'

import { Divider, FooterContainer, InputTextWithFormatting } from '@/shared/components'

import { DEFAULT_ICON_PROPS } from '@/consts'
import { Plus } from '@phosphor-icons/react'
interface AllListsCardFooterProps {
  handleAddList: (itemText: string) => void
}

export default function Footer({ handleAddList }: AllListsCardFooterProps) {
  const [inputTextValue, setInputTextValue] = useState<string>('')

  const isTextInputEmpty = !inputTextValue.length || inputTextValue === '<p><br></p>'

  const handleAdd = () => {
    setInputTextValue('')
    handleAddList(inputTextValue)
  }

  return (
    <div>
      <Divider />
      <FooterContainer>
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <InputTextWithFormatting
            inputTextValue={inputTextValue}
            setInputTextValue={setInputTextValue}
            handleSubmit={handleAdd}
            placeholder="digite o nome da lista"
            formats={['italic']}
          />
          <button
            className="icon-button"
            onClick={handleAdd}
            disabled={isTextInputEmpty}
          >
            <Plus {...DEFAULT_ICON_PROPS} />
          </button>
        </div>
      </FooterContainer>
    </div>
  )
}
