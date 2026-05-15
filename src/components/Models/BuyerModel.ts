import { IBuyer, TPayment } from '../../types';

export class BuyerModel {
  protected buyer: IBuyer = {
    payment: '',
    email: '',
    phone: '',
    address: ''
  };

  setPayment(payment: TPayment): void {
    this.buyer.payment = payment;
  }
  
  setAddress(address: string): void {
    this.buyer.address = address;
  }

  setEmail(email: string): void {
    this.buyer.email = email;
  }

  setPhone(phone: string): void {
    this.buyer.phone = phone;
  }


  getAll(): IBuyer {
    return { ...this.buyer };
  }

 
  clear(): void {
    this.buyer = {
      payment: '',
      email: '',
      phone: '',
      address: ''
    };
  }

 
  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.buyer.payment) {
      errors.payment = 'Не выбран способ оплаты';
    }
    if (!this.buyer.address.trim()) {
      errors.address = 'Укажите адрес доставки';
    }
    if (!this.buyer.email.trim()) {
      errors.email = 'Укажите email';
    }
    if (!this.buyer.phone.trim()) {
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }
}