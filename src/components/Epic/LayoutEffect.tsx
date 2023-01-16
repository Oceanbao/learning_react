import { useEffect, useLayoutEffect, useRef, useState } from 'react'

function MessagesDisplay({ messages }: { messages: Message[] }) {
  const refContainer = useRef<HTMLDivElement>(null)
  // useLayoutEffect(() => {
  useEffect(() => {
    const refContainerVal = refContainer.current
    if (refContainerVal)
      refContainer.current.scrollTop = refContainer.current.scrollHeight
  })

  return (
    <div
      ref={refContainer}
      role='log'
      className='m-auto h-80 w-80 overflow-y-scroll py-8 px-2 outline outline-1 outline-black'
    >
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.author}</strong>: <span>{message.content}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  )
}

function sleep(time = 0) {
  const wakeUpTime = Date.now() + time
  while (Date.now() < wakeUpTime) {
    // TODO
  }
}

function SloooooooowSibling() {
  useEffect(() => {
    // useLayoutEffect(() => {
    sleep(1000)
  })
  return null
}

function App() {
  const [messages, setMessages] = useState(allMessages.slice(0, 8))
  const addMessage = () =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : null
  const removeMessage = () =>
    messages.length > 0
      ? setMessages(allMessages.slice(0, messages.length - 1))
      : null

  return (
    <div className='m-auto max-w-xs border border-indigo-600'>
      <div className='flex content-between gap-4'>
        <button className='ring-2 ring-indigo-600' onClick={addMessage}>
          add message
        </button>
        <button className='ring-2 ring-red-900' onClick={removeMessage}>
          remove message
        </button>
      </div>
      <hr className='mt-2 mb-2' />
      <MessagesDisplay messages={messages} />
      <SloooooooowSibling />
    </div>
  )
}

export default App

const allMessages = [
  `Leia: Aren't you a little short to be a stormtrooper?`,
  `Luke: What? Oh... the uniform. I'm Luke Skywalker. I'm here to rescue you.`,
  `Leia: You're who?`,
  `Luke: I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi.`,
  `Leia: Ben Kenobi is here! Where is he?`,
  `Luke: Come on!`,
  `Luke: Will you forget it? I already tried it. It's magnetically sealed!`,
  `Leia: Put that thing away! You're going to get us all killed.`,
  `Han: Absolutely, Your Worship. Look, I had everything under control until you led us down here. You know, it's not going to take them long to figure out what happened to us.`,
  `Leia: It could be worse...`,
  `Han: It's worse.`,
  `Luke: There's something alive in here!`,
  `Han: That's your imagination.`,
  `Luke: Something just moves past my leg! Look! Did you see that?`,
  `Han: What?`,
  `Luke: Help!`,
  `Han: Luke! Luke! Luke!`,
  `Leia: Luke!`,
  `Leia: Luke, Luke, grab a hold of this.`,
  `Luke: Blast it, will you! My gun's jammed.`,
  `Han: Where?`,
  `Luke: Anywhere! Oh!!`,
  `Han: Luke! Luke!`,
  `Leia: Grab him!`,
  `Leia: What happened?`,
  `Luke: I don't know, it just let go of me and disappeared...`,
  `Han: I've got a very bad feeling about this.`,
  `Luke: The walls are moving!`,
  `Leia: Don't just stand there. Try to brace it with something.`,
  `Luke: Wait a minute!`,
  `Luke: Threepio! Come in Threepio! Threepio! Where could he be?`,
].map((m, i) => ({
  id: i,
  author: m.split(': ')[0],
  content: m.split(': ')[1],
}))

type Message = (typeof allMessages)[0]
