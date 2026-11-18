export interface Rating {
  rate: number,
      count: number
}

export interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating
  
    }
export type  ProductInput = Pick<Producto, 'title' | 'price' | 'description' | 'category' | 'image'>;