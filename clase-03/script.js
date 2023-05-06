var digimons, arregloDigimons, position, colorDraw, sizeDraw;
let undoList = [];

function preload() {
  digimons = loadJSON("https://digimon-api.vercel.app/api/digimon");
}

function setup() {
  // --- Transforma el objeto en un arreglo ---
  arregloDigimons = Object.values(digimons);
  position = Math.round(random(0, arregloDigimons.length));

  // --- Contenido dinámico ---
  createElement(
    "h1",
    "Dibuja a <a href='" +
      arregloDigimons[position].img +
      "' target='_blank'>" +
      arregloDigimons[position].name +
      "</a>"
  ).parent("instruccion");

  createElement("small", "CTRL + Z: Deshacer cambios").parent("instruccion");

  //   let img = createImg(arregloDigimons[position].img).parent("instruccion");

  // --- Botones ---
  select("#descarga").mousePressed(artemania);
  select("#borra").mousePressed(borrador);

  // --- Creación del canvas ---
  createCanvas(windowWidth, windowHeight).position(0, 0).style("z-index", -1);
  background("#efebe9");

  // --- Controles ---
  colorDraw = createColorPicker("#000000").parent("controles");
  sizeDraw = createSlider(1, 5, 3).parent("controles");
}

function undo() {
  // Check if the array is empty
  if (undoList.length > 0) {
    // Get the last element of the array
    let lastItem = undoList[undoList.length - 1];
    // Remove it from the array
    undoList.pop();
    // Draw the image
    image(lastItem, 0, 0);
  }
}

function draw() {
  stroke(colorDraw.color());
  strokeWeight(sizeDraw.value());
  if (mouseIsPressed) {
    undoList.push(get());
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  // Check CTRL+Z : undo
  if (keyIsDown(90) && keyIsDown(CONTROL)) {
    undo();
  }
}

function artemania() {
  saveCanvas("mi_digimon", "jpg");
}

function borrador() {
  background("#efebe9");
}
