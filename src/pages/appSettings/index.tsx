import { useAppSettings } from '@/hooks'
import { AppTextSizeProps, CompletedTaskStyleProps } from '@/hooks/useAppSettings'

export default function AppSettings() {
  const { textSize, onChangeTextSize, completedTaskStyle, onChangeCompletedTaskStyle } =
    useAppSettings()

  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center px-4">
        <h1 className="default-header-title">Configurações Gerais</h1>
      </div>
      {/* content container */}
      <div className="flex min-h-[350px] w-full flex-col items-center gap-2 overflow-y-scroll rounded-default bg-white p-2 dark:bg-zinc-800 md:gap-8 md:p-4">
        {/* input container */}
        <div className="flex w-full flex-col gap-4">
          {/* completed task */}
          <div className="flex flex-col gap-1">
            <label className="default-label">Tarefas completadas aparecem como</label>
            <select
              onChange={(event) =>
                onChangeCompletedTaskStyle(event.target.value as CompletedTaskStyleProps)
              }
              className="h-9 rounded-default border border-default px-4 py-2 text-sm outline-none disabled:text-gray-200 dark:border-dark-gray disabled:dark:text-gray-300 md:text-base"
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
              className="h-9 rounded-default border border-default px-4 py-2 font-sans text-sm outline-none disabled:text-gray-200 dark:border-dark-gray disabled:dark:text-gray-300 md:text-base"
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
      </div>
    </>
  )
}
