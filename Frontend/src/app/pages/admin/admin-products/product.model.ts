export interface IProductResponseData {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: {
    product: boolean;
  };
}
