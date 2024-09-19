let heading = document.getElementById("h2");
let startBtn = document.getElementById("play");
let inputValue;
let started = false;
let level = 0;
let allDivIds = [];
let gameSeq = [];
let userSeq = [];

startBtn.addEventListener("click", function () {

    gameStart();
    check();
    levelUp();

})

function check() {

    let userInput = document.getElementById("inputBox").value;
    if (userInput < 2) {

        alert("Please enter number greater than 1.");

    } else {

        inputValue = userInput;
        createDiv();

    };
}

function createDiv() {

    let parentDiv = document.getElementById("parentDiv");
    parentDiv.innerHTML = ''; // the inner HTML(html contents) of the element with the id of "parentDiv" is being set to an empty.

    for (let i = 0; i < inputValue; i++) {

        let child = document.createElement("div");
        child.className = "buttons"; // className:-Set the class attribute of child.
        child.setAttribute("id", `box-${i + 1}`);
        child.style.backgroundColor = randomColor();
        child.addEventListener("click", boxClicked);

        parentDiv.appendChild(child); // The appendChild() method appends a element(child) as the last element of parentDiv.

        allDivIds.push(child.id); //// The push() method adds new items to the end of an array.

    }

    console.log(allDivIds);
}


function randomColor() {
    // Math.floor(x) returns the value of x rounded down to its nearest integer.
    // Math.random() returns a random number between 0 (inclusive), and 1 (exclusive).
    let red = Math.floor(Math.random() * 256); // Returns a random integer from 0 to 255.
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let colors = `rgb(${red},${green},${blue})`;
    // console.log(colors);
    return colors;
}

function gameStart() {
    if (started == false) {
        console.log('game started');
        started = true;
    }
    let inpBox = document.getElementById("inputBox");
    inpBox.style.display = "none";
}

function levelUp() {
    userSeq = []; // Clearing  user sequence for the new level.
    level++;
    heading.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * allDivIds.length);
    // console.log("random index", randomIndex);

    let randDivId = allDivIds[randomIndex]; // it returns random id from allDivIds.
    // console.log(" random id",randColor);

    let randDiv = document.querySelector(`#${randDivId}`); // it returns the element(div).
    // console.log("random btn",randBtn); 

    gameSeq.push(randDivId);
    gameFlash(randDiv);
    console.log("Game Seq = ", gameSeq);

}

function gameFlash(btn) {
    let gameSound = document.getElementById("game");
    gameSound.play();
    btn.classList.add("systemFlash"); // The classList property returns the CSS classnames of an element.
    setTimeout(function () {
        btn.classList.remove("systemFlash");
    }, 500);
}

function userFlash(btn) {
    let userSound = document.getElementById("user");
    userSound.play();
    btn.classList.add("myFlash"); // The classList property returns the CSS classnames of an element.
    setTimeout(function () {
        btn.classList.remove("myFlash");
    }, 250);
}

function boxClicked() {
    let btn = this; // this indicates the child element(div) as we have addedEventListner above by clicking.
    userFlash(btn);

    let userFlashId = btn.getAttribute("id");
    // console.log("userFlashId : ", userFlashId);
    userSeq.push(userFlashId);
    // console.log("userSeq : ", userSeq)

    checkAns(userSeq.length - 1); // (userSeq.length - 1) returns the index of last button pressed.

    // console.log("userSeq.length - 1 = ", userSeq.length - 1)



}

function checkAns(lastBtnIndex) {

    console.log("userSeq[lastBtnIndex] = ", userSeq[lastBtnIndex]);
    console.log("gameSeq[lastBtnIndex] = ", gameSeq[lastBtnIndex]);

    // console.log("userSeq length = ", userSeq.length);
    // console.log("gameSeq length = ", gameSeq.length);

    if (userSeq[lastBtnIndex] === gameSeq[lastBtnIndex]) {   // for compairing the sequence of each button.

        if (userSeq.length == gameSeq.length) {  // for level up we compare length.
            heading.innerText = "well done! Taking to next level."
            setTimeout(levelUp, 1000);
        }
    } else {
        let errorSound = document.getElementById("error");
        errorSound.play();
        document.querySelector("body").style.backgroundImage = "none";
        document.querySelector("body").style.backgroundColor = "red";
        heading.innerText = `Game Over! Your score was ${level}  
        press Play to start again or Refresh for more.`;
        // reset();
        setTimeout(reset, 1000);
    }
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];

    document.querySelector("body").style.backgroundImage = "url('/assets/bg.jpg')";
    document.querySelector("body").style.backgroundColor = "";
}