import data from './data'

export type CharacterType = {
  name: string
  alignment: string
  intelligence: number
  strength: number
  speed: number
  durability: number
  power: number
  combat: number
  total: number
}

export const fetchCharacter = (): Promise<CharacterType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data[0])
    }, 2000)
  })
}
