import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface ISuccess {
    total: number;
}

export class OrderSuccess extends Component<ISuccess> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
    }

    set onClose(callback: () => void) {
        this.closeButton.onclick = callback;
    }

    set total(value: number) {
        this.descriptionElement.textContent = `Списано ${value} синапсов`;
    }
}