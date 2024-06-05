export interface IProductNew {
  name: string;
  price: string;
  productCategory: { id: number; name: string };
  amount: number;
  description: string;
  photoUrl: string[];
}

export interface IProductResponseData {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: {
    product: boolean;
  };
}

export interface IResPhotoUpload {
  data: { productPhotoName: string };
}
