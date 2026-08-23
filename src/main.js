import './style.css';

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

import { PdfLayer } from './PdfLayer.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const app = document.querySelector('#app');

app.innerHTML = `
    <div class="app">

        <header class="toolbar">
            <h1>PDF Comparator</h1>
        </header>

        <section class="file-toolbar">

            <div class="file-control">
                <label class="file-button">
                    Open PDF A

                    <input
                        id="pdfAInput"
                        type="file"
                        accept="application/pdf"
                    >
                </label>

                <span id="pdfAName">
                    No file selected
                </span>
            </div>

            <div class="file-control">
                <label class="file-button">
                    Open PDF B

                    <input
                        id="pdfBInput"
                        type="file"
                        accept="application/pdf"
                    >
                </label>

                <span id="pdfBName">
                    No file selected
                </span>
            </div>

        </section>

        <!-- =========================================
             VIEWER
        ========================================== -->

        <main class="viewer-container">

            <div class="viewer" id="viewer">

                <div class="comparison-stage">

                    <canvas id="pdfCanvasA"></canvas>

                    <canvas id="pdfCanvasB"></canvas>

                </div>

                <div
                    id="emptyState"
                    class="empty-state"
                >
                    <h2>Open two PDF files</h2>

                    <p>
                        The second PDF will appear
                        above the first one.
                    </p>
                </div>

            </div>

        </main>


        <!-- =========================================
             CONTROL PANEL
        ========================================== -->

        <section
            id="controlPanel"
            class="control-panel"
        >

            <div class="control-panel-header">

                <strong>
                    PDF Comparison Controls
                </strong>

                <button
                    id="hideControls"
                    type="button"
                >
                    Hide Controls ▲
                </button>

            </div>


            <div class="controls">


                <!-- =====================================
                     PDF A
                ====================================== -->

                <div class="layer-panel">

                    <div class="panel-header">

                        <strong>PDF A</strong>

                        <span>
                            Page:
                            <strong id="pageA">0</strong>
                            /
                            <strong id="countA">0</strong>
                        </span>

                    </div>


                    <div class="values">

                        <span>
                            X:
                            <strong id="xA">
                                0.0
                            </strong>
                        </span>

                        <span>
                            Y:
                            <strong id="yA">
                                30.0
                            </strong>
                        </span>

                        <span>
                            Scale:
                            <strong id="scaleA">
                                1.000
                            </strong>
                        </span>

                    </div>


                    <div class="control-group">

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


                    <div class="control-group">

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


                <!-- =====================================
                     PDF B
                ====================================== -->

                <div class="layer-panel">

                    <div class="panel-header">

                        <strong>PDF B</strong>

                        <span>
                            Page:
                            <strong id="pageB">0</strong>
                            /
                            <strong id="countB">0</strong>
                        </span>

                    </div>


                    <div class="values">

                        <span>
                            X:
                            <strong id="xB">
                                0.0
                            </strong>
                        </span>

                        <span>
                            Y:
                            <strong id="yB">
                                30.0
                            </strong>
                        </span>

                        <span>
                            Scale:
                            <strong id="scaleB">
                                1.000
                            </strong>
                        </span>

                    </div>


                    <div class="control-group">

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


                    <div class="control-group">

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


                    <div class="control-group">

                        <span class="control-title">
                            Opacity
                        </span>

                        <div class="opacity-control">

                            <input
                                id="opacityB"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value="0.5"
                            >

                            <span id="opacityValue">
                                50%
                            </span>

                        </div>

                    </div>

                </div>


                <!-- =====================================
                     ACTIVE LAYER
                ====================================== -->

                <div class="active-layer-control">

                    <strong>
                        Active Layer
                    </strong>

                    <label>
                        <input
                            type="radio"
                            name="activeLayer"
                            value="A"
                            checked
                        >

                        PDF A
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="activeLayer"
                            value="B"
                        >

                        PDF B
                    </label>

                </div>

            </div>

        </section>


        <!-- =========================================
             SHOW CONTROLS
        ========================================== -->

        <button
            id="showControls"
            class="show-controls"
            type="button"
            hidden
        >
            Show Controls ▼
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

            pageA.textContent =
                layerA.page;

            countA.textContent =
                layerA.document.numPages;

            updateLayerInformation();

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

            pageB.textContent =
                layerB.page;

            countB.textContent =
                layerB.document.numPages;

            updateLayerInformation();

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
            }
        );
    });


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
            activeLayer.scale *
                zoomFactor,
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
// ZOOM BUTTONS
// ==================================================

document
    .querySelector('#zoomInA')
    .addEventListener(
        'click',
        () => {

            changeLayerScale(
                layerA,
                ZOOM_STEP
            );
        }
    );


document
    .querySelector('#zoomOutA')
    .addEventListener(
        'click',
        () => {

            changeLayerScale(
                layerA,
                -ZOOM_STEP
            );
        }
    );


document
    .querySelector('#zoomInB')
    .addEventListener(
        'click',
        () => {

            changeLayerScale(
                layerB,
                ZOOM_STEP
            );
        }
    );


document
    .querySelector('#zoomOutB')
    .addEventListener(
        'click',
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

document
    .querySelector('#moveUpA')
    .addEventListener(
        'click',
        () => {

            moveLayer(
                layerA,
                0,
                -POSITION_STEP
            );
        }
    );


document
    .querySelector('#moveDownA')
    .addEventListener(
        'click',
        () => {

            moveLayer(
                layerA,
                0,
                POSITION_STEP
            );
        }
    );


document
    .querySelector('#moveLeftA')
    .addEventListener(
        'click',
        () => {

            moveLayer(
                layerA,
                -POSITION_STEP,
                0
            );
        }
    );


document
    .querySelector('#moveRightA')
    .addEventListener(
        'click',
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

document
    .querySelector('#moveUpB')
    .addEventListener(
        'click',
        () => {

            moveLayer(
                layerB,
                0,
                -POSITION_STEP
            );
        }
    );


document
    .querySelector('#moveDownB')
    .addEventListener(
        'click',
        () => {

            moveLayer(
                layerB,
                0,
                POSITION_STEP
            );
        }
    );


document
    .querySelector('#moveLeftB')
    .addEventListener(
        'click',
        () => {

            moveLayer(
                layerB,
                -POSITION_STEP,
                0
            );
        }
    );


document
    .querySelector('#moveRightB')
    .addEventListener(
        'click',
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

            resetLayerPosition(
                layerA
            );
        }
    );


document
    .querySelector('#resetPositionB')
    .addEventListener(
        'click',
        () => {

            resetLayerPosition(
                layerB
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
// INFORMATION
// ==================================================

function updateLayerInformation() {

    xA.textContent =
        layerA.x.toFixed(1);

    yA.textContent =
        layerA.y.toFixed(1);

    scaleA.textContent =
        layerA.scale.toFixed(3);

    xB.textContent =
        layerB.x.toFixed(1);

    yB.textContent =
        layerB.y.toFixed(1);

    scaleB.textContent =
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

updateLayerInformation();