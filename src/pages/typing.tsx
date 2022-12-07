import { default as AdvProps } from '@components/AdvProps'
import BasicTyping from '@components/BasicTyping'
import { default as ColorPicker } from '@components/ColorPicker'
import { default as HOCGeneric } from '@components/HOCGeneric'

export default function Page() {
  return (
    <>
      <BasicTyping />
      <ColorPicker />
      <HOCGeneric />
      <AdvProps />
    </>
  )
}
