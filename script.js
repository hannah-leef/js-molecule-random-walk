const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// cell dimensions
const cellWidth = canvas.width;
const cellHeight = canvas.height;

// molecule position (start near center)
let moleculeX = cellWidth / 2;
let moleculeY = cellHeight / 2;

// diffusion parameters
const cytoplasmStep = 4;   // faster diffusion in cytoplasm
const membraneStep = 1.5; // slower diffusion near membrane
const membraneThickness = 30; // thickness of membrane region

function isNearMembrane(x, y) {
  return (
    x < membraneThickness ||
    x > cellWidth - membraneThickness ||
    y < membraneThickness ||
    y > cellHeight - membraneThickness
  );
}

function moveMolecule() {
  // determine diffusion rate based on location
  const stepSize = isNearMembrane(moleculeX, moleculeY)
    ? membraneStep
    : cytoplasmStep;

  // random movement (Brownian motion)
  const dx = (Math.random() * 2 - 1) * stepSize;
  const dy = (Math.random() * 2 - 1) * stepSize;

  moleculeX += dx;
  moleculeY += dy;

  // keep molecule inside the cell boundary
  moleculeX = Math.max(0, Math.min(cellWidth, moleculeX));
  moleculeY = Math.max(0, Math.min(cellHeight, moleculeY));
}

function drawCell() {
  ctx.clearRect(0, 0, cellWidth, cellHeight);

  // draw membrane region
  ctx.strokeStyle = "#999";
  ctx.lineWidth = membraneThickness * 2;
  ctx.strokeRect(
    membraneThickness,
    membraneThickness,
    cellWidth - membraneThickness * 2,
    cellHeight - membraneThickness * 2
  );

  // draw molecule
  ctx.beginPath();
  ctx.arc(moleculeX, moleculeY, 5, 0, Math.PI * 2);
  ctx.fillStyle = isNearMembrane(moleculeX, moleculeY) ? "red" : "blue";
  ctx.fill();
}

function update() {
  // molecule doesn't move every frame (stochastic timing)
  if (Math.random() < 0.4) return;

  moveMolecule();
  drawCell();
}

setInterval(update, 30);
