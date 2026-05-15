import { IProduct } from '../../types';

export class ProductsModel {
  private items: IProduct[] = [];
  private preview: IProduct | null = null;

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getProductById(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setPreview(product: IProduct | null | undefined): void {
    this.preview = product ?? null;
  }

  getPreview(): IProduct | null {
    return this.preview;
  }
}