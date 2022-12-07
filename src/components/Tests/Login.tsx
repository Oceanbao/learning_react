import { FormEvent } from 'react'

export interface LoginProps {
  username: string
  password: string
  conditionsAccepted: boolean
}

type LoginElements = {
  [K in keyof LoginProps]: HTMLInputElement
}

interface CustomElements extends LoginElements, HTMLFormControlsCollection {}

interface LoginForm extends HTMLFormElement {
  readonly elements: CustomElements
}

function Login({ onSubmit }: { onSubmit: (data: LoginProps) => void }) {
  function handleSubmit(event: FormEvent<LoginForm>) {
    event.preventDefault()
    const { username, password, conditionsAccepted } =
      event.currentTarget.elements

    onSubmit({
      username: username.value,
      password: password.value,
      conditionsAccepted: conditionsAccepted.checked,
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username-field'>Username</label>
        <input id='username-field' name='username' type='text' />
      </div>
      <div>
        <label htmlFor='password-field'>Password</label>
        <input id='password-field' name='password' type='password' />
      </div>
      <div className='field checkbox'>
        <input type='checkbox' id='conditionsAccepted' />
        <label htmlFor='conditionsAccepted'>
          I agree to the terms and conditions
        </label>
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default Login
