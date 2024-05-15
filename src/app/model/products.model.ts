export interface Product{
  id: number,
  name: string,
  description: string,
  price: number,
  quantity: number,
  image : string,
  created_at : Date,
  updated_at : Date,
  category_id: number,
}

export interface Category{
  id : number,
  name: string,
  slug: string,
}
