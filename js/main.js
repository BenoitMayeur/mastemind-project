/*
    Project made by Benoit Mayeur - August/September 2020
    Based on an exercice given during the Agile developer fullstack JS training
    In the "Proforma" center (Liège)
    --------------
    Comments are easier to understand after adding the extension "Better Comments" in VSC
*/

/***********************************************************************
******************** Variables
********************/

const originalListColors = ["blue", "green", "red", "yellow", "purple", "white", "orange", "emptyColor", "emptyColor", "emptyColor", "emptyColor"];
let colorsToFind = [];
let randomNumber;
let numberLineBeingChanged = 0; 
let buttonValidation;
let numberButton = 0;
let buttonToPush = 0;
let colorGiven = "";
let difficultyLevel = 1;

listLinesAnswers = document.querySelectorAll(".lineAnswers");
buttonValidation = document.querySelector(".buttonValidation");

/***********************************************************************
******************** Functions
********************/

/*
    * Function under: used to move from one line to the next one
*/

function movingToTheNextLine(){

    if(numberLineBeingChanged>9){
        return false;
    }
    
    listLines = document.querySelectorAll(".lineAnswers");

    for(let line of listLines){
        line.classList.remove("activeLine");
    }

    validationButtonMoving();
    colorButtonsMoving(numberLineBeingChanged);
    listLines[numberLineBeingChanged].classList.add("activeLine");
    numberLineBeingChanged++;
}

/*
    * Function under: the validation button moves to the next line
*/

function validationButtonMoving(){

    buttonValidation = document.querySelector(".buttonValidation");
    document.querySelector(".buttonValidation").remove();
    listLinesAnswers = document.querySelectorAll(".lineAnswers");
    listLinesAnswers[numberLineBeingChanged].appendChild(buttonValidation)
}

/*
    * Function under: the validation button moves to the next line
    * @param: numberLine = show to which line the button will move
*/

function colorButtonsMoving(numberLine){
    
    answersColors = document.querySelectorAll(".answerColor");

    for(let object of answersColors){
        object.classList.remove("answerColor");
        object.classList.add("displayColor");
    }

    listNewColorButtons = listLinesAnswers[numberLine].querySelectorAll(".displayColor");
    for(let newColorButton of listNewColorButtons){
        newColorButton.classList.remove("displayColor");
        newColorButton.classList.add("answerColor");
    }
}

/*
    * Function under: comparizon of the colors given by the user with the colors to find
    * ! return an array results with two numbers: 
    *   [0] => amount of black dots 
    *   [1] => amount of white dots 
*/


function takeColorsAndCompare(){

    listColorsToFind = [...colorsToFind];

    color = "";
    blackDots = 0;
    whiteDots = 0;
    results = [];

    for(let i=0; i<answersColors.length; i++){
        answerTocheck = answersColors[i];

        if(answersColors[i] == listColorsToFind[i]){

            blackDots++;
            answersColors.splice(i, 1);
            listColorsToFind.splice(i, 1);
            i--;

        }
    }

    results.push(blackDots);

    for(let i=0; i<answersColors.length; i++){
        answerTocheck = answersColors[i];

        if(listColorsToFind.includes(answerTocheck)){

            whiteDots++;

        }

    }

    results.push(whiteDots);

    return results
}

/*
    * Function under: the div that displays the white and black dots "moves" to the next line
*/


function divShowingResultsMoving(){
    listDivResults = [];

    listDivResults = document.querySelectorAll(".results");
    for(let divResults of listDivResults){
        divResults.classList.remove("currentResults");
    }
    listDivResults[numberLineBeingChanged].classList.add("currentResults");
}

/*
    * Function under: display the black and white dots
    * @param: results = array results with two numbers: 
    *   [0] => amount of black dots 
    *   [1] => amount of white dots 
*/


function showWhiteAndBlackDots(results){

    divResults = document.querySelector(".currentResults");
    
    for (let i=0; i<results[0]; i++){

        let blackDot = document.createElement("div");
        blackDot.classList.add("blackDot");
        divResults.appendChild(blackDot);
    }

    for (let i=0; i<results[1]; i++){

        let whiteDot = document.createElement("div");
        whiteDot.classList.add("whiteDot");
        divResults.appendChild(whiteDot);
    }

}

/*
    * Function under: restart the game according to the level of difficulty
    * @param: level => when the game starts, it is at "1": easy
*/

function restartEverything(level){
    difficultyLevel = level;
    listColors = [...originalListColors];
    colorsToFind = [];
    numberLineBeingChanged=0;

    buttonValidation.style.display = "inline";

    divShowingResultsMoving();

    document.querySelector(".titleSolution").classList.add("notVisible");

    if(level === 1){

        for(let i=0; i<4; i++){
            if(difficultyLevel === 1){

                randomNumber = Math.floor(Math.random() * (6-i));
                colorsToFind.push(listColors[randomNumber]);

                listColors.splice(randomNumber, 1);
            }
        }
    }
    else if(level === 2){

        for(let i=0; i<4; i++){

            randomNumber = Math.floor(Math.random() * (11-i));
            colorsToFind.push(listColors[randomNumber]);

            listColors.splice(randomNumber, 1);
        
        }
    }
    else{

        for(let i=0; i<4; i++){

            randomNumber = Math.floor(Math.random() * 8);
            colorsToFind.push(listColors[randomNumber]);

        
        }
    }


    blackDot = document.querySelectorAll(".blackDot");
    whiteDot = document.querySelectorAll(".whiteDot");
    for(let dot of blackDot){
        dot.remove();
    }
    for(let dot of whiteDot){
        dot.remove();
    }


    divColors = document.querySelectorAll(".lineAnswers > .divOneColor > div");

    for(let div of divColors){

        div.classList.remove("blue", "green", "red", "yellow", "purple", "white", "orange", "emptyColor");
        div.removeAttribute("data-color");
    }

    listDivsSolution = document.querySelectorAll(".lineSolutions > .divOneColor > .displayColor");
    for(let div of listDivsSolution){
        div.classList.remove("blue", "green", "red", "yellow", "purple", "white", "orange", "emptyColor");
    }

}

/*
    * Function under: display the solution in the div at the bottom
*/

function showSolution(){

    listDivsSolution = document.querySelectorAll(".lineSolutions > .divOneColor > .displayColor");
    for(let i=0; i<listDivsSolution.length; i++){

        listDivsSolution[i].classList.add(colorsToFind[i]);
    }
}

/*******************************************************************************
********************************* Game starts here 
*****************/

restartEverything(1);
validationButtonMoving();
movingToTheNextLine();

/* Choose the level of difficulty */

document.addEventListener('click', function (event) {

    if(event.target.classList.contains("difficultyLevel")){

        divsDifficulty = document.querySelectorAll(".difficultyLevel");
        for(div of divsDifficulty){
            div.classList.remove("activeLevel");
        }

        event.target.classList.add("activeLevel");

        if(event.target.getAttribute('data-name') == "difficultyLevel1" ){

            emptyBox = document.querySelector(".empty");

            emptyBox.classList.add("easyLevel");

            restartEverything(1);

        }
        else if(event.target.getAttribute('data-name') == "difficultyLevel2" ){

            emptyBox = document.querySelector(".empty");

            emptyBox.classList.remove("easyLevel");


            restartEverything(2);
        }
        else{

            emptyBox = document.querySelector(".empty");

            emptyBox.classList.remove("easyLevel");

            restartEverything(3);

        }

        validationButtonMoving();
        movingToTheNextLine();
            

    }
}, false);

/* Give color to a box */

document.addEventListener('click', function (event) {

    if(event.target.classList.contains("displayColor")){
    
        colorGiven = event.target.getAttribute('data-color');


        return colorGiven;
    }

    if(event.target.classList.contains("answerColor")){

        if(difficultyLevel === 1 || difficultyLevel === 2){
            answersColors = document.querySelectorAll(".answerColor");
            for(let answer of answersColors){
                if(answer.getAttribute("data-color") !== "emptyColor"){
                    if(answer.getAttribute("data-color") ==  colorGiven){

                        answer.classList.remove(colorGiven);
    
                        answer.removeAttribute('data-color');
                    }
                }
            }
        }

        if(colorGiven !== ""){

            event.target.classList.remove("blue", "green", "red", "yellow", "purple", "white", "orange", "emptyColor");
            event.target.classList.add(colorGiven);
            event.target.setAttribute('data-color', colorGiven);
        }

    }

}, false);

/* When you click on the button for validation */

buttonValidation.addEventListener('click', (event) =>{

        answersColors = [];

        divAnswerColor0 = document.querySelectorAll(".answerColor")[0];
        answersColors.push(divAnswerColor0.getAttribute("data-color"));
        divAnswerColor1 = document.querySelectorAll(".answerColor")[1];
        answersColors.push(divAnswerColor1.getAttribute("data-color"));
        divAnswerColor2 = document.querySelectorAll(".answerColor")[2];
        answersColors.push(divAnswerColor2.getAttribute("data-color"));
        divAnswerColor3 = document.querySelectorAll(".answerColor")[3];
        answersColors.push(divAnswerColor3.getAttribute("data-color"));

        for(let answer of answersColors){
            if(answer === null){
                return alert('Vous ne pouvez pas laisser de "trous" dans la séquence');
            }
        }

        results = takeColorsAndCompare();
        showWhiteAndBlackDots(results);

        if(results[0] === 4){
            alert("C'est gagné!");
            buttonValidation.style.display = "none";

        }
        else if(results[0] !== 4 && numberLineBeingChanged>=10){
            alert("Perdu !");
            document.querySelector(".titleSolution").classList.remove("notVisible");
            showSolution();

        }
        else{

            divShowingResultsMoving();
            movingToTheNextLine();

        }

    }
)

