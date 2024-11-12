// Initialize PDF.js and Socket.io
const socket = io();
let pdfDoc = null;
let pageNum = 1;
let isAdmin = false; // Set to true for admin control

// Load PDF document
async function loadPDF(url) {
  try {
    const pdf = await pdfjsLib.getDocument(url).promise;
    pdfDoc = pdf;
    renderPage(pageNum);
  } catch (error) {
    console.error('Error loading PDF:', error);
  }
}

// Render the PDF page
async function renderPage(num) {
  try {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render the page onto the canvas
    await page.render({ canvasContext: context, viewport }).promise;

    document.getElementById("pdfViewer").innerHTML = ''; // Clear previous content
    document.getElementById("pdfViewer").appendChild(canvas); // Append the new canvas
    document.getElementById("pageNumber").textContent = pageNum; // Update page number
  } catch (error) {
    console.error('Error rendering page:', error);
  }
}

// Navigation functions
function nextPage() {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  if (isAdmin) socket.emit('pageChange', pageNum); // Only admin sends update
  renderPage(pageNum);
}

function prevPage() {
  if (pageNum <= 1) return;
  pageNum--;
  if (isAdmin) socket.emit('pageChange', pageNum); // Only admin sends update
  renderPage(pageNum);
}

// Button event listeners
document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);

// Socket.IO: Update page for all viewers
socket.on('pageUpdate', (newPage) => {
  pageNum = newPage;
  renderPage(pageNum);
});

// Load PDF when page loads
loadPDF('https://engineeringstatics.org/pdf/statics.pdf');  // Replace with path to your PDF
