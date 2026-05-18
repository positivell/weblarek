import { ensureElement } from "../../utils/utils";
import { BaseCard } from "./BaseCardView";

interface IBasketItem {
    index: number;
    title: string;
    price: number;
    id: string;
}

interface ICardBasketActions {
    onClick: (id: string) => void;
}

export class CardBasket extends BaseCard<IBasketItem> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    private _id: string = '';

    constructor(
        container: HTMLElement,
        actions?: ICardBasketActions
    ) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        if (actions?.onClick) {
            this.deleteButton.addEventListener('click', () => {
                actions.onClick(this._id);
            });
        }
    }

    set id(value: string) {
        this._id = value;
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}