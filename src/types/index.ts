export * from "./global.Type";

export type TProduct = {
  _id: string;
  quantity?: number;
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

export type TCategory = {
  _id: string;
  name: string;
  isDeleted: boolean;
};

export type TPaymentData = {
  orderProductTitle: string;
  orderProductPrice: number;
  orderProductCategory: string;
  orderProductQuantity?: number;
  transactionId: number | string;
  userEmail: string;
  orderProductId: string;
};

export type QueryParams = {
  searchTerm?: string;
  price?: number | string;
  category?: string;
  sort?: string | number;
  page?:number;
};

export interface TConformOrder {
  _id: string;
  orderProductTitle: string;
  orderProductPrice: number;
  orderProductCategory: string;
  orderProductQuantity: number;
  transactionId: string;
  userEmail: string;
  orderProductId: OrderProductId;
}

export interface OrderProductId {
  _id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  stock: number;
  brand: string;
  isDeleted: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}




export type TReview = {
  _id: string;
  rating: number;
  reviewMessage: string;
  productId: string;
  reviewAddDate: string;
  ratingUserName: string;
  ratingUserImg: string;
  likeTotal:number;
  __v: number;
};

export type TReviewLike = {
  _id: string;
  email: string;
  reviewId: string;
  like: boolean;
  __v: number;
};

export type TReplayReview = {
  _id: string;
  replayReviewMessage: string;
  productId: string;
  reviewId: string;
  reviewAddDate: string;
  ratingUserName: string;
  ratingUserImg: string;
  likeTotal: number;
  __v: number;
};