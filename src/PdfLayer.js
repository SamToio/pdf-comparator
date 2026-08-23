export class PdfLayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.document = null;

        this.page = 1;

        this.x = 0;
        this.y = 0;

        this.scale = 1;

        this.opacity = 1;

        this.baseScale = 1;
    }

    async load(file, pdfjsLib) {
        const arrayBuffer = await file.arrayBuffer();

        this.document = await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;

        this.page = 1;

        await this.render();
    }

    async render() {
        if (!this.document) {
            return;
        }

        const page = await this.document.getPage(this.page);

        const viewport = page.getViewport({
            scale: 1
        });

        this.baseScale = 1;

        this.canvas.width = Math.ceil(viewport.width);
        this.canvas.height = Math.ceil(viewport.height);

        await page.render({
            canvasContext: this.context,
            viewport
        }).promise;

        this.updateTransform();
    }

    updateTransform() {
        this.canvas.style.transform = `
            translate(
                calc(-50% + ${this.x}px),
                ${this.y}px
            )
            scale(${this.scale})
        `;

        this.canvas.style.opacity = this.opacity;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        this.updateTransform();
    }

    setScale(scale) {
        this.scale = scale;

        this.updateTransform();
    }

    setOpacity(opacity) {
        this.opacity = opacity;

        this.updateTransform();
    }
}