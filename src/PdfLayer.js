export class PdfLayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        // PDF document
        this.document = null;

        // Current page
        this.page = 1;

        // Layer position
        this.x = 0;
        this.y = 0;

        // Layer scale
        this.scale = 1;

        // Layer opacity
        this.opacity = 1;

        // Base scale reserved for future
        // page-size normalization
        this.baseScale = 1;

        // Rendering state
        this.isRendering = false;

        // Prevent stale renders from
        // replacing a newer page
        this.renderRequestId = 0;
    }


    // ==================================================
    // LOAD PDF
    // ==================================================

    async load(file, pdfjsLib) {

        const arrayBuffer =
            await file.arrayBuffer();

        this.document =
            await pdfjsLib.getDocument({
                data: arrayBuffer
            }).promise;

        // Always start from page 1
        this.page = 1;

        // Reset rendering state
        this.isRendering = false;

        this.renderRequestId++;

        await this.render();
    }


    // ==================================================
    // RENDER CURRENT PAGE
    // ==================================================

    async render() {

        if (!this.document) {
            return;
        }

        const requestId =
            ++this.renderRequestId;

        this.isRendering = true;

        try {

            const page =
                await this.document.getPage(
                    this.page
                );

            /*
             * If another page was requested while
             * this page was loading, discard this render.
             */
            if (
                requestId !==
                this.renderRequestId
            ) {
                return;
            }

            const viewport =
                page.getViewport({
                    scale: 1
                });

            this.baseScale = 1;

            this.canvas.width =
                Math.ceil(viewport.width);

            this.canvas.height =
                Math.ceil(viewport.height);

            /*
             * Clear the previous page before
             * rendering the new one.
             */
            this.context.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );

            await page.render({
                canvasContext: this.context,
                viewport
            }).promise;

            /*
             * The user may have changed the page
             * while rendering was in progress.
             *
             * Do not allow an old render to become
             * the visible current page.
             */
            if (
                requestId !==
                this.renderRequestId
            ) {
                return;
            }

            /*
             * Rendering a new page must NOT reset:
             *
             * x
             * y
             * scale
             * opacity
             *
             * These values belong to the layer,
             * not to the individual page.
             */

            this.updateTransform();

        } finally {

            if (
                requestId ===
                this.renderRequestId
            ) {
                this.isRendering = false;
            }
        }
    }


    // ==================================================
    // SET PAGE
    // ==================================================

    async setPage(pageNumber) {

        if (!this.document) {
            return;
        }

        const totalPages =
            this.document.numPages;

        const requestedPage =
            Number(pageNumber);

        if (
            !Number.isInteger(
                requestedPage
            )
        ) {
            return;
        }

        if (
            requestedPage < 1 ||
            requestedPage > totalPages
        ) {
            return;
        }

        /*
         * Do not ignore the request if a render
         * is currently in progress for another page.
         *
         * The page value itself must change immediately,
         * then the latest render request becomes authoritative.
         */
        if (
            requestedPage === this.page &&
            !this.isRendering
        ) {
            return;
        }

        this.page =
            requestedPage;

        /*
         * Invalidate any previous render.
         * This is important when the user clicks
         * page buttons quickly.
         */
        this.renderRequestId++;

        await this.render();
    }


    // ==================================================
    // NEXT PAGE
    // ==================================================

    async nextPage() {

        if (!this.document) {
            return;
        }

        if (
            this.page >=
            this.document.numPages
        ) {
            return;
        }

        await this.setPage(
            this.page + 1
        );
    }


    // ==================================================
    // PREVIOUS PAGE
    // ==================================================

    async previousPage() {

        if (!this.document) {
            return;
        }

        if (this.page <= 1) {
            return;
        }

        await this.setPage(
            this.page - 1
        );
    }


    // ==================================================
    // UPDATE TRANSFORM
    // ==================================================

    updateTransform() {

        this.canvas.style.transform = `
            translate(
                calc(-50% + ${this.x}px),
                ${this.y}px
            )
            scale(${this.scale})
        `;

        this.canvas.style.opacity =
            this.opacity;
    }


    // ==================================================
    // POSITION
    // ==================================================

    setPosition(x, y) {

        this.x = x;
        this.y = y;

        this.updateTransform();
    }


    // ==================================================
    // SCALE
    // ==================================================

    setScale(scale) {

        this.scale = scale;

        this.updateTransform();
    }


    // ==================================================
    // OPACITY
    // ==================================================

    setOpacity(opacity) {

        this.opacity = opacity;

        this.updateTransform();
    }
}