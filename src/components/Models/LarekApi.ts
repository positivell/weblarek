import { Api } from '../base/Api';
import { IOrder, IOrderResult, IProductsResponse } from '../../types';

export class LarekApi {
  constructor(private readonly _api: Api) {}

  getProducts(): Promise<IProductsResponse> {
    return this._api.get('/product');
  }

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this._api.post('/order', order);
  }
}