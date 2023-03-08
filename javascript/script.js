/*Declaration of variables - Id, Class and Tags*/
const button = document.getElementsByClassName("button");
const animation = document.getElementsByClassName("animation");
const itemResult = document.getElementsByClassName(" itemResult");
const interface = document.getElementsByClassName("interface");
const cardGame = document.getElementsByClassName("cardGame");
const displayResult = document.getElementsByClassName("displayResult");
const transition = document.getElementsByClassName("transition");
const boxMenu = document.getElementById("boxMenu");
const firstPlayer = document.getElementById("firstPlayer");
const lastPlayer = "Máquina";
const titleCurrent = document.getElementById("titleCurrent");
const titleResult = document.getElementById("titleResult");
const itens = document.querySelectorAll("h2");
const rules = document.querySelector("p");

/*Declaration of variables - Controls, Count and Vector*/
let controlMenu = true;
let controlTimeMenu = true;
let controlRules = true;
let controlEngine = true;
let count = 0;
let counterInicial = 0;
let vector = ['','','','','','','','','']

/*
    Declaration of main functions
    - function Menu (01)
    - function Rules (02)
    - function Restart Game from Menu (03)
    - function Play Game (04)
    - function Restart Match (05)
    - function Restart Game (06)
    - function Engine (07)
*/

// ----- function Menu (01) ----- //
button[0].addEventListener("click", ()=>{changeMenu()});

// ----- function Rules (02) ----- //
button[1].addEventListener("click", ()=>{editDisplayRules()});

// ----- function Restart Game from Menu (03) ----- //
button[2].addEventListener("click", ()=>{changeMenu();newGame();})

// ----- function Play Game (04) ----- //
button[3].addEventListener("click", ()=>{playGame();})

// ----- function Restart Match (05) ----- //
button[4].addEventListener("click", ()=>{restart();})

// ----- function Restart Game (06) ----- //
button[5].addEventListener("click", ()=>{newGame();})

// ----- function Menu (01) and function Restart Game from Menu (03) -------------- Classification A  ----- //
function changeMenu(){
    if(controlTimeMenu){
        controlTimeMenu = false;
        setTimeout(()=>{
            controlTimeMenu = true;
        },800);
        if(controlMenu){
            boxMenu.style.width = "100%";
            setTimeout(()=>{
                itens[0].style.display = "flex";
                itens[1].style.display = "flex";
                itens[0].style.opacity = "1";
                itens[1].style.opacity = "1";
            },600)
        }
        else{
            if(!controlRules){
                editDisplayRules();
                setTimeout(()=>{
                    auxChangeMenu();
                },300);
            }
            else{
                auxChangeMenu();
            }
        }
        animationMenu(controlMenu);
        controlMenu = (controlMenu) ? false : true;
    }
} 

// ----- function Rules (02) and function changeMenu() ---------------------------- Classification B ----- //
function editDisplayRules(){
    if(controlRules){
        rules.style.height = "40%";
        setTimeout(()=>{
            rules.innerText = "É necessário a participação de duas pessoas, que jogam alternadamente, para o preenchimento dos espaços vazios. Cada jogador irá usar um símbolo (⚔️ ou 🛡️). Vence aquele que consegui forma uma linha com simbolos idênticos, seja na horizontal, vertical ou diagonal. Essa Inteligência Artificial apresenta o algoritmo miniMax sob a forma de profundidade igual a 3.";
        },300)
        controlRules = false;
    }
    else{
        rules.innerText = '';
        rules.style.height = "0%";
        controlRules = true;
    }
}

// ----- function Restart Game from Menu (03) and function Restart Game (06) ------ Classification C ----- //
function newGame(){
    reset();
    firstPlayer.value = '';
    setDisplayNewGame();
} 

// ----- function Play Game (04) -------------------------------------------------- Classification D ----- //
function playGame(){
    validate();
    setTitleCurrent(firstPlayer.value); 
    interface[0].style.opacity = "0";
    setTimeout(()=>{
        interface[0].style.display = "none";
        interface[1].style.display = "flex";
        setTimeout(()=>{
            interface[1].style.opacity = "1";
        },250)
    },250)
}

// ----- function Restart Match (05) ---------------------------------------------- Classification E ----- //
function restart(){
    reset()
    setTitleCurrent(firstPlayer.value);
    setDisplay();
}

// ----- function Engine (07) ----------------------------------------------------- Classification F ----- //
function engine(index,ctrl){
    if(vector[index] == ''){
        count++;
        cardGame[index].opacity = "0";
        setTimeout(()=>{
            cardGame[index].innerText = (controlEngine) ? "⚔️" : "🛡️";
            cardGame[index].opacity = "1";
            vector[index] = (controlEngine) ? 'x' : '0';
            if(isChampion()){
                setResultWin((count%2 == 0) ? lastPlayer : firstPlayer.value)
                editDisplayResult();
                return;
            }
            setTitleCurrent((controlEngine) ? lastPlayer : firstPlayer.value);
            controlEngine = (controlEngine) ? false : true;
        },250)
    }
    else{
        alert("Comando Invalido, Casa Preenchida. Por favor, tente novamente!")
    }
    if(!isChampion() && count==9){
        setTimeout(() => {
            titleResult.innerText = "Empate!";
            editDisplayResult();
        }, 500);
        return;
    }
    if(ctrl){
        setTimeout(()=>{
            if(counterInicial == 0){
                (vector[4] != '') ? engine(0,false) : engine(4,false)
                counterInicial = 1;
            }
            else{
                engine(setIndex(vector,'0'),false);
            }
        },255)
    }
}

/*
    Declaration of auxiliary functions
    - function auxChangeMenu()         => A
    - function animationMenu(control)  => A
    - function reset()                 => C, E
    - function setDisplay()            => E
    - function setDisplayNewGame()     => C
    - function validate()              => D
    - function setTitleCurrent(Name)   => D, E, F
    - function isChampion()            => F
    - function setResultWin(Name)      => F
    - function editDisplayResult()     => F
*/

function auxChangeMenu(){
    itens[0].style.opacity = "0";
    itens[1].style.opacity = "0"; 
    setTimeout(()=>{
        itens[0].style.display = "none";
        itens[1].style.display = "none";
        boxMenu.style.width = "0%";
    },200);
} 

function animationMenu(control){
    animation[0].style.transform = (control) ? "translateY(200%) rotate(45deg)" : "translateY(0) rotate(0deg)";
    animation[1].style.opacity = (control) ? "0" : "1";
    animation[2].style.transform = (control) ? "translateY(-200%) rotate(-45deg)" : "translateY(0) rotate(0deg)";
}

function reset(){
    controlMenu = true;
    controlEngine = true;
    count = 0;
    counterInicial = 0
    for(var i = 0; i < 9; i++){
        vector[i] = '';
        cardGame[i].innerText = '';
        if(i==0 || i==1 || i==2){itemResult[i].style.display = "none";}
    }
    displayResult[0].style.left = "50%";
    displayResult[0].style.top = "50%";
    displayResult[0].style.width = "0%";
    displayResult[0].style.height = "0%";
}

function setDisplay(){
    interface[0].style.opacity = "0";
    setTimeout(()=>{
        interface[0].style.display = "none";
        interface[1].style.display = "flex";
        setTimeout(()=>{
            transition[0].style.opacity = "1";
            transition[1].style.opacity = "1";
        },250)
    },250)
}

function setDisplayNewGame(){
    transition[0].style.display = "none";
    interface[1].style.opacity = "0";
    setTimeout(()=>{
        interface[0].style.display = "flex";
        interface[1].style.display = "none";
        transition[0].style.display = "flex";
        setTimeout(()=>{
            interface[0].style.opacity = "1";
        },250)
    },250)
}

function validate(){
    if(firstPlayer.value == ''){firstPlayer.value = "Você"}
}

function setTitleCurrent(Name){
    titleCurrent.style.opacity = "0";
    setTimeout(()=>{
        titleCurrent.innerText = `O jogador da vez é ${Name}`;
        titleCurrent.style.opacity = "1";
    },250)
}

function isChampion(){
    if(vector[0] == vector[3] && vector[0]==vector[6] && vector[0]!=''){
        return true;
    }
    if(vector[1] == vector[4] && vector[1]==vector[7] && vector[1]!=''){
        return true;
    }
    if(vector[2] == vector[5] && vector[2]==vector[8] && vector[2]!=''){
        return true;
    }
    if(vector[0] == vector[1] && vector[0]==vector[2] && vector[0]!=''){
        return true;
    }
    if(vector[3] == vector[4] && vector[3]==vector[5] && vector[3]!=''){
        return true;
    }
    if(vector[6] == vector[7] && vector[6]==vector[8] && vector[6]!=''){
        return true;
    }
    if(vector[0] == vector[4] && vector[0]==vector[8] && vector[0]!=''){
        return true;
    }
    if(vector[2] == vector[4] && vector[2]==vector[6] && vector[2]!=''){
        return true;
    }
    return false;
}

function setResultWin(Name){
    titleResult.innerText = `O vencedor é ${Name}`;
}

function editDisplayResult(){
    displayResult[0].style.left = "0%";
    displayResult[0].style.top = "0%";
    displayResult[0].style.width = "100%";
    displayResult[0].style.height = "100%";
    setTimeout(()=>{
        for(var i = 0; i < 3; i++){
            itemResult[i].style.display = "flex";
        }
    },1000)
}

/*
    Declaration of Artificial Intelligence functions - Competitive Search (miniMax)
    - function setIndex(vetor,PC)
    - function setPossibleMoves(table)
    - function move(table, position, player) 
    - function miniMax(table, player, PC, maxDepth=9)
    - function heuristic(table, player)
    - function isWinner(table) 
    - function isFull(table)
    - function deepCopy(x) 
*/

function setIndex(vetor,PC){
    var moves = setPossibleMoves(vetor)
    var bestResult = -Infinity
    var bestIndex = null;
    for (var i in moves){
        var result = move(vetor, moves[i], PC)
        var player = (PC=='0') ? 'x' : '0'
        var value = miniMax(result, player, PC, 3)
        if(value > bestResult){
            bestResult = value;
            bestIndex = moves[i];
        }
    }
    return bestIndex
}

function setPossibleMoves(table){
    var moves = [];
    for(var i = 0; i < 9; i++){
        if(table[i] == '') moves.push(i);
    }
    return moves
}

function move(table, position, player){
    var new_table = deepCopy(table)
    new_table[position] = player
    return new_table
}

function miniMax(table, player, PC, maxDepth=9){
    var winner = isWinner(table);
    if(winner == PC) return 1000
    if(winner && winner!=PC) return -1000
    if(!winner && isFull(table)) return 0
    if(maxDepth==0){
        return heuristic(table, PC)
    }

    var moves = setPossibleMoves(table)

    //Function Max
    if(player == PC){
        var bestResult = -Infinity
        for(var i in moves){
            let result = move(table, moves[i], player)
            var player = (PC=='0') ? 'x' : '0'
            let value = miniMax(result, player, PC, maxDepth-1)
            if(value > bestResult){
                bestResult = value
            }
        }
        return bestResult
    }
    //Function Mini
    else{
        var bestResult = Infinity
        for(var i in moves){
            let result = move(table, moves[i], player)
            var player = (PC=='0') ? 'x' : '0'
            let value = miniMax(result, player, PC, maxDepth-1)
            if(value < bestResult){
                bestResult = value
            }
        }
        return bestResult
    }
}

function heuristic(table, player){
    var h = 0
    var opponent = (player=='x') ? '0':'x';
    for(var i = 0; i<9; i++){
        if(i==0 || i==3 || i==6){
            if(table[i] != opponent && table[i+1] != opponent && table[i+2] != opponent){
                h += Math.pow((table[i] == player) + (table[i+1] == player) + (table[i+2] == player),2)
            }    
            if(table[i] != player && table[i+1] != player && table[i+2] != player){
                h -= Math.pow((table[i] == opponent) + (table[i+1] == opponent) + (table[i+2] == opponent),2)
            }
        }     
    }
    for(var i = 0; i<3; i++){
        if(table[i] != opponent && table[i+3] != opponent && table[i+6] != opponent){
            h += Math.pow((table[i] == player) + (table[i+3] == player) + (table[i+6] == player),2)
        }
        if(table[i] != player && table[i+3] != player && table[i+6] != player){
            h -= Math.pow((table[i] == opponent) + (table[i+3] == opponent) + (table[i+6] == opponent),2)
        }
    }
    if(table[0] != opponent && table[4] != opponent && table[8] != opponent){
        h += Math.pow((table[0] == player) + (table[4] == player) + (table[8] == player), 2)
    }
    if(table[2] != opponent && table[4] != opponent && table[6] != opponent){
        h += Math.pow((table[0] == player) + (table[4] == player) + (table[8] == player), 2)
    }
    if(table[0] != player && table[4] != player && table[8] != player){
        h -= Math.pow((table[0] == opponent) + (table[4] == opponent) + (table[8] == opponent), 2)
    }
    if(table[2] != player && table[4] != player && table[6] != player){
        h -= Math.pow((table[0] == opponent) + (table[4] == opponent) + (table[8] == opponent), 2)
    }
    return h
}

function isWinner(table){
    if(table[0] == table[3] && table[0]==table[6] && table[0]!=''){
        return table[0];
    }
    if(table[1] == table[4] && table[1]==table[7] && table[1]!=''){
        return table[1];
    }
    if(table[2] == table[5] && table[2]==table[8] && table[2]!=''){
        return table[2];
    }
    if(table[0] == table[1] && table[0]==table[2] && table[0]!=''){
        return table[0];
    }
    if(table[3] == table[4] && table[3]==table[5] && table[3]!=''){
        return table[3];
    }
    if(table[6] == table[7] && table[6]==table[8] && table[6]!=''){
        return table[6];
    }
    if(table[0] == table[4] && table[0]==table[8] && table[0]!=''){
        return table[0];
    }
    if(table[2] == table[4] && table[2]==table[6] && table[2]!=''){
        return table[2];
    }
    return null;

}

function isFull(table){
    for(var i = 0; i < 9; i++){
        if(table[i] == '') return false
    }
    return true
}

function deepCopy(x) {
    return JSON.parse(JSON.stringify(x));
}
