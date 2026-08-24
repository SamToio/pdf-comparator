# PDF Comparator

> A modern, browser-based PDF comparison tool for precise visual comparison of two PDF documents through real-time overlay.

PDF Comparator allows you to place one PDF directly on top of another and visually inspect differences with precise control over **opacity, position, scale, page navigation, and synchronization**.

Designed for fast, accurate, and distraction-free document comparison — entirely in the browser.

---

## ✨ Features

- 📄 **Dual PDF Viewer**
  - Load two PDF documents simultaneously.
  - Display one document directly over the other.

- 🎚️ **Opacity Control**
  - Adjust the top PDF transparency in real time.
  - Quickly reveal differences between documents.

- 🔍 **Independent Zoom**
  - Zoom each PDF independently.
  - Fine-grained scale control for accurate alignment.

- 🖱️ **Precise Positioning**
  - Move either PDF independently.
  - Drag documents directly inside the comparison workspace.
  - Fine-tune X/Y coordinates numerically.

- 📑 **Independent Page Navigation**
  - Navigate through each PDF independently.
  - Easily compare different pages between documents.

- 🔄 **Page Synchronization**
  - Synchronize both PDFs and navigate their pages together.

- 🎯 **Active Layer Selection**
  - Select which PDF should respond to mouse interactions.

- ⚡ **Hold-to-Repeat Controls**
  - Hold zoom or movement buttons for continuous adjustment.

- 🖥️ **Workspace-Focused Interface**
  - Designed to maximize the comparison workspace.
  - Controls remain accessible without unnecessarily reducing the working area.

- 🔒 **Client-Side Processing**
  - PDFs are processed locally in the browser.
  - No document upload is required.

---

## 🎯 Use Cases

PDF Comparator can be useful for:

- Comparing different versions of textbooks
- Reviewing document revisions
- Comparing scanned documents
- Checking layout changes
- Comparing educational materials
- Verifying PDF formatting
- Detecting visual differences between document versions
- Aligning two versions of the same document
- Inspecting changes in page layouts

---

## 🖼️ How It Works

The tool uses a simple overlay-based comparison workflow:

```text
        PDF A
          │
          ▼
   ┌───────────────┐
   │               │
   │   PDF B       │
   │   Overlay     │
   │               │
   └───────────────┘
          │
          ▼
   Adjust:
   • Position
   • Scale
   • Opacity
   • Pages

PDF A acts as the underlying document, while PDF B is rendered directly above it.

By adjusting the opacity of PDF B, differences between the two documents become immediately visible.

Both layers maintain their own position, scale, page, and rendering state.

---

## 🛠️ Tech Stack

PDF Comparator is built using lightweight browser technologies:

| Technology              | Purpose                              |
| ----------------------- | ------------------------------------ |
| JavaScript (ES Modules) | Application logic and interaction    |
| PDF.js                  | PDF parsing and rendering            |
| HTML5                   | Application structure                |
| CSS3                    | Interface and responsive layout      |
| Vite                    | Development server and build tooling |

### Core Dependency

* [`pdfjs-dist`](https://www.npmjs.com/package/pdfjs-dist)

---

## 🏗️ Architecture

The project separates PDF rendering logic from application-level interaction and interface logic.

### `PdfLayer.js`

Encapsulates the state and rendering behavior of an individual PDF layer.

Each layer manages:

* PDF document
* Current page
* Position
* Scale
* Opacity
* Page rendering

### `main.js`

Handles:

* Application initialization
* DOM interaction
* File loading
* Page navigation
* Page synchronization
* Layer selection
* Mouse dragging
* Wheel zoom
* Control interactions
* UI state updates

### `style.css`

Handles:

* Application layout
* Comparison workspace
* Toolbars
* Controls
* Responsive behavior
* Visual states
* Interaction styling

This separation keeps the PDF rendering layer independent from the application UI.

---

## 📁 Project Structure

```text
pdf-comparator/
│
├── src/
│   ├── main.js
│   ├── PdfLayer.js
│   └── style.css
│
├── public/
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

Verify your installation:

```bash
node --version
npm --version
git --version
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/SamToio/pdf-comparator.git
```

Navigate into the project directory:

```bash
cd pdf-comparator
```

Install the project dependencies:

```bash
npm install
```

---

## ▶️ Development

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

Open the provided URL in your browser.

---

## 🏭 Production Build

Create an optimized production build:

```bash
npm run build
```

---

## 👀 Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## 📖 Usage

### 1. Open PDF A

Select the first document using:

```text
Open PDF A
```

PDF A becomes the underlying comparison layer.

### 2. Open PDF B

Select the second document using:

```text
Open PDF B
```

PDF B is rendered directly above PDF A.

### 3. Adjust Opacity

Use the opacity slider to control the transparency of PDF B.

```text
100%  → PDF B fully visible
50%   → Both documents visible
0%    → PDF B invisible
```

A value around `50%` is useful for quickly identifying visual differences.

### 4. Align the Documents

Select the desired active layer and drag it inside the comparison workspace.

For precise positioning, use:

```text
X
Y
Scale
```

You can also use the directional controls to make small adjustments.

### 5. Adjust Zoom

Use the zoom controls:

```text
−    Reset    +
```

You can also use the mouse wheel inside the comparison workspace.

### 6. Navigate Pages

Each PDF has independent page navigation:

```text
PDF A   ◀   12 / 40   ▶

PDF B   ◀   12 / 38   ▶
```

This allows different pages to be compared when necessary.

### 7. Enable Page Sync

Enable:

```text
Page Sync
```

to navigate both PDFs together.

This is especially useful when comparing different versions of the same document.

---

## 🎛️ Controls

| Control            | Description                                  |
| ------------------ | -------------------------------------------- |
| Open PDF A         | Load the first PDF                           |
| Open PDF B         | Load the second PDF                          |
| Previous / Next    | Navigate PDF pages                           |
| Page Sync          | Synchronize page navigation                  |
| Opacity            | Adjust PDF B transparency                    |
| X                  | Horizontal layer position                    |
| Y                  | Vertical layer position                      |
| Scale              | Layer scale                                  |
| Zoom + / −         | Adjust layer scale                           |
| Reset Zoom         | Restore default scale                        |
| Direction Controls | Move a PDF precisely                         |
| Reset Position     | Restore default position                     |
| Active Layer       | Select PDF A or PDF B for direct interaction |
| Hide Controls      | Hide the control panel                       |
| Show Controls      | Restore the control panel                    |

---

## 🔐 Privacy

PDF Comparator is designed around client-side processing.

Selected PDF documents are loaded directly into the browser and rendered using PDF.js.

The core comparison workflow does not require uploading PDF files to a remote server.

Your documents can therefore remain on your local device during the comparison process.

---

## 🎯 Design Principles

PDF Comparator is built around several core principles:

### Workspace First

The comparison area receives the largest possible portion of the interface.

### Minimal Distraction

Controls are available when needed without unnecessarily occupying the workspace.

### Precise Control

Users can combine direct manipulation with numerical controls for accurate alignment.

### Independent Layers

Each PDF maintains its own state, allowing both documents to be controlled independently.

### Lightweight Architecture

The application relies on browser technologies without requiring a backend service for the core comparison workflow.

---

## 🗺️ Roadmap

Potential future improvements include:

* Automatic document alignment
* Difference highlighting
* Side-by-side comparison mode
* Keyboard shortcuts
* Fullscreen comparison mode
* Page thumbnails
* Touch optimization
* Comparison session persistence
* Export comparison results
* Advanced alignment tools
* Additional comparison modes

The roadmap may evolve as the project develops.

---

## 🤝 Contributing

Contributions, suggestions, bug reports, and improvements are welcome.

### Fork the repository

Create a fork of the project on GitHub.

### Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/pdf-comparator.git
```

### Create a feature branch

```bash
git checkout -b feature/my-feature
```

### Make your changes

Implement and test your changes locally.

### Commit your changes

```bash
git add .
git commit -m "feat: add my feature"
```

### Push your branch

```bash
git push origin feature/my-feature
```

Then open a Pull Request describing your changes.

---

## 🐛 Issues

If you discover a bug or have an idea for an improvement, please open an issue in the GitHub repository.

When reporting an issue, include:

* Browser and version
* Operating system
* Steps to reproduce the problem
* Expected behavior
* Actual behavior
* Screenshots when applicable

---

## 📄 License

This project is currently available for personal and educational use.

See the repository for licensing details.

---

## ⭐ Support

If you find PDF Comparator useful, consider giving the repository a ⭐ on GitHub.

Your support helps the project gain visibility and encourages further development.

---

## 👨‍💻 Author

**SamToio**

Built with JavaScript, PDF.js, HTML5, CSS3, and Vite.

---

## 🔗 Repository

[View PDF Comparator on GitHub](https://github.com/SamToio/pdf-comparator)

---

<p align="center">
  <strong>PDF Comparator</strong>
  <br>
  Compare. Align. Inspect.
</p>
```
