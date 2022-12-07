import Link from 'next/link'

import Container from '@components/Container'

export default function NotFound() {
  return (
    <Container title='404 - Not found'>
      <div className='mx-auto my-2 mb-16 flex max-w-2xl flex-col items-start justify-center sm:my-4 md:my-8'>
        <h1 className='mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl'>
          404 - Not Found
        </h1>
        <div className='flex flex-col space-y-12'>
          <p className='text-gray-600 dark:text-gray-400'>
            You found something that used to exist, or you typed something
            wrong. Try that URL again or return home.
          </p>
          <Link
            href='/'
            className='mx-auto rounded-md bg-gray-100 px-8 py-4 text-lg font-bold text-gray-900 dark:bg-gray-800 dark:text-gray-100'
          >
            Return home
          </Link>
        </div>
      </div>
    </Container>
  )
}
