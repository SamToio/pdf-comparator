import './style.css';
import * as pdfjsLib from 'pdfjs-dist';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const app = document.querySelector('#app');

app.innerHTML = `
    <div class="app">
        <header class="toolbar">
            <h1>PDF Comparator</h1>

            <label class="file-button">
                Open PDF
                <input id="pdfInput" type="file" accept="application/pdf">
            </label>

            <div class="page-controls">
                <button id="previousPage" disabled>←</button>

                <span>
                    Page
                    <strong id="pageNumber">0</strong>
                    /
                    <strong id="pageCount">0</strong>
                </span>

                <button id="nextPage" disabled>→</button>
            </div>
        </header>

        <main class="viewer-container">
            <div class="viewer">
                <canvas id="pdfCanvas"></canvas>

                <div id="emptyState" class="empty-state">
                    <h2>No PDF selected</h2>
                    <p>Choose a PDF file to start.</p>
                </div>
            </div>
        </main>
    </div>
`;

const pdfInput = document.querySelector('#pdfInput');
const canvas = document.querySelector('#pdfCanvas');
const context = canvas.getContext('2d');

const previousPageButton = document.querySelector('#previousPage');
const nextPageButton = document.querySelector('#nextPage');

const pageNumberElement = document.querySelector('#pageNumber');
const pageCountElement = document.querySelector('#pageCount');

const emptyState = document.querySelector('#emptyState');

let pdfDocument = null;
let currentPage = 1;
let rendering = false;
let pendingPage = null;

async function renderPage(pageNumber) {
    if (!pdfDocument) {
        return;
    }

    if (rendering) {
        pendingPage = pageNumber;
        return;
    }

    rendering = true;

    const page = await pdfDocument.getPage(pageNumber);

    const viewport = page.getViewport({
        scale: 1.5
    });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
        canvasContext: context,
        viewport
    }).promise;

    pageNumberElement.textContent = currentPage;

    rendering = false;

    if (pendingPage !== null) {
        const nextPage = pendingPage;
        pendingPage = null;

        await renderPage(nextPage);
    }
}

async function loadPdf(file) {
    const arrayBuffer = await file.arrayBuffer();

    pdfDocument = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;

    currentPage = 1;

    pageCountElement.textContent = pdfDocument.numPages;

    previousPageButton.disabled = true;
    nextPageButton.disabled = pdfDocument.numPages <= 1;

    emptyState.hidden = true;
    canvas.hidden = false;

    await renderPage(currentPage);
}

pdfInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    if (file.type !== 'application/pdf') {
        alert('Please select a PDF file.');
        return;
    }

    try {
        await loadPdf(file);
    } catch (error) {
        console.error('Failed to load PDF:', error);
        alert('Failed to load the PDF file.');
    }
});

previousPageButton.addEventListener('click', async () => {
    if (!pdfDocument || currentPage <= 1) {
        return;
    }

    currentPage--;

    previousPageButton.disabled = currentPage <= 1;
    nextPageButton.disabled = false;

    await renderPage(currentPage);
});

nextPageButton.addEventListener('click', async () => {
    if (!pdfDocument || currentPage >= pdfDocument.numPages) {
        return;
    }

    currentPage++;

    nextPageButton.disabled = currentPage >= pdfDocument.numPages;
    previousPageButton.disabled = false;

    await renderPage(currentPage);
});

canvas.hidden = true;