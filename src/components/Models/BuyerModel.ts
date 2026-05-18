import { IBuyer, TPayment, TValidationErrors } from '../../types';
import { EventEmitter } from '../base/Events';

export class BuyerModel {
  protected buyer: IBuyer = {
    payment: undefined as any,  
    email: '',
    phone: '',
    address: ''
  };

  constructor(private events: EventEmitter) {}

  setPayment(payment: TPayment): void {
    this.buyer.payment = payment;
    this.events.emit('buyer:changed');
  }

  setAddress(address: string): void {
    this.buyer.address = address;
    this.events.emit('buyer:changed');
  }

  setEmail(email: string): void {
    this.buyer.email = email;
    this.events.emit('buyer:changed');
  }

  setPhone(phone: string): void {
    this.buyer.phone = phone;
    this.events.emit('buyer:changed');
  }

  getAll(): IBuyer {
    return { ...this.buyer };
  }

  clear(): void {
    this.buyer = {
      payment: undefined as any, 
      email: '',
      phone: '',
      address: ''
    };
    this.events.emit('buyer:changed'); ///
  }

  validate(): TValidationErrors {
    const errors: TValidationErrors = {};

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