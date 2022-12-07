import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build } from '@jackfranklin/test-data-bot'
import Login, { type LoginProps } from '@components/Tests/Login'

const fields: LoginProps = {
  username: 'randomUsername',
  password: 'randomPassword',
  conditionsAccepted: true,
}

// Could use faker separately
// name: perBuild(() => fake().name())
const buildLoginForm = build({
  fields,
})

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const { username, password, conditionsAccepted } = buildLoginForm()

  // Key: select by user-view cues (aria-label or id is hidden)
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  // Role + name regex to add precision
  await userEvent.click(
    screen.getByRole('checkbox', {
      name: /i agree to the terms and conditions/i,
    })
  )
  await userEvent.click(
    screen.getByRole('button', {
      name: /submit/i,
    })
  )

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
    conditionsAccepted,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
