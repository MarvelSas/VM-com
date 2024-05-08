interface IProductCategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: string;
  url: string;
  photoUrl: string;
  productCategory: IProductCategory;
}
