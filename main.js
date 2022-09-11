var screenWidth = 0;
var screenHeight = 0;
var apple = null;
var speakData = "";
var toNumber = -1;
var canDraw = false;
var imgSize = 50;

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onresult = function (event) {
  console.log(event);

  var content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content;

  toNumber = Number(content);
  if (Number.isInteger(toNumber)) {
    document.getElementById("status").innerHTML = "A maçã começou a ser desenhada.";
    canDraw = true;
  }
  else {
    document.getElementById("status").innerHTML = "O número não foi reconhecido: " + content;
  }
}

function setup() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  canvas = createCanvas(screenWidth, screenHeight - 150);
  canvas.position(0, 150);
}

function start() {
  document.getElementById("status").innerHTML = "O sistema está ouvindo. Por favor, fale.";
  recognition.start();
}

function preload() {
  apple = loadImage("apple.png");
}

function draw() {
  if (canDraw) {
    for (var i = 1; i <= toNumber; i++) {
      var x = Math.floor(Math.random() * canvas.width);
      var y = Math.floor(Math.random() * canvas.height);
      image(apple, x, y, imgSize, imgSize)
    }
    canDraw = false;
    document.getElementById("status").innerHTML = toNumber + " maçãs desenhadas";
    speakData = toNumber + " maçãs foram desenhadas";
    speak()
  }
}

function speak() {
  console.log("Text to speach: " + speakData);
  var utterThis = new SpeechSynthesisUtterance(speakData);
  window.speechSynthesis.speak(utterThis);
}
