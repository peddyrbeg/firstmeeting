var profile = [];
var botBkgr;
var userBkgr;
var dots = ["", ".", "..", "..."];
var dotCount = 0;
var t = 0; //time measure for typing 'snackbar'

var profPicSpX;
var profPicSpY;

var aBeeZee;

var inp1;
var retry;
var next;
var reply;
var replies = [];
var traa = ["Good morning!", "Good afternoon!", "Good day!"];
var ranTraa;
var greet = ["Moghrey mie!", "Fastyr mie!", "Laa mie!"]
var stayd = ["I'm ok.", "I can't complain.", "I'm very well!"];
var prompt = [];
var prNo = 0;
var error;
var correct;
var correctCount = 0;
var errorCount = 0;
var enmyn = ["Aalish", "Juan", "Blay", "Erin", "Josef", "Freya", "Maayl", "Jamys", "Breeshey", "Catreeney"];
var nynEnnym;
var buill = ["Rhumsaa", "Doolish", "Balley Chashtal", "Purt ny h-Inshey", "Laksaa", "Purt Çhiarn", "Purt le Moirrey"];
var rEn;
var rBu;

var boxPosY = [];
var boxPosYSt;
var seqPos = 0;
var seqCount = 0;

var ans1;
var ans3a;
var ans3b = /kys t/i
var ans3c = /ou hene/i;
var ans4a = /ta mee ass/i;
var ans4b = /cre ass t/i
var ans4c = /ou/i;

var r1T = 0;
var r1Tt = 150;
var r2T = 0;
var r2Tt = 166;
var r3T = 0;
var r3Tt = 157;
var r4T = 0;
var r4Tt = 140;

var replying = false;

var mNo = 0; //message count

var repX; //reply x position
var repTX;
var ansX; // answer x position
var ansTX;

var spacing;
var spacing2;
var lSpacing;

var boxWidth;
var boxHeight;
var boxHeight2;
var height1 = true; //switch between two heights
var txtWidth;

var rW; //score tally anim start value
var rY;
var rTime = 0;

var popSound;
var played = false;

var blip;
var blipPlayed = false;

var wrong;
var wrongPlayed = false;

function preload () {
  profile[0] = loadImage('assets/aalish.png');
  profile[2] = loadImage('assets/blay.png');
  profile[8] = loadImage('assets/breeshey.png');
  profile[3] = loadImage('assets/erin.png');
  profile[5] = loadImage('assets/freya.png');
  profile[7] = loadImage('assets/jamys.png');
  profile[4] = loadImage('assets/josef.png');
  profile[1] = loadImage('assets/juan.png');
  profile[6] = loadImage('assets/maayl.png');
  profile[9] = loadImage('assets/catreeney.png');

  popSound = loadSound('assets/414383__bluesiren__plop-sound.mp3');
  blip = loadSound('assets/blip.mp3');
  wrong = loadSound('assets/error.mp3');
  
  aBeeZee = loadFont('assets/ABeeZee-Regular.ttf');
}

function setup () {
  var cnv = createCanvas(320, displayHeight-163);
  var x = (displayWidth - width) / 2;
  cnv.position(x);

  textFont(aBeeZee);

  rEn = Math.floor(random(0, 10));
  botBkgr = color(230, 102, 13);
  userBkgr = color(25, 153, 242);

  boxWidth = 250;
  boxHeight = 50;
  boxHeight2 = 73;
  txtWidth = 211;
  repX = width/2 - 115;
  repTX = repX + 20;
  ansX = width/2-90;
  ansTX = ansX + 25;

  boxPosYSt = height-225;
  boxPosY[0] = boxPosYSt;
  spacing = 21.6;
  spacing2 = boxHeight2 + 6.5;
  lSpacing = 23;
  profPicSpX = 45;
  profPicSpY = 7.5;

  let ranProm = Math.floor(random(0, 3));
  if (ranProm == 0) ans3a = /ta mee mie dy liooar/i;
  else if (ranProm == 1) ans3a = /cha noddym gaccan/i;
  else ans3a = /ta mee feer vie/i;

  ranTraa = Math.floor(random(0,3));
  if (ranTraa == 0) ans1 = new RegExp ("moghrey mie", "i");
  else if (ranTraa == 1) ans1 = new RegExp ("fastyr mie", "i");
  else ans1 = new RegExp ("laa mie", "i");

  prompt = ["Say '" + traa[ranTraa] + "' back in Manx.", "Say who you are in Manx.", "Say, '" + stayd[ranProm] + " How are you yourself?' in Manx.", "Say where you're from, and ask where they're from."];

  inp1 = createInput();
  inp1.size(300, 37.8);
  inp1.style("justify-content", "center");
  inp1.position(displayWidth/2-inp1.width/2, height-100);
  inp1.style("font-size", "20px");
  inp1.style("border-radius", "10px");

  retry = createButton("RETRY");
  retry.position(displayWidth/2-110, height-75);
  retry.size(100, 50);
  retry.style("background", "black");
  retry.style("border", "transparent");
  retry.style("color", "white");
  retry.style("display", "none");
  retry.style("border-radius", "10px");
  retry.mousePressed(gameRestart)

  next = createButton("NEXT");
  next.position(displayWidth/2+10, height-75);
  next.size(100, 50);
  next.style("background", "white");
  next.style("border", "transparent");
  next.style("color", "black");
  next.style("display", "none");
  next.style("border-radius", "10px");
}

function keyPressed () {
  if (keyCode === ENTER && !correct && !error && !replying) {
    messaged();
  }
}

function draw () {
  background(255);

  initialGreeting();
  firstReply();
  secondReply();
  thirdReply();
  fourthReply();
  bottomAppBar(userBkgr);
  correctMsg();
  tryAgain();
  scoreTally();

  if (!correct && !error && !replying) {
    fill(255);
    textAlign(CENTER);
    rectMode(CENTER);
    text(prompt[prNo], width/2, height-40, 300);
  }

  if (replying) typing();
  else t = 0;
}

function initialGreeting () {
  fill(botBkgr);
  noStroke();
  rectMode(CORNER);
  rect(repX, boxPosY[0], boxWidth, boxHeight, 10);

  image(profile[rEn], repX - profPicSpX, boxPosY[0] + profPicSpY);

  fill(255);
  textSize(17);
  textAlign(LEFT, CENTER);
  text(greet[ranTraa], repTX, boxPosY[0] + lSpacing);
}

function firstReply () {
    if (prNo > 0) {
    fill(userBkgr);
    noStroke();
    rect(ansX, boxPosY[1], boxWidth, boxHeight, 10);
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(replies[0], ansTX, boxPosY[1] + lSpacing);
    if (r1T < r1Tt) {
      r1T++;
      replying = true;
    }
    else {
      replying = false;
      if (!played && prNo == 1) playPop();
      fill(botBkgr);
      noStroke();
      let enq = "Mish " + enmyn[rEn] + ". Cre'n ennym t'ort?";
      if (textWidth(enq) + 5 < txtWidth) {
        rect(repX, boxPosY[2], boxWidth, boxHeight, 10);
        height1 = true;
      }
      else {
        rect(repX, boxPosY[2], boxWidth, boxHeight2, 10);
        height1 = false;
      }
      image(profile[rEn], repX - profPicSpX, boxPosY[2] + profPicSpY);
      fill(255);
      textSize(16);
      textAlign(LEFT);
      text(enq, repTX, boxPosY[2] + lSpacing, txtWidth);
    }
  }
}

function secondReply () {
    if (prNo > 1) {
    height1 = true;
    fill(userBkgr);
    noStroke();
    rect(ansX, boxPosY[3], boxWidth, boxHeight, 10);
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(replies[1], ansTX, boxPosY[3] + lSpacing);
    if (r2T < r2Tt) {
      r2T++;
      replying = true;
    }
    else {
      replying = false;
      if (!played && prNo == 2) playPop();
      height1 = false;
      fill(botBkgr);
      noStroke();
      rect(repX, boxPosY[4], boxWidth, boxHeight2, 10);
      image(profile[rEn], repX - profPicSpX, boxPosY[4] + profPicSpY);
      fill(255);
      textSize(16);
      textAlign(LEFT);
      text("T’eh mie çheet dty whail, " + nynEnnym + ". Kys t’ou?", repTX, boxPosY[4] + lSpacing, txtWidth);
    }
  }
}

function thirdReply () {
  if (prNo > 2) {
    fill(userBkgr);
    noStroke();
    rect(ansX, boxPosY[5], boxWidth, boxHeight2, 10);
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(replies[2], ansTX, boxPosY[5] + lSpacing, txtWidth);
    if (r3T < r3Tt) {
      r3T++;
      replying = true;
    }
    else {
      replying = false;
      if (!played && prNo == 3) playPop();
      fill(botBkgr);
      noStroke();
      rect(repX, boxPosY[6], boxWidth, boxHeight2, 10);
      image(profile[rEn], repX - profPicSpX, boxPosY[6] + profPicSpY);
      fill(255);
      textSize(16);
      textAlign(LEFT);
      text("Ta mee braew, gura mie ayd. Cre ass t’ou, " + nynEnnym + "?", repTX, boxPosY[6] + lSpacing, txtWidth);
    }
  }
}

function fourthReply () {
  if (prNo > 3) {
    fill(userBkgr);
    noStroke();
    if (textWidth(replies[3]) < txtWidth) {
      rect(ansX, boxPosY[7], boxWidth, boxHeight, 10);
      height1 = true;
    }
    else {
      rect(ansX, boxPosY[7], boxWidth, boxHeight2, 10);
      height1 = false;
    }
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(replies[3], ansTX, boxPosY[7] + lSpacing, txtWidth);
    if (r4T < r4Tt) {
      r4T++;
      replying = true;
    }
    else {
      replying = false;
      if (!played && prNo == 4) playPop();
      fill(botBkgr);
      noStroke();
      rect(repX, boxPosY[8], boxWidth, boxHeight, 10);
      image(profile[rEn], repX - profPicSpX, boxPosY[8] + profPicSpY);
      fill(255);
      textSize(16);
      textAlign(LEFT);
      text("Ta mee ass " + buill[rBu] + ".", repTX, boxPosY[8] + lSpacing);
      gameEnd();
    }
  }
}

function correctMsg () {
  if (correct) {
    if (!blipPlayed) {
      blip.play();
      blipPlayed = true;
    }
    fill(12, 121, 76);
    textAlign(CENTER);
    text("Well done!", width/2, height-130);
    correctCount++;
    if (correctCount == 50) {
      correct = false;
      blipPlayed = false;
      correctCount = 0;
      mNo++;
    }
  }
}

function tryAgain () {
  if (error) {
    if (!wrongPlayed) {
      wrong.play();
      wrongPlayed = true;
    }
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Try again!", width/2, height-130);
    errorCount++;
    if (errorCount == 50) {
      error = false;
      wrongPlayed = false;
      errorCount = 0;
    }
  }
}

function messaged () {
  if (mNo == 0) firstMessage();
  if (mNo == 1) secondMessage();
  if (mNo == 2) thirdMessage();
  if (mNo == 3) fourthMessage();
}

function firstMessage () {
  if (ans1.test(inp1.value())) {
    rightAns();
  }
  else {
    error = true;
  }
}

function secondMessage () {
  let mish = /mish/i;
  if (inp1.value().search(mish) == 0 && inp1.value().length > 5) {
    let b = /b/i;
    let c = /c/i;
    let ch = /ch/i;
    let d = /d/i;
    let f = /f/i;
    let g = /g/i;
    let j = /j/i;
    let k = /k/i;
    let m = /m/i;
    let p = /p/i;
    let q = /q/i;
    let s = /s/i;
    let t = /t/i;
    let th = /th/i;

    nynEnnym = inp1.value().replace(mish, "");
    nynEnnym = nynEnnym.replace(" ", "");
    nynEnnym = nynEnnym.replace(".", "");

    if (nynEnnym.search(b) == 0) nynEnnym = nynEnnym.replace(b, "V");
    else if (nynEnnym.search(c) == 0 && nynEnnym.search(ch) == -1) nynEnnym = nynEnnym.replace(c, "Ch");
    else if (nynEnnym.search(d) == 0) nynEnnym = nynEnnym.replace(d, "Gh");
    else if (nynEnnym.search(f) == 0) {
      nynEnnym = nynEnnym.replace(f, "");
      nynEnnym = nynEnnym.charAt(0).toUpperCase() + nynEnnym.slice(1);
    }
    else if (nynEnnym.search(g) == 0) nynEnnym = nynEnnym.replace(g, "Gh");
    else if (nynEnnym.search(j) == 0) nynEnnym = nynEnnym.replace(j, "Y");
    else if (nynEnnym.search(k) == 0) nynEnnym = nynEnnym.replace(k, "Ch");
    else if (nynEnnym.search(m) == 0) nynEnnym = nynEnnym.replace(m, "V");
    else if (nynEnnym.search(p) == 0) nynEnnym = nynEnnym.replace(p, "Ph");
    else if (nynEnnym.search(q) == 0) nynEnnym = nynEnnym.replace(q, "Wh");
    else if (nynEnnym.search(s) == 0) nynEnnym = nynEnnym.replace(s, "H");
    else if (nynEnnym.search(t) == 0 && nynEnnym.search(th) == -1) nynEnnym = nynEnnym.replace(t, "H");
    else if (nynEnnym.search(th) == 0) nynEnnym = nynEnnym.replace(th, "H");
    else nynEnnym = nynEnnym.charAt(0).toUpperCase() + nynEnnym.slice(1);
    
    rightAns();
  }
  else {
    error = true;
  }
}

function thirdMessage () {
  if (ans3a.test(inp1.value()) && ans3b.test(inp1.value()) && ans3c.test(inp1.value())) {
    rightAns();
  }
  else {
    error = true;
  }
}

function fourthMessage () {
  if (ans4a.test(inp1.value()) && ans4b.test(inp1.value()) && ans4c.test(inp1.value())) {
    rightAns();
    rBu = Math.floor(random(0, 7));
  }
  else {
    error = true;
  }
}

function rightAns () {
  correct = true;
  replies.push(inp1.value());
  prNo++;
  played = false;
  inp1.value("");
  boxPos();
}

function bottomAppBar (c) {
  fill(c);
  rect(0, height-110, width, 110);
}

function playPop () {
  popSound.play();
  played = true;
  boxPos();
}

function boxPos () {
  for (let i = 0; i < boxPosY.length; i++) {
    if (height1) boxPosY[i] = boxPosY[i] - boxHeight - spacing;
    else boxPosY[i] = boxPosY[i] - boxHeight2 - spacing;
  }
  boxPosY.push(boxPosYSt);
}

function typing () {
  if (t < 50) t++;
  else {
    textAlign(LEFT);
    fill(0);
    let typeTxt = enmyn[rEn] + " is typing ";
    text(typeTxt + dots[Math.floor(dotCount)], width/2 - textWidth(typeTxt)/2, height - 130);
    dotCount < dots.length - 0.01 ? dotCount = dotCount + 0.05 : dotCount = 0;
  }
}

function scoreTally () {
  rectMode(CENTER);
  if (!correct && prNo != 4) {
    fill(0);
    rTime = 0;
    rW = 40;
    rY = 30;
  }
  else if (correct && prNo != 4) {
    fill(12, 121, 76);
    rTime++;
    if (rTime < 2) {
      rW = rW + 4;
      rY = rY + 4;
    }
    else if (rTime >= 2 && rTime < 5) {
      rW = rW + 2;
      rY = rY + 2;
    }
  }
  else {
    fill(12, 121, 76);
    noStroke();
    rTime++;
    if (rTime < 2) {
      rW = rW + 4;
      rY = rY + 4;
    }
    else if (rTime >= 2 && rTime < 5) {
      rW = rW + 2;
      rY = rY + 2;
    }
    else {
      rW = 40;
      rY = 30;
    }
  }
  rect(width-30, 22.5, rW, rY, 10);

  textAlign(CENTER);
  if (!correct) fill(255);
  else fill(255);
  
  text(prNo + "/4", width-30, 20);
}

function gameEnd () {
  inp1.style("display", "none");
  retry.style("display", "block");
  next.style("display", "block");

  fill(12, 121, 76);
  textAlign(CENTER);
  text("Great job, " + nynEnnym + "!", width/2, height-130);
}

function gameRestart () {
  location.reload();
}
