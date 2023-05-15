import classNames from 'classnames'

type InputTextProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function InputText({ placeholder, onChange, onKeyDown, value, className, ...props }: InputTextProps) {
  return (
    <input
      type="text"
      className={classNames(
        'h-inputControl w-full rounded-sm border-default bg-lightGray px-2 py-4 font-light outline-none dark:border-dark dark:bg-darkInputBackground dark:text-darkTextLight dark:placeholder:text-darkTextGray',
        {
          'text-lightenGray dark:text-darkTextGray': props.disabled,
        },
        className
      )}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      autoFocus
      {...props}
    />
  )
}