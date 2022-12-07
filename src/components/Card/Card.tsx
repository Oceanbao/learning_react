interface Props {
  title: string
  body: string
  href: string
}
export default function Card(props: Props) {
  return (
    <li className='hover-within:bg-[0%] group flex list-none rounded-lg bg-white bg-[image:var(--accent-gradient)] bg-[length:400%] bg-[100%] p-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1)] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[0%]'>
      <a
        className='leading-normal rounded-4 w-full bg-white py-4 px-1.5 text-[#111] opacity-60 [text-decoration:none]'
        href={props.href}
      >
        <h2 className='group-hover-within:text-[rgb(var(--accent))] text-lg font-bold transition-colors ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-[rgb(var(--accent))]'>
          {props.title}
          <span>&rarr;</span>
        </h2>
        <p className='mt-2 mb-0 text-sm text-[#444]'>{props.body}</p>
      </a>
    </li>
  )
}
