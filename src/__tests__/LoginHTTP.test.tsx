import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build } from '@jackfranklin/test-data-bot'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { handlers } from '../test/server-handlers'
import Login from '@components/Tests/LoginSubmission'

const fields = {
  username: 'randomUsername',
  password: 'randomPassword',
  conditionsAccepted: true,
}
const buildLoginForm = build({
  fields,
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
// remove one-off handler
afterEach(() => server.resetHandlers())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(
    screen.getByRole('checkbox', {
      name: /i agree to the terms and conditions/i,
    })
  )
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByText(username)).toBeInTheDocument()
})

// unhappy path
test('omitting the password results in an error', async () => {
  render(<Login />)
  const { username } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  // don't type in the password
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // expect(screen.getByRole('alert')).toHaveTextContent('password required')
  // inline snapshot to get error messages
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`
  )
})

// one-off handler
test('unknown server error displays the error message', async () => {
  const testErrorMessage = 'Oh no, something bad happened'
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: testErrorMessage }))
      }
    )
  )
  render(<Login />)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage)
})
