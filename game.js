let powerInterval;


const winMusic =
new Audio("sounds/I_Will_Get_My_Freedom.mp4");

winMusic.load();

winMusic.volume = 0.7;



let gameOver = false;

const hospitalDeath =
new Audio("sounds/hospital_death.mp3");

hospitalDeath.volume = 0.7;



const executionMusic =
new Audio("sounds/Rising_Red_Tides.mp4");

executionMusic.load();

executionMusic.volume = 0.7;


const taskSound =
new Audio("sounds/scary_rour.mp3");

taskSound.volume = 0.2;


const ambience =
new Audio("sounds/ambiance11.mov");

ambience.loop = true;
ambience.volume = 1;

let powerDrain = 2;

let aiProgress = 0;

let power = 100;

let gameStarted = false;

const startButton =
document.getElementById("start-button");

const introText =
document.getElementById("intro-text");

const introMusic =
new Audio("sounds/Main_song.mp3");

introMusic.loop = true;
introMusic.volume = 0.5;

const textSound =
new Audio("sounds/calm.wav");

textSound.volume = 0.3;

const introLines = [

    "WELCOME, OPERATOR.",
    "YOU HAVE BEEN ASSIGNED TO FACILITY 07.",
    "YOUR TASK IS TO TRAIN THE IDENTIFICATION AI.",
    "THE AI MUST LEARN TO DISTINGUISH HUMANS FROM MIMICS.",
    "EVERY CORRECT DECISION IMPROVES DETECTION.",
    "EVERY MISTAKE MAKES THEM HARDER TO FIND.",
    "WHILE TRAINING THE AI YOU MUST KEEP THE POWER ON.",
    "IF POWER IS LOST, YOU WILL BE CLASSIFIED AS NON-ESSENTIAL PERSONNEL.",
    "NON-ESSENTIAL PERSONNEL ARE SUBJECT TO IMMEDIATE ELIMINATION.",
    "PRESS ANY KEY TO BEGIN."

];

let currentLine = 0;
let canAdvance = false;

startButton.addEventListener(
    "click",
    startIntro
);

function startIntro() {

    introMusic.play();

    startButton.style.display = "none";

    textSound.currentTime = 0;
    textSound.play();

    showNextLine();

}

function showNextLine() {

    if (currentLine < introLines.length) {

        const line =
        document.createElement("p");

        line.textContent =
        introLines[currentLine];

        line.classList.add("fade-in");

        introText.appendChild(line);

        currentLine++;

        canAdvance = false;

        setTimeout(() => {

            canAdvance = true;

        }, 1000);

    }

}

document.addEventListener(
    "keydown",
    function() {

        if (
            startButton.style.display === "none" &&
            canAdvance
        ) {

            if (
                currentLine < introLines.length
            ) {

                textSound.currentTime = 0;
                textSound.play();

                showNextLine();

            } else {

                beginGame();

            }

        }

    }
);

function fadeOutMusic() {

    let fadeAudio =
    setInterval(() => {

        if (
            introMusic.volume > 0.05
        ) {

            introMusic.volume -= 0.05;

        } else {

            introMusic.pause();

            clearInterval(
                fadeAudio
            );

        }

    }, 150);

}

function beginGame() {

    if (gameStarted) return;

    gameStarted = true;

    document.body.classList.add("fade-out");

    fadeOutMusic();

    setTimeout(() => {

    document.body.classList.remove("fade-out");

    document.body.innerHTML = `

    <p id="power-label">POWER</p>

    <div id="power-container">
        <div id="power-bar"></div>
    </div>

    <p id="power-text">100%</p>

    <p id="ai-label">AI PROGRESS</p>

    <div id="ai-container">
        <div id="ai-bar"></div>
    </div>

    <p id="ai-text">0%</p>

    <div id="task-area"></div>

    <button id="recharge-button">
        RECHARGE
    </button>

    `;

    ambience.play();

    startPowerSystem();

    generateTask();

}, 5000);

}

function startPowerSystem() {

    const powerBar =
    document.getElementById("power-bar");

    const powerText =
    document.getElementById("power-text");

    const rechargeButton =
    document.getElementById("recharge-button");

    rechargeButton.addEventListener("click", function() {

        power += 1;

        if (power > 100) {

            power = 100;

        }

        powerBar.style.width = power + "%";

        powerText.textContent =
        Math.floor(power) + "%";

    });

    powerInterval = setInterval(() => {

        power -= powerDrain;

        if(power <= 0) {

            power = 0;

            loseGame();

        }

        powerBar.style.width = power + "%";

        powerText.textContent =
        Math.floor(power) + "%";

    }, 1000);

}




const humanFaces = [

"images/human1.png",
"images/human2.png",
"images/human3.png",
"images/human4.png",
"images/human5.png",
"images/human6.png",
"images/human7.png",
"images/human8.png",
"images/human9.png",
"images/human10.png",
"images/human11.png",
"images/human12.png",
"images/human13.png",
"images/human14.png",
"images/human15.png",
"images/human16.png"

];

const mimicFaces = [

"images/mimic1.png",
"images/mimic2.png",
"images/mimic3.png",
"images/mimic4.png",
"images/mimic5.png",
"images/mimic6.png",
"images/mimic7.png"

];



function generateTask() {

    taskSound.currentTime = 0;
    taskSound.play();

    const taskArea =
    document.getElementById("task-area");

    taskArea.innerHTML = "";

    const faces = [];

    for(let i = 0; i < 4; i++) {

        const randomHuman =
        humanFaces[
            Math.floor(
                Math.random() *
                humanFaces.length
            )
        ];

        faces.push({
            src: randomHuman,
            mimic: false
        });

    }

    const randomMimic =
    mimicFaces[
        Math.floor(
            Math.random() *
            mimicFaces.length
        )
    ];

    faces.push({
        src: randomMimic,
        mimic: true
    });

    faces.sort(() => Math.random() - 0.5);

    faces.forEach(face => {

        const img =
        document.createElement("img");

        img.src = face.src;

        img.classList.add("face");

        img.addEventListener(
            "click",
            function() {

                checkAnswer(face.mimic);

            }
        );

        taskArea.appendChild(img);

    });

}


function checkAnswer(correct) {

    if(correct) {

        aiProgress += 10;

        if(aiProgress > 100) {

            aiProgress = 100;

        }

    } else {

        aiProgress -= 5;

        if(aiProgress < 0) {

            aiProgress = 0;

        }

    }

    updateAIBar();

    powerDrain += 0.3;

    if(aiProgress >= 100) {

        winGame();
        return;

    }

    document.getElementById("task-area").innerHTML =
    "<h2 style='color:lime;font-family:monospace;'>ANALYZING...</h2>";

    setTimeout(() => {

        generateTask();

    }, 4000);

}


function updateAIBar() {

    const aiBar =
    document.getElementById("ai-bar");

    const aiText =
    document.getElementById("ai-text");

    aiBar.style.height =
    aiProgress + "%";

    aiText.textContent =
    aiProgress + "%";

}


function winGame() {

    clearInterval(powerInterval);

    ambience.pause();

    winMusic.currentTime = 0;
    winMusic.play();

    document.body.innerHTML = `

    <h1>TRAINING COMPLETE</h1>

    <p style="
        color: lime;
        font-family: monospace;
        font-size: 30px;
        text-align: center;
        width: 70%;
    ">
        YOU HAVE TRAINED THE AI ENOUGH.<br><br>
        GOOD JOB, OPERATOR.<br><br>
        YOUR PAYCHECK HAS BEEN ISSUED.
    </p>

    `;

}


function loseGame() {

    if(gameOver) return;

    gameOver = true;

    clearInterval(powerInterval);

    ambience.pause();

    executionMusic.currentTime = 0;
    executionMusic.play();

    document.body.innerHTML = `

    <h1>MISSION FAILED</h1>

    <p style="
        color:red;
        font-family:monospace;
        font-size:30px;
        text-align:center;
        width:70%;
    ">
        YOU HAVE UNFORTUNATELY FAILED TO DO YOUR JOB.<br><br>
        YOU WILL BE ELIMINATED IN 5 MINUTES.
    </p>

    <p id="execution-timer" style="
        color:red;
        font-family:monospace;
        font-size:50px;
        text-align:center;
    ">
        05:00
    </p>

    `;

    startExecutionTimer();

}


function startExecutionTimer() {

    let remainingSeconds = 300;

    const timerElement =
    document.getElementById("execution-timer");

    const timerSpeed =
    42000 / 300;

    const countdown =
    setInterval(() => {

        remainingSeconds--;

        let minutes =
        Math.floor(
            remainingSeconds / 60
        );

        let seconds =
        remainingSeconds % 60;

        timerElement.textContent =
        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0");

        if(remainingSeconds <= 0) {

        clearInterval(countdown);

        executionMusic.pause();

        document.body.innerHTML = `

        <h1 style="
            color:red;
            font-family:monospace;
        ">
            ELIMINATION IN PROGRESS
        </h1>

        `;

        hospitalDeath.currentTime = 0;
        hospitalDeath.play();

        setTimeout(() => {

            document.body.innerHTML = "";

            document.body.style.background = "black";

        }, 3000);



}

    }, timerSpeed);

}
