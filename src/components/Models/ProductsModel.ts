import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class ProductsModel {
  private items: IProduct[] = [];
  private preview: IProduct | null = null;

  constructor(private events: EventEmitter) {}

    setProducts(products: IProduct[]): void {
        this.items = products;
        this.events.emit('products:changed', this.items);
    }

  getItems(): IProduct[] {
    return this.items;
  }

  getProductById(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setPreview(id: string): void {
    const product = this.getProductById(id);

    if (product) {
        this.preview = product;
        this.events.emit('product:selected', product);
    }
}

  getPreview(): IProduct | null {
    return this.preview;
  }
}