import React from 'react'

type ButtonOwnProps<E extends React.ElementType = React.ElementType> = {
  children: string
  primary?: boolean
  secondary?: boolean
  desctructive?: boolean
  as?: E
}

// Union of OwnProps and normal ComponentProps bar OwnProps?
type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps>

const createClassNames = (classes: { [key: string]: boolean }): string => {
  let classNames = ''
  for (const [key, value] of Object.entries(classes)) {
    if (value) classNames += key + ' '
  }
  return classNames.trim()
}

const defaultElement = 'button'

function Button<E extends React.ElementType = typeof defaultElement>({
  children,
  primary = false,
  secondary = false,
  desctructive = false,
  as,
}: ButtonProps<E>) {
  const TagName = as || defaultElement
  let classNames = createClassNames({ primary, secondary, desctructive })
  if (TagName !== 'button') classNames += ' button'

  return <TagName className={classNames}>{children}</TagName>
}

export default function App() {
  return (
    <section>
      <Button primary>Primary</Button>
      <Button secondary>Primary</Button>
      <Button desctructive>Primary</Button>
      <Button as='p'>PPP</Button>
    </section>
  )
}
