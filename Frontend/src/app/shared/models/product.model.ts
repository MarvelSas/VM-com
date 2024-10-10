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
}

export interface IPageableParams {
  // currentPage?: number;
  page?: number;
  totalPages?: number;
  pageSize?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: string;
  order?: string;
  name?: string;
}

export interface ProductsResponseData {
  data: { products: IProduct[] };
}

export interface OneProductResponseData {
  data: { product: IProduct };
}
