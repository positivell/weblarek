import { ensureElement } from "../../utils/utils";

interface ISuccess {
    total: number;
}

export class OrderSuccess {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(protected container: HTMLElement) {
        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
    }

    set onClose(callback: () => void) {
        this.closeButton.onclick = callback;
    }

    render(data: ISuccess) {
        this.descriptionElement.textContent = `Списано ${data.total} синапсов`;
        return this.container;
    }
}