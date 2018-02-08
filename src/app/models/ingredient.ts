export interface IIngredient {
  _id: string,
  cosing_ref_number: string,
  inci_name: string,
  cas_number: string,
  ec_number: string,
  description: string,
  restrictions: [string],
  color_index_number: string,
  color: string,
  product_type_body_parts: string,
  max_concentration: string,
  other: string,
  warning: string,
  identified_substances: string,
  func: string
}
