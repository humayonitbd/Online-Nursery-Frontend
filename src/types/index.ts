

export type TProduct = {
  _id: string;
  quantity?:number;
  category: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  stock: number;
  brand: string;
  isDeleted?: boolean;
};

export type TCategory={
  _id:string;
  name:string;
  isDeleted:boolean;
}

export type TPaymentData = {
  orderProductTitle: string;
  orderProductPrice: number;
  orderProductCategory: string;
  orderProductQuantity?: number;
  transactionId: number | string;
  userEmail: string;
  orderProductId: string;
};