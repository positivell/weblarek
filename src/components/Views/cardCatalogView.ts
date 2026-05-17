import { ensureElement } from "../../utils/utils";
import { CategoryCard, getImageUrl } from "../../types";
import { categoryMap } from "../../utils/constants";
import { BaseCard } from "./BaseCardView";

interface ICardCatalog {
    category: string;
    title: string;
    image: string;
    price: number | null;
}

type CardEvents = {
    onClick: (event: MouseEvent) => void;
};

export class CardCatalog extends BaseCard<ICardCatalog> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, private event: CardEvents) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
        this.buttonElement = this.container as HTMLButtonElement;

        this.buttonElement.addEventListener('click', this.event.onClick);
    }

    set category(value: CategoryCard) {
        this.categoryElement.textContent = String(value);

        const categoryClass = categoryMap[value];
        if (categoryClass) {
            this.categoryElement.className = 'card__category';
            this.categoryElement.classList.add(categoryClass);
        }
    }

    set image(value: string) {
        this.imageElement.src = getImageUrl(value);
    }
}