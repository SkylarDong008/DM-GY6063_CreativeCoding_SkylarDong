let schoolBG;
let editor;
let commandInput;
let terminalMessage;
// load the school background

async function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  imageMode(CENTER);

  initPortal();
  createEditor();
  schoolBG = await loadImage("idm_backroom.jpg");
}


function draw() {
  background(20);
  if (schoolBG && schoolBG.width > 0) {
    image(schoolBG, width / 2, height / 2, width, height);
  }

  coverTimeTravel();
}


function createEditor() {

  editor = createDiv();

  editor.addClass("scene-ui");
  editor.style("z-index", "10"); // layer
  editor.position(windowWidth * 0.15, windowHeight * 0.12); // box position
  editor.size(windowWidth * 0.7, windowHeight * 0.7);

  editor.style("background", "rgba(13, 14, 21, 0.4)");
  editor.style("backdrop-filter", "blur(3px)");
  editor.style("border", "1px solid rgba(255,255,255,0.2)");
  editor.style("border-radius", "10px");
  editor.style("box-shadow", "0 20px 60px rgba(0,0,0,0.5)");
  editor.style("overflow", "hidden");
  editor.style("display", "flex");
  editor.style("flex-direction", "column");
  editor.style("font-family", "monospace");
  editor.style("color", "#d4d4d4");

  let titleBar = createDiv("🔴 🟡 🟢　Skylar's life.exe");
  titleBar.parent(editor);
  titleBar.style("background", "#25253694");
  titleBar.style("padding", "12px");
  titleBar.style("font-size", "12px");
  titleBar.style("flex-shrink", "0");

  let fileTab = createDiv("surviving_Fall2026.js");
  fileTab.parent(editor);
  fileTab.style("background", "#1e1e2e");
  fileTab.style("padding", "10px 20px");
  fileTab.style("color", "#9cdcfe");
  fileTab.style("font-size", "13px");
  fileTab.style("flex-shrink", "0");

  let fakeCode = `<span style="color:#0eff26">// TODO: sleep eight hours (unlikely)</span><br>
<span style="color:#0eff26">// Type "go randomness" to escape reality.</span><br><br>
<span style="color:#c586c0">const</span> student = {<br>
&nbsp;&nbsp;location: <span style="color:#ce9178">"370 Jay St, 3rd floor, IDM"</span>,<br>
&nbsp;&nbsp;caffeine: <span style="color:#b5cea8">Infinity</span>,<br>
&nbsp;&nbsp;sanity: <span style="color:#569cd6">undefined</span><br>
};<br><br>
<span style="color:#c586c0">while</span> (deadline.isApproaching()) {<br>
&nbsp;&nbsp;drink(<span style="color:#ce9178">"iced latte"</span>);<br>
&nbsp;&nbsp;pretendToBeProductive();<br>
&nbsp;&nbsp;<span style="color:#c586c0">if</span> (code.works()) panic();<br>
}<br><br>
`;

  let codeArea = createDiv(fakeCode);
  codeArea.parent(editor);
  codeArea.style("padding", "20px");
  codeArea.style("font-size", "11px");
  codeArea.style("line-height", "1.7");
  codeArea.style("overflow", "auto");
  codeArea.style("flex", "1");
  codeArea.style("min-height", "0");

  let terminal = createDiv();
  terminal.parent(editor);
  terminal.style("background", "#151520");
  terminal.style("border-top", "1px solid #444");
  terminal.style("padding", "15px");
  terminal.style("flex-shrink", "0");

  let terminalTitle = createDiv("TERMINAL　 PROBLEMS 0　 OUTPUT");
  terminalTitle.parent(terminal);
  terminalTitle.style("font-size", "11px");
  terminalTitle.style("color", "#888");
  terminalTitle.style("margin-bottom", "10px");

  commandInput = createInput("");
  commandInput.parent(terminal);
  commandInput.attribute("hint", "Input go randomness, then press Enter");
  commandInput.attribute("placeholder", "skylar@reality ~ % go randomness");
  commandInput.style("background", "transparent");
  commandInput.style("border", "none");
  commandInput.style("outline", "none");
  commandInput.style("color", "#0eff26");
  commandInput.style("font-family", "monospace");
  commandInput.style("font-size", "14px");
  commandInput.style("width", "95%");

  terminalMessage = createDiv("System ready. Escape route available.");
  terminalMessage.parent(terminal);
  terminalMessage.style("color", "#0eff26");
  terminalMessage.style("font-size", "11px");
  terminalMessage.style("margin-top", "10px");

  commandInput.elt.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkInput();
    }
  });
}


function checkInput() {
  if (timetravelActive) return;

  // I read the input, trim() remove extra spaces at both ends, 
  // toLowerCase() convert it to lowercase
  // so extra spaces around the command or capital letters won't affect the check
  let command = commandInput.value().trim().toLowerCase();

  if (command === "go randomness") {
    terminalMessage.html("Compiling escape route...");
    editor.hide();
    activateTimeTravel("randomness.html");

  } else {
    terminalMessage.html("Unknown command. Try: go randomness");
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  editor.position(windowWidth * 0.15, windowHeight * 0.12);
  editor.size(windowWidth * 0.7, windowHeight * 0.7);
}
