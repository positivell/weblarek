import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { categoryMap } from "../../utils/constants";
import { CategoryCard, getImageUrl } from "../../types";
import { BaseCard } from "./BaseCardView";

interface ICardPreview {
    title: string;
    image: string;
    price: number | null;
    description: string;
    category: string;
    productInCart: boolean;
}

export class CardPreview extends BaseCard<ICardPreview> {
    protected imageElement: HTMLImageElement;
    protected descriptionElement: HTMLElement;
    protected categoryElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container);

        this.buttonElement.addEventListener('click', () => {
            this.events.emit('product:cartAction');
        });
    }

    set image(value: string) {
        this.imageElement.src = getImageUrl(value);
    }

    set price(value: number | null) {
        super.price = value;

        if (value === null) {
            this.buttonElement.textContent = 'Недоступно';
            this.buttonElement.disabled = true;
        }
        else {
            this.buttonElement.disabled = false
        }
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set category(value: CategoryCard) {
        this.categoryElement.textContent = value;

        const categoryClass = categoryMap[value];
        if (categoryClass) {
            this.categoryElement.className = 'card__category';
            this.categoryElement.classList.add(categoryClass);
        }
    }

    set productInCart(inCart: boolean) {
    this.buttonElement.textContent = inCart
        ? 'Удалить из корзины'
        : 'В корзину';
    }
}