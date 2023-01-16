// Disjoint union type (type username = string | null) allows distinct (either or)
// handling of each type in the union. It may be used to group variants of
// components - variants of button each having special props.

// Disjoint union to separate variant types
interface PrimaryButton {
  kind: 'primary'
  specialPrimaryMethod: () => void
}

interface SecondaryButton {
  kind: 'secondary'
}

type ButtonKindDisjoint = PrimaryButton | SecondaryButton

type ButtonDisjointProps = React.ComponentPropsWithoutRef<'button'> &
  ButtonKindDisjoint

// Note: destructure no longer ok because of disjoint
export function DisjointButton(props: ButtonDisjointProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.kind === 'primary') {
      props.specialPrimaryMethod()
    } else {
      props.onClick?.(e)
    }
  }

  return <button onClick={handleClick}>{props.children}</button>
}

// ---------------
// Polymorphic Component
type PolyProps = React.PropsWithChildren<{ as: 'div' | 'section' | 'aside' }>

export function PolyContainer({ as: Component = 'div', children }: PolyProps) {
  return <Component className='styles.container'>{children}</Component>
}
