import { useState } from 'react'

import { createClient } from '@supabase/supabase-js'
import Head from 'next/head'
import Image from 'next/image'

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  )

  const { data } = await supabaseAdmin
    .from('gallerylee')
    .select('*')
    .order('id')

  return {
    props: {
      images: data,
    },
  }
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Image = {
  id: number
  href: string
  imageSrc: string
  name: string
  username: string
}

export default function Gallery({ images }: { images: Image[] }) {
  return (
    <>
      <Head>
        <title>Demo Gallery</title>
        <meta name='description' content='Demo Next.js app with ISR.' />
      </Head>
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {images.map(image => (
            <BlurImage key={image.id} image={image} />
          ))}
        </div>
      </div>
    </>
  )
}

export function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <a href='#' className='group'>
      <div className='relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-[7/8]'>
        <Image
          alt={image.name}
          src={image.imageSrc}
          fill
          className={cn(
            'object-cover duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'sacle-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className='mt-4 text-sm text-gray-700'>{image.name}</h3>
      <p className='mt-1 text-lg font-medium text-gray-900'>{image.username}</p>
    </a>
  )
}
