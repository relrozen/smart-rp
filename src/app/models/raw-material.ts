export interface IRawMaterial {
  _id: string,
  name: string,
  manufacturer: string,
  ingredients: {
    id: string,
    concentration: number
  }[]
}
