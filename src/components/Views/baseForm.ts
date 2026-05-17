import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export type FormEvents = {
    onSubmit: () => void;
};

export class BaseForm<T, E extends FormEvents> extends Component<T> {
    protected submitBtn: HTMLButtonElement;
    protected errorSpan: HTMLElement;
    protected actions: E;

    constructor(container: HTMLElement, actions: E) {
        super(container);

        this.actions = actions;

        this.submitBtn = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
        this.errorSpan = ensureElement<HTMLElement>('.form__errors', container);

        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.actions.onSubmit();
        });
    }

    set valid(value: boolean) {
        this.submitBtn.disabled = !value;
    }

    set error(value: string) {
        this.errorSpan.textContent = value;
    }
}