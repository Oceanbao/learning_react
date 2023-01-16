import { RGBColorType } from './types'

// Type Template Literals
const colors = ['red', 'green', 'blue'] as const

type Colors = Uppercase<(typeof colors)[number]>
// magical union
type ActionTypes = `ADJUST_${Colors}`

export type AdjustmentAction = {
  type: ActionTypes
  payload: number
}

export const reducer = (
  state: RGBColorType,
  action: AdjustmentAction
): RGBColorType => {
  for (const color of colors) {
    if (action.type === `ADJUST_${color.toUpperCase()}`) {
      return { ...state, [color]: action.payload }
    }
  }

  return state
}
