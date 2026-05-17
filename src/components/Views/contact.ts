import { ensureElement } from "../../utils/utils";
import { BaseForm, FormEvents } from "./baseForm";

interface IContacts {
    email: string;
    phone: string;
    valid: boolean;
    error?: string;
}

type ContactsEvents = FormEvents & {
    onInput: (name: string, value: string) => void;
};

export class Contact extends BaseForm<IContacts, ContactsEvents> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, actions: ContactsEvents) {
        super(container, actions);

        this.emailInput = ensureElement<HTMLInputElement>('[name="email"]', container);
        this.phoneInput = ensureElement<HTMLInputElement>('[name="phone"]', container);

        this.emailInput.addEventListener('input', () => {
            this.actions.onInput('email', this.emailInput.value);
        });

        this.phoneInput.addEventListener('input', () => {
            this.actions.onInput('phone', this.phoneInput.value);
        });
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}