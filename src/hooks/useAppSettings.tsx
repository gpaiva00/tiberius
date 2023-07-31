import { APP_TEXT_SIZE_KEY } from '@/constants'
import { getFromStorage, setToStorage } from '@/utils'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface AppSettingsContextProps {
  onChangeTextSize: (textSize: AppTextSizeProps) => void
  onChangeCompletedTaskStyle: (completedTaskStyle: CompletedTaskStyleProps) => void
  completedTaskStyle: CompletedTaskStyleProps
  textSize: AppTextSizeProps
}

enum AppTextSizeProps {
  BASE = 'base',
  SMALL = 'sm',
  LARGE = 'lg',
}

enum CompletedTaskStyleProps {
  GRAY_AND_STROKE = 'grayAndStroke',
  GRAY = 'gray',
  STROKE = 'stroke',
}

const appSettingsContext = createContext<AppSettingsContextProps>({} as AppSettingsContextProps)

function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = useState<AppTextSizeProps>(AppTextSizeProps.BASE)
  const [completedTaskStyle, setCompletedTaskStyle] = useState<CompletedTaskStyleProps>(
    CompletedTaskStyleProps.GRAY
  )

  function getAppSettings() {
    setTextSize((getFromStorage(APP_TEXT_SIZE_KEY) as AppTextSizeProps) || AppTextSizeProps.BASE)

    setCompletedTaskStyle(
      (getFromStorage('completedTaskStyle') as CompletedTaskStyleProps) ||
        CompletedTaskStyleProps.GRAY
    )
  }

  function onChangeTextSize(textSize: AppTextSizeProps) {
    setTextSize(textSize)
    setToStorage(APP_TEXT_SIZE_KEY, textSize)
  }

  function onChangeCompletedTaskStyle(completedTaskStyle: CompletedTaskStyleProps) {
    setCompletedTaskStyle(completedTaskStyle)
    setToStorage('completedTaskStyle', completedTaskStyle)
  }

  useEffect(() => {
    getAppSettings()
  }, [])

  return (
    <appSettingsContext.Provider
      value={{
        textSize,
        onChangeTextSize,
        completedTaskStyle,
        onChangeCompletedTaskStyle,
      }}
    >
      {children}
    </appSettingsContext.Provider>
  )
}

function useAppSettings() {
  const context = useContext(appSettingsContext)
  return context
}

export { AppSettingsProvider, AppTextSizeProps, CompletedTaskStyleProps, useAppSettings }
