interface IProductCategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: string;
  photos: string[];
  mainPhotoId: number;
  productCategory: IProductCategory;
  description: string;
}

export interface ProductsResponseData {
  data: { products: IProduct[] };
}

export interface OneProductResponseData {
  data: { product: IProduct };
}
