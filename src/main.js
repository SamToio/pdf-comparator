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

        <main class="viewer-container">

            <div class="viewer">

                <div class="comparison-stage">

                    <canvas id="pdfCanvasA"></canvas>

                    <canvas id="pdfCanvasB"></canvas>

                </div>

                <div id="emptyState" class="empty-state">
                    <h2>Open two PDF files</h2>
                    <p>
                        The second PDF will appear above the first one.
                    </p>
                </div>

            </div>

        </main>

        <section class="controls">

            <div class="layer-control">
                <strong>PDF A</strong>

                <span>
                    Page:
                    <strong id="pageA">0</strong>
                    /
                    <strong id="countA">0</strong>
                </span>
            </div>

            <div class="layer-control">
                <strong>PDF B</strong>

                <span>
                    Page:
                    <strong id="pageB">0</strong>
                    /
                    <strong id="countB">0</strong>
                </span>

                <label>
                    Opacity:
                    <input
                        id="opacityB"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value="0.5"
                    >

                    <span id="opacityValue">50%</span>
                </label>
            </div>

        </section>

    </div>
`;

const pdfAInput = document.querySelector('#pdfAInput');
const pdfBInput = document.querySelector('#pdfBInput');

const pdfAName = document.querySelector('#pdfAName');
const pdfBName = document.querySelector('#pdfBName');

const pageA = document.querySelector('#pageA');
const countA = document.querySelector('#countA');

const pageB = document.querySelector('#pageB');
const countB = document.querySelector('#countB');

const opacityB = document.querySelector('#opacityB');
const opacityValue = document.querySelector('#opacityValue');

const emptyState = document.querySelector('#emptyState');

const canvasA = document.querySelector('#pdfCanvasA');
const canvasB = document.querySelector('#pdfCanvasB');

const layerA = new PdfLayer(canvasA);
const layerB = new PdfLayer(canvasB);

layerA.setPosition(0, 30);
layerB.setPosition(0, 30);

layerA.setScale(1);
layerB.setScale(1);

layerA.setOpacity(1);
layerB.setOpacity(0.5);

pdfAInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    try {
        await layerA.load(file, pdfjsLib);

        pdfAName.textContent = file.name;
        pageA.textContent = layerA.page;
        countA.textContent = layerA.document.numPages;

        updateEmptyState();
    } catch (error) {
        console.error('Failed to load PDF A:', error);
        alert('Failed to load PDF A.');
    }
});

pdfBInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    try {
        await layerB.load(file, pdfjsLib);

        pdfBName.textContent = file.name;
        pageB.textContent = layerB.page;
        countB.textContent = layerB.document.numPages;

        updateEmptyState();
    } catch (error) {
        console.error('Failed to load PDF B:', error);
        alert('Failed to load PDF B.');
    }
});

opacityB.addEventListener('input', () => {
    const value = Number(opacityB.value);

    layerB.setOpacity(value);

    opacityValue.textContent = `${Math.round(value * 100)}%`;
});

function updateEmptyState() {
    if (layerA.document || layerB.document) {
        emptyState.hidden = true;
    }
}