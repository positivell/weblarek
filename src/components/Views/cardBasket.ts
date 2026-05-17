import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { BaseCard } from "./baseCard";

interface IBasketItem {
    index: number;
    title: string;
    price: number;
}

export class CardBasket extends BaseCard<IBasketItem> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(
    container: HTMLElement, private events: EventEmitter, private product: IProduct) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        this.deleteButton.addEventListener('click', () => {
            this.events.emit('basket:remove', { id: this.product.id });
        });
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}