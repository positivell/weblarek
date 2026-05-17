import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IBasket {
    items: HTMLElement[];
    total: number;
    buttonElement: HTMLButtonElement;
}

export class Basket extends Component<IBasket> {
    protected listElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.buttonElement.disabled = true;

        this.buttonElement.addEventListener('click', () => {
            this.events.emit('order:open');
        });
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
        this.buttonElement.disabled = value.length === 0;
    }

    set total(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }
}


