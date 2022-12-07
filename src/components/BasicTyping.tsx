import { Dispatch, useReducer, useRef } from 'react'

// Basic Props
// --------------------------------------------------------
type BoxProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Box = ({ children, className = '', style = {} }: BoxProps) => {
  return (
    <section
      className={className}
      style={{ padding: '1em', border: '5px solid purple', ...style }}
    >
      {children}
    </section>
  )
}

// Basic Reducer
// --------------------------------------------------------

type CounterState = {
  value: number
}

type BasicCounterAction = {
  type: 'INCR' | 'DECR'
}

type SetCounterAction = {
  type: 'SET'
  payload: number
}

type CounterActions = BasicCounterAction | SetCounterAction

const reducer = (state: CounterState, action: CounterActions) => {
  switch (action.type) {
    case 'INCR':
      return { value: state.value + 1 }
    case 'DECR':
      return { value: state.value - 1 }
    case 'SET':
      return { value: action.payload }
  }
}

// ------------------------------------------------------------
// ------------------------------------------------------------

export default function BasicTyping() {
  const [counterState, counterDispatch] = useReducer(reducer, { value: 0 })

  const counterIncr = () => counterDispatch({ type: 'INCR' })
  const counterDecr = () => counterDispatch({ type: 'DECR' })
  const counterReset = () => counterDispatch({ type: 'SET', payload: 0 })
  const counterSet = (n: number) => counterDispatch({ type: 'SET', payload: n })

  return (
    <Box>
      <p>Some HTML is not nested.</p>
      <Box style={{ borderColor: 'red' }}>
        <h2>Another React component with one child.</h2>
      </Box>
      <Box>
        <h2>A nested React component with two children.</h2>
        <p>The second child.</p>
      </Box>
      <Box className='flex gap-4'>
        <p className='count'>{counterState.value}</p>
        <section className='flex gap-4'>
          <button onClick={counterIncr}>Increment</button>
          <button onClick={counterReset}>Reset</button>
          <button onClick={counterDecr}>Decrement</button>
        </section>
      </Box>
    </Box>
  )
}

// ------------------------------------------------------------
// ------------------------------------------------------------

function pickObjectKeys<T, K extends keyof T>(obj: T, keys: K[]) {
  const result = {} as Pick<T, K> // important or else result[key] will err
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

const language = {
  name: 'TypeScript',
  age: 8,
  extensions: ['ts', 'tsx'],
}

// checkout type of return object
// Pick<{...}, 'age' | 'extension'>
const ageAndExtensions = pickObjectKeys(language, ['age', 'extensions'])

// fetch api
// ---------
type User = {
  name: string
}

async function fetchApi<ResultType>(path: string): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`)
  return response.json()
}

// const data = await fetchApi<User[]>('/users')

// default generic type - no need to specify on use
async function fetchApiWithDefault<ResultType = Record<string, any>>(
  path: string
): Promise<ResultType> {
  const response = await fetch(`https://example.com/api${path}`)
  return response.json()
}

// type constraint with 'extends' making subset or assignable T
function stringifyObjectKeyValues<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [key]: JSON.stringify(obj[key]),
    }),
    // asserting return {} as specific type
    {} as { [K in keyof T]: string }
  )
}

const stringifiedValues = stringifyObjectKeyValues({
  a: '1',
  b: 2,
  c: true,
  d: [1, 2, 3],
})

// class, interface examples
// -------------------------
class MyClass<T> {
  field: T
  constructor(field: T) {
    this.field = field
  }
}

class HttpApplication<Context> {
  context: Context
  constructor(context: Context) {
    this.context = context
  }

  // ... implementation

  get(url: string, handler: (context: Context) => Promise<void>): this {
    // ... implementation
    return this
  }
}

// generic helper type
// -------------------

// Keys extends string: all the keys to have - union of all objects
// T: the type for when the nested object field has the same key as the key on the parent object
// OtherType: type for when key is diff
type IfSameKeyThanParentTOtherwiseOtherType<
  Keys extends string,
  T,
  OtherType
> = {
  [K in Keys]: {
    [SameThanK in K]: T
  } & { [OtherThanK in Exclude<Keys, K>]: OtherType }
}

type Code = 'ABC' | 'DEF' | 'GHI'

// enforcer of shape - if ABC: ABC is not null, err
const shippingCosts: IfSameKeyThanParentTOtherwiseOtherType<
  Code,
  null,
  number
> = {
  ABC: {
    ABC: null,
    DEF: 12,
    GHI: 13,
  },
  DEF: {
    ABC: 12,
    DEF: null,
    GHI: 17,
  },
  GHI: {
    ABC: 13,
    DEF: 17,
    GHI: null,
  },
}

// Mapped type - helpful for reusing types with variation
// ------------------------------------------------------

type BooleanField<T> = {
  [K in keyof T]: boolean // ensuring all fields are boolean
}

// e.g. making an database object having optional fields indicating retrieval
type DBUser = {
  email: string
  name: string
}

type UserFetchOptions = BooleanField<DBUser>

// With modifier types

// type Readonly<T> = {
//   readonly [K in keyof T]: T[K]
// }

type OptionalField<T> = {
  [K in keyof T]?: T[K]
}

// Conditional Typing
// ------------------

type IsStringType<T> = T extends string ? true : false

{
  type A = 'abc'
  type B = {
    name: string
  }

  type ResultA = IsStringType<A>
  type ResultB = IsStringType<B>
}

type GetReturnType<T> = T extends (...args: any[]) => infer U ? U : never

{
  const someFunction = () => {
    return true
  }

  type ReturnTypeOfSomeFunction = GetReturnType<typeof someFunction>
}

// Advanced: NestedOmit

// f you passed "a.b.c" as the KeysToOmit, initially KeyPart1 would be set
// to the exact string type "a", and KeyPart2 would be set to "b.c".
// https://www.digitalocean.com/community/tutorials/how-to-use-generics-in-typescript
type NestedOmit<
  T extends Record<string, any>,
  KeysToOmit extends string
> = KeysToOmit extends `${infer KeyPart1}.${infer KeyPart2}`
  ? KeyPart1 extends keyof T
    ? Omit<T, KeyPart1> & {
        [NewKeys in KeyPart1]: NestedOmit<T[NewKeys], KeyPart2>
      }
    : T
  : Omit<T, KeysToOmit>

{
  type SomeType = {
    a: {
      b: string
      c: {
        d: number
        e: string[]
      }
      f: number
    }
    g: number | string
    h: {
      i: string
      j: number
    }
    k: {
      l: number
    }
  }

  type Result = NestedOmit<SomeType, 'a.b' | 'a.c.e' | 'h.i' | 'k'>
}
