import BigText from '@components/BigText'
import Card from '@components/Card'
import Container from '@components/Container'

const List = () => {
  return (
    <ul
      role='list'
      className='grid grid-cols-[repeat(auto-fit,_minmax(24ch,_1fr))] gap-4 p-4 text-lg'
    >
      <Card
        href='https://docs.astro.build/'
        title='Documentation'
        body='Learn how Astro works and explore the official API docs.'
      />
      <Card
        href='https://astro.build/integrations/'
        title='Integrations'
        body='Supercharge your project with new frameworks and libraries.'
      />
      <Card
        href='https://astro.build/themes/'
        title='Themes'
        body='Explore a galaxy of community-built starter themes.'
      />
      <Card
        href='https://astro.build/chat/'
        title='Community'
        body='Come say hi to our amazing Discord community. ❤️'
      />
    </ul>
  )
}

export default function Home() {
  return (
    <Container>
      <div className='inset-0 flex flex-col items-center justify-center'>
        <BigText slides={['NextJs.', 'TailwindCSS.', 'Typescript.']} />
      </div>
      <List />
    </Container>
  )
}
