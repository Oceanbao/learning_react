import { type User } from './auth-context'

const sleep = (t: number) => new Promise(resolve => setTimeout(resolve, t))

export async function updateUser(user: User, updates: User, signal?: string) {
  await sleep(1500)
  if (`${updates.tagline} ${updates.bio}`.includes('fail')) {
    return Promise.reject({ message: 'Something went wrong' })
  }
  return { ...user, ...updates }
}
