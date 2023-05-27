import { toast } from 'react-hot-toast'
import {} from 'quill'

export const copyToClipboard = (text: string) => {
  let temporaryElement = document.createElement('div')

  temporaryElement.innerHTML = text

  let plainText = temporaryElement.textContent || temporaryElement.innerText || ''

  navigator.clipboard
    .writeText(plainText)
    .then(() => {
      toast('Texto copiado para a área de transferência', {
        icon: '📋',
      })
    })
    .catch((err) => {
      toast.error('Falha ao copiar texto')
    })
}
