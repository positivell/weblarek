import { ensureElement } from "../../utils/utils";
import { TPayment } from "../../types";
import { BaseForm } from "./baseForm";

interface IOrderView {
    address: string;
    payment: TPayment;
    valid: boolean;
    error?: string;
}

type OrderEvents = {
    onInput: (name: string, value: string) => void;
    onPayment: (method: TPayment) => void;
    onSubmit: () => void;
};

export class Order extends BaseForm<IOrderView, OrderEvents> {
    protected addressInput: HTMLInputElement;
    protected cardBtn: HTMLButtonElement;
    protected cashBtn: HTMLButtonElement;

    constructor(container: HTMLElement, actions: OrderEvents) {
        super(container, actions);

        this.addressInput = ensureElement<HTMLInputElement>('[name="address"]', container);
        this.cardBtn = ensureElement<HTMLButtonElement>('[name="card"]', container);
        this.cashBtn = ensureElement<HTMLButtonElement>('[name="cash"]', container);

        this.addressInput.addEventListener('input', () => {
            this.actions.onInput('address', this.addressInput.value);
        });

        this.cardBtn.addEventListener('click', () => {
            this.actions.onPayment('card');
        });

        this.cashBtn.addEventListener('click', () => {
            this.actions.onPayment('cash');
        });
    }

    set address(value: string) {
        this.addressInput.value = value;
    }

    set payment(value: TPayment) {
        this.cardBtn.classList.toggle('button_alt-active', value === 'card');
        this.cashBtn.classList.toggle('button_alt-active', value === 'cash');
    }

    set valid(value: boolean) {
        this.submitBtn.disabled = !value;
    }

    set error(value: string) {
        this.errorSpan.textContent = value;
    }
}