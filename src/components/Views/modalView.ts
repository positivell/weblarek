import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Modal extends Component<void> {
    protected content: HTMLElement;
    protected closeBtn: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.content = ensureElement<HTMLElement>('.modal__content', container);
        this.closeBtn = ensureElement<HTMLButtonElement>('.modal__close', container);

        this.closeBtn.addEventListener('click', () => this.close());

        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) this.close();
        });
    }

    setContent(node: HTMLElement) {
        this.content.replaceChildren(node);
    }

    open() {
        this.container.classList.add('modal_active');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content.innerHTML = '';
    }
}