import s from './Switch.module.css'

const noop = () => {
  // NOOP
}

type Props = {
  on: boolean
  onClick: () => void
  className?: string
  'aria-label'?: string
  [x: string]: any
}

function Switch({
  on,
  className = '',
  'aria-label': ariaLabel,
  onClick,
  ...props
}: Props) {
  const btnClassName = [
    className,
    s.toggleBtn,
    on ? s.toggleBtnOn : s.toggleBtnOff,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label aria-label={ariaLabel || 'Toggle'} className='block'>
      <input
        className={s.toggleInput}
        type='checkbox'
        checked={on}
        onChange={noop}
        onClick={onClick}
        data-testid='toggle-input'
      />
      <span className={btnClassName} {...props} />
    </label>
  )
}

export default Switch
