interface IProductCategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: string;
  photoUrl: string;
  productCategory: IProductCategory;
}

export interface ProductsResponseData {
  data: { products: IProduct[] };
}
