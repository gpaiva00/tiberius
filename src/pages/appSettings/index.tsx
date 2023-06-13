import { CardContentContainer, MainCard } from '@/shared/components'

import { useAppSettings } from '@/hooks'
import { AppTextSizeProps, CompletedTaskStyleProps } from '@/hooks/useAppSettings'

export default function AppSettings() {
  const { textSize, onChangeTextSize, completedTaskStyle, onChangeCompletedTaskStyle } =
    useAppSettings()

  return (
    <MainCard title="Configurações Gerais">
      <CardContentContainer className="px-24 py-8">
        {/* input container */}
        <div className="flex flex-col gap-2 p-2 md:gap-8 md:p-4">
          {/* completed task */}
          <div className="flex flex-col gap-1">
            <label className="default-label">Tarefas completadas aparecem como</label>
            <select
              onChange={(event) =>
                onChangeCompletedTaskStyle(event.target.value as CompletedTaskStyleProps)
              }
              className="h-9 rounded-default border border-default px-4 py-2 text-sm outline-none disabled:text-lightenGray dark:border-dark disabled:dark:text-darkTextGray md:text-base"
            >
              <option
                value={CompletedTaskStyleProps.GRAY_AND_STROKE}
                selected={completedTaskStyle === CompletedTaskStyleProps.GRAY_AND_STROKE}
              >
                Cinza e tachado
              </option>
              <option
                value={CompletedTaskStyleProps.GRAY}
                selected={completedTaskStyle === CompletedTaskStyleProps.GRAY}
              >
                Apenas cinza
              </option>
              <option
                value={CompletedTaskStyleProps.STROKE}
                selected={completedTaskStyle === CompletedTaskStyleProps.STROKE}
              >
                Apenas tachado
              </option>
            </select>
          </div>
          {/* text size */}
          <div className="flex flex-col gap-1">
            <label className="default-label">Tamanho do texto das tarefas</label>
            <select
              onChange={(event) => onChangeTextSize(event.target.value as AppTextSizeProps)}
              className="h-9 rounded-default border border-default px-4 py-2 font-sans text-sm outline-none disabled:text-lightenGray dark:border-dark disabled:dark:text-darkTextGray md:text-base"
            >
              <option
                value={AppTextSizeProps.BASE}
                selected={textSize === AppTextSizeProps.BASE}
              >
                Normal
              </option>
              <option
                selected={textSize === AppTextSizeProps.SMALL}
                value={AppTextSizeProps.SMALL}
              >
                Pequeno
              </option>
              <option
                value={AppTextSizeProps.LARGE}
                selected={textSize === AppTextSizeProps.LARGE}
              >
                Grande
              </option>
            </select>
          </div>
        </div>
      </CardContentContainer>
    </MainCard>
  )
}
