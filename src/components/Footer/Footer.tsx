export default function Footer() {
  return (
    <p className='text-quaternary mx-auto my-16 text-center'>
      Made by
      <a
        className='text-secondary hover:text-primary group ml-1'
        href='https://oceanbao.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        Ocean Bao
        <span className='ml-1 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100'>
          ↗
        </span>
      </a>
    </p>
  )
}
