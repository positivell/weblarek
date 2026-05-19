import { categoryMap, CDN_URL } from "../utils/constants";

export const getImageUrl = (path: string) => {
    return path.startsWith('http')
        ? path
        : `${CDN_URL}${path}`;
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type CategoryCard = keyof typeof categoryMap;

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}


export type TValidationErrors = Partial<Record<keyof IBuyer, string>>;

export type TPayment = 'card' | 'cash'; 

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment | '';
  email: string;
  phone: string;
  address: string;
}

export interface IOrder {
  payment: TPayment | '';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}