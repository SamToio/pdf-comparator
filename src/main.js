import './style.css';

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

import { PdfLayer } from './PdfLayer.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const app = document.querySelector('#app');

app.innerHTML = `
    <div class="app">

        <!-- =================================================
             HEADER
        ================================================== -->

        <header class="topbar">

            <div class="brand">
                <div class="brand-icon">⇄</div>

                <div class="brand-text">
                    <h1>PDF Comparator</h1>
                    <span>Overlay & compare PDF documents</span>
                </div>
            </div>

            <div class="topbar-status">
                <span class="status-dot"></span>
                Ready
            </div>

        </header>


        <!-- =================================================
             FILE BAR
        ================================================== -->

        <section class="file-bar">

            <label class="file-card file-card-a">

                <div class="file-badge">A</div>

                <div class="file-info">
                    <strong id="pdfAName">
                        Open PDF A
                    </strong>

                    <span>
                        Base document
                    </span>
                </div>

                <span class="file-action">
                    Browse
                </span>

                <input
                    id="pdfAInput"
                    type="file"
                    accept="application/pdf"
                >

            </label>


            <div class="file-separator">
                <span>VS</span>
            </div>


            <label class="file-card file-card-b">

                <div class="file-badge">B</div>

                <div class="file-info">
                    <strong id="pdfBName">
                        Open PDF B
                    </strong>

                    <span>
                        Overlay document
                    </span>
                </div>

                <span class="file-action">
                    Browse
                </span>

                <input
                    id="pdfBInput"
                    type="file"
                    accept="application/pdf"
                >

            </label>

        </section>


        <!-- =================================================
             MAIN WORKSPACE
        ================================================== -->

        <main class="workspace">

            <div
                class="viewer"
                id="viewer"
            >

                <div class="workspace-background">
                    <div class="workspace-grid"></div>
                </div>


                <div class="comparison-stage">

                    <canvas id="pdfCanvasA"></canvas>

                    <canvas id="pdfCanvasB"></canvas>

                </div>


                <div
                    id="emptyState"
                    class="empty-state"
                >

                    <div class="empty-icon">
                        ⇄
                    </div>

                    <h2>
                        Start comparing PDFs
                    </h2>

                    <p>
                        Open two PDF files to overlay
                        and compare their pages.
                    </p>

                    <div class="empty-hint">
                        <span>Tip</span>
                        You can drag the active document
                        and use the mouse wheel to zoom.
                    </div>

                </div>


                <div class="viewer-badge viewer-badge-a">
                    <span>A</span>
                    PDF A
                </div>

                <div class="viewer-badge viewer-badge-b">
                    <span>B</span>
                    PDF B
                </div>

            </div>

        </main>


        <!-- =================================================
             COMPARISON BAR
        ================================================== -->

        <section class="comparison-bar">

            <!-- PDF A -->

            <div class="page-control">

                <div class="page-label layer-a">
                    <span>A</span>
                </div>

                <button
                    type="button"
                    id="previousPageA"
                    class="page-button"
                    title="Previous page"
                >
                    ◀
                </button>

                <div class="page-counter">
                    <strong id="pageA">0</strong>
                    <span>/</span>
                    <span id="countA">0</span>
                </div>

                <button
                    type="button"
                    id="nextPageA"
                    class="page-button"
                    title="Next page"
                >
                    ▶
                </button>

            </div>


            <!-- SYNC -->

            <div class="sync-control">

                <label class="sync-switch">

                    <input
                        id="pageSync"
                        type="checkbox"
                    >

                    <span class="switch-track">
                        <span class="switch-thumb"></span>
                    </span>

                    <span class="sync-text">
                        Sync Pages
                    </span>

                </label>

            </div>


            <!-- PDF B -->

            <div class="page-control">

                <div class="page-label layer-b">
                    <span>B</span>
                </div>

                <button
                    type="button"
                    id="previousPageB"
                    class="page-button"
                    title="Previous page"
                >
                    ◀
                </button>

                <div class="page-counter">
                    <strong id="pageB">0</strong>
                    <span>/</span>
                    <span id="countB">0</span>
                </div>

                <button
                    type="button"
                    id="nextPageB"
                    class="page-button"
                    title="Next page"
                >
                    ▶
                </button>

            </div>


            <div class="bar-divider"></div>


            <!-- OPACITY -->

            <div class="opacity-control">

                <div class="opacity-heading">
                    <span>Opacity B</span>

                    <strong id="opacityValue">
                        50%
                    </strong>
                </div>

                <div class="opacity-slider-wrap">

                    <span>0</span>

                    <input
                        id="opacityB"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value="0.5"
                    >

                    <span>100</span>

                </div>

            </div>

        </section>


        <!-- =================================================
             ADVANCED CONTROLS
        ================================================== -->

        <section
            id="controlPanel"
            class="control-panel"
        >

            <div class="control-panel-header">

                <div class="advanced-title">

                    <span class="advanced-icon">
                        ⚙
                    </span>

                    <div>
                        <strong>
                            Advanced Controls
                        </strong>

                        <span>
                            Position, scale and active layer
                        </span>
                    </div>

                </div>


                <button
                    id="hideControls"
                    type="button"
                    class="collapse-button"
                >
                    Hide Controls
                    <span>▼</span>
                </button>

            </div>


            <div class="controls">


                <!-- =================================================
                     PDF A
                ================================================== -->

                <div class="layer-panel">

                    <div class="layer-panel-header">

                        <div class="panel-layer-name layer-a">
                            A
                        </div>

                        <div>
                            <strong>PDF A</strong>
                            <span>Base document</span>
                        </div>

                    </div>


                    <div class="values">

                        <label class="value-control">
                            <span>X</span>

                            <input
                                id="xA"
                                type="number"
                                step="0.1"
                                value="0.0"
                            >
                        </label>


                        <label class="value-control">
                            <span>Y</span>

                            <input
                                id="yA"
                                type="number"
                                step="0.1"
                                value="30.0"
                            >
                        </label>


                        <label class="value-control scale-control">
                            <span>Scale</span>

                            <input
                                id="scaleA"
                                type="number"
                                step="0.001"
                                min="0.1"
                                max="5"
                                value="1.000"
                            >
                        </label>

                    </div>


                    <div class="control-section">

                        <span class="control-title">
                            Zoom
                        </span>

                        <div class="button-row">

                            <button
                                type="button"
                                id="zoomOutA"
                            >
                                −
                            </button>

                            <button
                                type="button"
                                id="resetZoomA"
                                class="reset-button"
                            >
                                Reset
                            </button>

                            <button
                                type="button"
                                id="zoomInA"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <div class="control-section position-section">

                        <span class="control-title">
                            Position
                        </span>

                        <div class="direction-grid">

                            <button
                                type="button"
                                id="moveUpA"
                            >
                                ↑
                            </button>

                            <button
                                type="button"
                                id="moveLeftA"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                id="moveRightA"
                            >
                                →
                            </button>

                            <button
                                type="button"
                                id="moveDownA"
                            >
                                ↓
                            </button>

                        </div>

                        <button
                            type="button"
                            class="reset-position"
                            id="resetPositionA"
                        >
                            Reset Position
                        </button>

                    </div>

                </div>


                <!-- =================================================
                     PDF B
                ================================================== -->

                <div class="layer-panel">

                    <div class="layer-panel-header">

                        <div class="panel-layer-name layer-b">
                            B
                        </div>

                        <div>
                            <strong>PDF B</strong>
                            <span>Overlay document</span>
                        </div>

                    </div>


                    <div class="values">

                        <label class="value-control">
                            <span>X</span>

                            <input
                                id="xB"
                                type="number"
                                step="0.1"
                                value="0.0"
                            >
                        </label>


                        <label class="value-control">
                            <span>Y</span>

                            <input
                                id="yB"
                                type="number"
                                step="0.1"
                                value="30.0"
                            >
                        </label>


                        <label class="value-control scale-control">
                            <span>Scale</span>

                            <input
                                id="scaleB"
                                type="number"
                                step="0.001"
                                min="0.1"
                                max="5"
                                value="1.000"
                            >
                        </label>

                    </div>


                    <div class="control-section">

                        <span class="control-title">
                            Zoom
                        </span>

                        <div class="button-row">

                            <button
                                type="button"
                                id="zoomOutB"
                            >
                                −
                            </button>

                            <button
                                type="button"
                                id="resetZoomB"
                                class="reset-button"
                            >
                                Reset
                            </button>

                            <button
                                type="button"
                                id="zoomInB"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <div class="control-section position-section">

                        <span class="control-title">
                            Position
                        </span>

                        <div class="direction-grid">

                            <button
                                type="button"
                                id="moveUpB"
                            >
                                ↑
                            </button>

                            <button
                                type="button"
                                id="moveLeftB"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                id="moveRightB"
                            >
                                →
                            </button>

                            <button
                                type="button"
                                id="moveDownB"
                            >
                                ↓
                            </button>

                        </div>

                        <button
                            type="button"
                            class="reset-position"
                            id="resetPositionB"
                        >
                            Reset Position
                        </button>

                    </div>

                </div>


                <!-- =================================================
                     ACTIVE LAYER
                ================================================== -->

                <div class="active-layer-control">

                    <div class="active-header">

                        <span class="active-icon">
                            ◉
                        </span>

                        <div>
                            <strong>
                                Active Layer
                            </strong>

                            <span>
                                Mouse controls apply to
                            </span>
                        </div>

                    </div>


                    <div class="layer-selector">

                        <label class="layer-radio layer-radio-a">

                            <input
                                type="radio"
                                name="activeLayer"
                                value="A"
                                checked
                            >

                            <span class="radio-mark"></span>

                            <span>
                                PDF A
                            </span>

                        </label>


                        <label class="layer-radio layer-radio-b">

                            <input
                                type="radio"
                                name="activeLayer"
                                value="B"
                            >

                            <span class="radio-mark"></span>

                            <span>
                                PDF B
                            </span>

                        </label>

                    </div>

                </div>

            </div>

        </section>


        <!-- =================================================
             SHOW CONTROLS
        ================================================== -->

        <button
            id="showControls"
            class="show-controls"
            type="button"
            hidden
        >
            ⚙ Show Controls
        </button>

    </div>
`;


// ==================================================
// DOM
// ==================================================

const viewer =
    document.querySelector('#viewer');

const pdfAInput =
    document.querySelector('#pdfAInput');

const pdfBInput =
    document.querySelector('#pdfBInput');

const pdfAName =
    document.querySelector('#pdfAName');

const pdfBName =
    document.querySelector('#pdfBName');

const pageA =
    document.querySelector('#pageA');

const countA =
    document.querySelector('#countA');

const pageB =
    document.querySelector('#pageB');

const countB =
    document.querySelector('#countB');

const xA =
    document.querySelector('#xA');

const yA =
    document.querySelector('#yA');

const scaleA =
    document.querySelector('#scaleA');

const xB =
    document.querySelector('#xB');

const yB =
    document.querySelector('#yB');

const scaleB =
    document.querySelector('#scaleB');

const opacityB =
    document.querySelector('#opacityB');

const opacityValue =
    document.querySelector('#opacityValue');

const emptyState =
    document.querySelector('#emptyState');

const canvasA =
    document.querySelector('#pdfCanvasA');

const canvasB =
    document.querySelector('#pdfCanvasB');

const controlPanel =
    document.querySelector('#controlPanel');

const hideControls =
    document.querySelector('#hideControls');

const showControls =
    document.querySelector('#showControls');

const pageSync =
    document.querySelector('#pageSync');


// ==================================================
// PAGE BUTTONS
// ==================================================

const previousPageA =
    document.querySelector('#previousPageA');

const nextPageA =
    document.querySelector('#nextPageA');

const previousPageB =
    document.querySelector('#previousPageB');

const nextPageB =
    document.querySelector('#nextPageB');


// ==================================================
// PDF LAYERS
// ==================================================

const layerA =
    new PdfLayer(canvasA);

const layerB =
    new PdfLayer(canvasB);


// ==================================================
// CONSTANTS
// ==================================================

const DEFAULT_X = 0;

const DEFAULT_Y = 30;

const DEFAULT_SCALE = 1;

const POSITION_STEP = 0.1;

const ZOOM_STEP = 0.001;

const MIN_SCALE = 0.1;

const MAX_SCALE = 5;


// ==================================================
// LONG PRESS
// ==================================================

const HOLD_DELAY = 300;

const HOLD_INTERVAL = 35;


// ==================================================
// INITIAL STATE
// ==================================================

layerA.setPosition(
    DEFAULT_X,
    DEFAULT_Y
);

layerB.setPosition(
    DEFAULT_X,
    DEFAULT_Y
);

layerA.setScale(
    DEFAULT_SCALE
);

layerB.setScale(
    DEFAULT_SCALE
);

layerA.setOpacity(1);

layerB.setOpacity(0.5);


// ==================================================
// ACTIVE LAYER
// ==================================================

let activeLayer =
    layerA;


// ==================================================
// PAN STATE
// ==================================================

let isDragging = false;

let dragStartX = 0;

let dragStartY = 0;

let layerStartX = 0;

let layerStartY = 0;


// ==================================================
// FILE A
// ==================================================

pdfAInput.addEventListener(
    'change',
    async (event) => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        try {

            await layerA.load(
                file,
                pdfjsLib
            );

            pdfAName.textContent =
                file.name;

            countA.textContent =
                layerA.document.numPages;

            updatePageInformation();

            updateLayerInformation();

            updatePageButtons();

            updateEmptyState();

        } catch (error) {

            console.error(
                'Failed to load PDF A:',
                error
            );

            alert(
                'Failed to load PDF A.'
            );
        }
    }
);


// ==================================================
// FILE B
// ==================================================

pdfBInput.addEventListener(
    'change',
    async (event) => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        try {

            await layerB.load(
                file,
                pdfjsLib
            );

            pdfBName.textContent =
                file.name;

            countB.textContent =
                layerB.document.numPages;

            updatePageInformation();

            updateLayerInformation();

            updatePageButtons();

            updateEmptyState();

        } catch (error) {

            console.error(
                'Failed to load PDF B:',
                error
            );

            alert(
                'Failed to load PDF B.'
            );
        }
    }
);


// ==================================================
// ACTIVE LAYER
// ==================================================

document
    .querySelectorAll(
        'input[name="activeLayer"]'
    )
    .forEach((radio) => {

        radio.addEventListener(
            'change',
            () => {

                if (!radio.checked) {
                    return;
                }

                activeLayer =
                    radio.value === 'A'
                        ? layerA
                        : layerB;

                document.body.dataset.activeLayer =
                    radio.value;
            }
        );
    });


// ==================================================
// PAGE SYNC
// ==================================================

pageSync.addEventListener(
    'change',
    () => {

        updatePageButtons();
    }
);


// ==================================================
// PAGE A
// ==================================================

previousPageA.addEventListener(
    'click',
    async () => {

        if (pageSync.checked) {

            await movePagesTogether(-1);

            return;
        }

        await layerA.previousPage();

        updatePageInformation();

        updatePageButtons();
    }
);


nextPageA.addEventListener(
    'click',
    async () => {

        if (pageSync.checked) {

            await movePagesTogether(1);

            return;
        }

        await layerA.nextPage();

        updatePageInformation();

        updatePageButtons();
    }
);


// ==================================================
// PAGE B
// ==================================================

previousPageB.addEventListener(
    'click',
    async () => {

        if (pageSync.checked) {

            await movePagesTogether(-1);

            return;
        }

        await layerB.previousPage();

        updatePageInformation();

        updatePageButtons();
    }
);


nextPageB.addEventListener(
    'click',
    async () => {

        if (pageSync.checked) {

            await movePagesTogether(1);

            return;
        }

        await layerB.nextPage();

        updatePageInformation();

        updatePageButtons();
    }
);


// ==================================================
// MOVE PAGES TOGETHER
// ==================================================

async function movePagesTogether(direction) {

    const hasA =
        Boolean(layerA.document);

    const hasB =
        Boolean(layerB.document);

    if (!hasA && !hasB) {
        return;
    }


    if (hasA && hasB) {

        const currentPage =
            Math.max(
                layerA.page,
                layerB.page
            );

        let targetPage =
            currentPage + direction;

        const maxPage =
            Math.max(
                layerA.document.numPages,
                layerB.document.numPages
            );

        targetPage =
            Math.max(
                1,
                Math.min(
                    maxPage,
                    targetPage
                )
            );

        const promises = [];


        if (
            targetPage <=
            layerA.document.numPages
        ) {

            promises.push(
                layerA.setPage(targetPage)
            );
        }


        if (
            targetPage <=
            layerB.document.numPages
        ) {

            promises.push(
                layerB.setPage(targetPage)
            );
        }


        await Promise.all(promises);
    }


    else if (hasA) {

        await layerA.setPage(
            Math.max(
                1,
                Math.min(
                    layerA.document.numPages,
                    layerA.page + direction
                )
            )
        );
    }


    else if (hasB) {

        await layerB.setPage(
            Math.max(
                1,
                Math.min(
                    layerB.document.numPages,
                    layerB.page + direction
                )
            )
        );
    }


    updatePageInformation();

    updatePageButtons();
}


// ==================================================
// OPACITY
// ==================================================

opacityB.addEventListener(
    'input',
    () => {

        const value =
            Number(opacityB.value);

        layerB.setOpacity(value);

        opacityValue.textContent =
            `${Math.round(value * 100)}%`;
    }
);


// ==================================================
// MOUSE PAN
// ==================================================

viewer.addEventListener(
    'pointerdown',
    (event) => {

        if (event.button !== 0) {
            return;
        }

        if (!activeLayer.document) {
            return;
        }

        isDragging = true;

        dragStartX =
            event.clientX;

        dragStartY =
            event.clientY;

        layerStartX =
            activeLayer.x;

        layerStartY =
            activeLayer.y;

        viewer.setPointerCapture(
            event.pointerId
        );

        viewer.classList.add(
            'dragging'
        );
    }
);


viewer.addEventListener(
    'pointermove',
    (event) => {

        if (!isDragging) {
            return;
        }

        const deltaX =
            event.clientX -
            dragStartX;

        const deltaY =
            event.clientY -
            dragStartY;

        activeLayer.setPosition(
            layerStartX + deltaX,
            layerStartY + deltaY
        );

        updateLayerInformation();
    }
);


viewer.addEventListener(
    'pointerup',
    (event) => {

        if (!isDragging) {
            return;
        }

        isDragging = false;

        viewer.releasePointerCapture(
            event.pointerId
        );

        viewer.classList.remove(
            'dragging'
        );
    }
);


viewer.addEventListener(
    'pointercancel',
    () => {

        isDragging = false;

        viewer.classList.remove(
            'dragging'
        );
    }
);


// ==================================================
// MOUSE WHEEL ZOOM
// ==================================================

viewer.addEventListener(
    'wheel',
    (event) => {

        if (!activeLayer.document) {
            return;
        }

        event.preventDefault();

        const rect =
            viewer.getBoundingClientRect();

        const mouseX =
            event.clientX -
            rect.left;

        const mouseY =
            event.clientY -
            rect.top;

        const zoomFactor =
            event.deltaY < 0
                ? 1.1
                : 0.9;

        setLayerScaleAroundPoint(
            activeLayer,
            activeLayer.scale * zoomFactor,
            mouseX,
            mouseY
        );

        updateLayerInformation();
    },
    {
        passive: false
    }
);


// ==================================================
// HOLDABLE BUTTON
// ==================================================

function addHoldAction(
    button,
    action
) {

    let intervalId = null;

    let holdTimeoutId = null;

    let isHolding = false;


    function stopHolding() {

        if (holdTimeoutId !== null) {

            clearTimeout(
                holdTimeoutId
            );

            holdTimeoutId = null;
        }


        if (intervalId !== null) {

            clearInterval(
                intervalId
            );

            intervalId = null;
        }

        isHolding = false;

        button.classList.remove(
            'holding'
        );
    }


    function startHolding() {

        if (isHolding) {
            return;
        }

        isHolding = true;

        button.classList.add(
            'holding'
        );


        holdTimeoutId =
            setTimeout(
                () => {

                    holdTimeoutId =
                        null;

                    action();

                    intervalId =
                        setInterval(
                            action,
                            HOLD_INTERVAL
                        );
                },
                HOLD_DELAY
            );
    }


    button.addEventListener(
        'pointerdown',
        (event) => {

            if (
                event.pointerType ===
                'mouse' &&
                event.button !== 0
            ) {
                return;
            }

            event.preventDefault();

            button.setPointerCapture(
                event.pointerId
            );

            action();

            startHolding();
        }
    );


    button.addEventListener(
        'pointerup',
        (event) => {

            stopHolding();

            if (
                button.hasPointerCapture(
                    event.pointerId
                )
            ) {

                button.releasePointerCapture(
                    event.pointerId
                );
            }
        }
    );


    button.addEventListener(
        'pointercancel',
        stopHolding
    );


    button.addEventListener(
        'lostpointercapture',
        stopHolding
    );


    button.addEventListener(
        'contextmenu',
        (event) => {

            event.preventDefault();
        }
    );
}


// ==================================================
// ZOOM BUTTONS
// ==================================================

addHoldAction(
    document.querySelector('#zoomInA'),
    () => {

        changeLayerScale(
            layerA,
            ZOOM_STEP
        );
    }
);


addHoldAction(
    document.querySelector('#zoomOutA'),
    () => {

        changeLayerScale(
            layerA,
            -ZOOM_STEP
        );
    }
);


addHoldAction(
    document.querySelector('#zoomInB'),
    () => {

        changeLayerScale(
            layerB,
            ZOOM_STEP
        );
    }
);


addHoldAction(
    document.querySelector('#zoomOutB'),
    () => {

        changeLayerScale(
            layerB,
            -ZOOM_STEP
        );
    }
);


// ==================================================
// RESET ZOOM
// ==================================================

document
    .querySelector('#resetZoomA')
    .addEventListener(
        'click',
        () => {

            resetLayerZoom(layerA);
        }
    );


document
    .querySelector('#resetZoomB')
    .addEventListener(
        'click',
        () => {

            resetLayerZoom(layerB);
        }
    );


// ==================================================
// POSITION A
// ==================================================

addHoldAction(
    document.querySelector('#moveUpA'),
    () => {

        moveLayer(
            layerA,
            0,
            -POSITION_STEP
        );
    }
);


addHoldAction(
    document.querySelector('#moveDownA'),
    () => {

        moveLayer(
            layerA,
            0,
            POSITION_STEP
        );
    }
);


addHoldAction(
    document.querySelector('#moveLeftA'),
    () => {

        moveLayer(
            layerA,
            -POSITION_STEP,
            0
        );
    }
);


addHoldAction(
    document.querySelector('#moveRightA'),
    () => {

        moveLayer(
            layerA,
            POSITION_STEP,
            0
        );
    }
);


// ==================================================
// POSITION B
// ==================================================

addHoldAction(
    document.querySelector('#moveUpB'),
    () => {

        moveLayer(
            layerB,
            0,
            -POSITION_STEP
        );
    }
);


addHoldAction(
    document.querySelector('#moveDownB'),
    () => {

        moveLayer(
            layerB,
            0,
            POSITION_STEP
        );
    }
);


addHoldAction(
    document.querySelector('#moveLeftB'),
    () => {

        moveLayer(
            layerB,
            -POSITION_STEP,
            0
        );
    }
);


addHoldAction(
    document.querySelector('#moveRightB'),
    () => {

        moveLayer(
            layerB,
            POSITION_STEP,
            0
        );
    }
);


// ==================================================
// RESET POSITION
// ==================================================

document
    .querySelector('#resetPositionA')
    .addEventListener(
        'click',
        () => {

            resetLayerPosition(layerA);
        }
    );


document
    .querySelector('#resetPositionB')
    .addEventListener(
        'click',
        () => {

            resetLayerPosition(layerB);
        }
    );


// ==================================================
// DIRECT VALUE INPUTS
// ==================================================

function applyInputValue(
    input,
    callback
) {

    function apply() {

        const value =
            Number(input.value);

        if (!Number.isFinite(value)) {

            updateLayerInformation();

            return;
        }

        callback(value);

        updateLayerInformation();
    }


    input.addEventListener(
        'change',
        apply
    );


    input.addEventListener(
        'keydown',
        (event) => {

            if (
                event.key === 'Enter'
            ) {

                event.preventDefault();

                apply();

                input.blur();
            }
        }
    );


    input.addEventListener(
        'blur',
        apply
    );
}


// ==================================================
// INPUTS A
// ==================================================

applyInputValue(
    xA,
    (value) => {

        layerA.setPosition(
            value,
            layerA.y
        );
    }
);


applyInputValue(
    yA,
    (value) => {

        layerA.setPosition(
            layerA.x,
            value
        );
    }
);


applyInputValue(
    scaleA,
    (value) => {

        const newScale =
            Math.max(
                MIN_SCALE,
                Math.min(
                    MAX_SCALE,
                    value
                )
            );

        layerA.setScale(
            Number(
                newScale.toFixed(3)
            )
        );
    }
);


// ==================================================
// INPUTS B
// ==================================================

applyInputValue(
    xB,
    (value) => {

        layerB.setPosition(
            value,
            layerB.y
        );
    }
);


applyInputValue(
    yB,
    (value) => {

        layerB.setPosition(
            layerB.x,
            value
        );
    }
);


applyInputValue(
    scaleB,
    (value) => {

        const newScale =
            Math.max(
                MIN_SCALE,
                Math.min(
                    MAX_SCALE,
                    value
                )
            );

        layerB.setScale(
            Number(
                newScale.toFixed(3)
            )
        );
    }
);


// ==================================================
// CONTROL PANEL VISIBILITY
// ==================================================

hideControls.addEventListener(
    'click',
    () => {

        controlPanel.hidden =
            true;

        showControls.hidden =
            false;
    }
);


showControls.addEventListener(
    'click',
    () => {

        controlPanel.hidden =
            false;

        showControls.hidden =
            true;
    }
);


// ==================================================
// CHANGE SCALE
// ==================================================

function changeLayerScale(
    layer,
    delta
) {

    const newScale =
        Math.max(
            MIN_SCALE,
            Math.min(
                MAX_SCALE,
                layer.scale + delta
            )
        );

    layer.setScale(
        Number(
            newScale.toFixed(3)
        )
    );

    updateLayerInformation();
}


// ==================================================
// RESET ZOOM
// ==================================================

function resetLayerZoom(
    layer
) {

    layer.setScale(
        DEFAULT_SCALE
    );

    updateLayerInformation();
}


// ==================================================
// MOVE
// ==================================================

function moveLayer(
    layer,
    deltaX,
    deltaY
) {

    layer.setPosition(
        Number(
            (
                layer.x +
                deltaX
            ).toFixed(1)
        ),
        Number(
            (
                layer.y +
                deltaY
            ).toFixed(1)
        )
    );

    updateLayerInformation();
}


// ==================================================
// RESET POSITION
// ==================================================

function resetLayerPosition(
    layer
) {

    layer.setPosition(
        DEFAULT_X,
        DEFAULT_Y
    );

    updateLayerInformation();
}


// ==================================================
// SCALE AROUND POINT
// ==================================================

function setLayerScaleAroundPoint(
    layer,
    requestedScale,
    mouseX,
    mouseY
) {

    const oldScale =
        layer.scale;

    const newScale =
        Math.max(
            MIN_SCALE,
            Math.min(
                MAX_SCALE,
                requestedScale
            )
        );

    const stageX =
        viewer.clientWidth / 2;

    const stageY =
        DEFAULT_Y;

    const localX =
        (
            mouseX -
            stageX -
            layer.x
        ) / oldScale;

    const localY =
        (
            mouseY -
            stageY -
            layer.y
        ) / oldScale;

    const newX =
        mouseX -
        stageX -
        localX * newScale;

    const newY =
        mouseY -
        stageY -
        localY * newScale;

    layer.setScale(
        newScale
    );

    layer.setPosition(
        newX,
        newY
    );
}


// ==================================================
// PAGE INFORMATION
// ==================================================

function updatePageInformation() {

    pageA.textContent =
        layerA.document
            ? layerA.page
            : 0;

    countA.textContent =
        layerA.document
            ? layerA.document.numPages
            : 0;

    pageB.textContent =
        layerB.document
            ? layerB.page
            : 0;

    countB.textContent =
        layerB.document
            ? layerB.document.numPages
            : 0;
}


// ==================================================
// PAGE BUTTONS
// ==================================================

function updatePageButtons() {

    if (!pageSync.checked) {

        if (layerA.document) {

            previousPageA.disabled =
                layerA.page <= 1;

            nextPageA.disabled =
                layerA.page >=
                layerA.document.numPages;

        } else {

            previousPageA.disabled = true;

            nextPageA.disabled = true;
        }


        if (layerB.document) {

            previousPageB.disabled =
                layerB.page <= 1;

            nextPageB.disabled =
                layerB.page >=
                layerB.document.numPages;

        } else {

            previousPageB.disabled = true;

            nextPageB.disabled = true;
        }

        return;
    }


    const hasA =
        Boolean(layerA.document);

    const hasB =
        Boolean(layerB.document);


    if (!hasA && !hasB) {

        previousPageA.disabled = true;
        nextPageA.disabled = true;

        previousPageB.disabled = true;
        nextPageB.disabled = true;

        return;
    }


    const currentPage =
        Math.max(
            hasA ? layerA.page : 0,
            hasB ? layerB.page : 0
        );


    const maxPage =
        Math.max(
            hasA
                ? layerA.document.numPages
                : 0,

            hasB
                ? layerB.document.numPages
                : 0
        );


    const canPrevious =
        currentPage > 1;

    const canNext =
        currentPage < maxPage;


    previousPageA.disabled =
        !hasA || !canPrevious;

    nextPageA.disabled =
        !hasA || !canNext;

    previousPageB.disabled =
        !hasB || !canPrevious;

    nextPageB.disabled =
        !hasB || !canNext;
}


// ==================================================
// INFORMATION
// ==================================================

function updateLayerInformation() {

    xA.value =
        layerA.x.toFixed(1);

    yA.value =
        layerA.y.toFixed(1);

    scaleA.value =
        layerA.scale.toFixed(3);


    xB.value =
        layerB.x.toFixed(1);

    yB.value =
        layerB.y.toFixed(1);

    scaleB.value =
        layerB.scale.toFixed(3);
}


// ==================================================
// EMPTY STATE
// ==================================================

function updateEmptyState() {

    if (
        layerA.document ||
        layerB.document
    ) {

        emptyState.hidden =
            true;
    }
}


// ==================================================
// INITIAL UI
// ==================================================

document.body.dataset.activeLayer = 'A';

updateLayerInformation();

updatePageInformation();

updatePageButtons();