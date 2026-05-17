export class GalleryView {
    constructor(private container: HTMLElement) {}

    render(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}