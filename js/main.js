// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

const startGameButton = document.getElementById("start-game");
let bombe;

startGameButton.addEventListener("click", function () {
  const difficultyEl = document.getElementById("difficulty");
  const gridEl = document.getElementById("grid");
  generaGriglia(gridEl, difficultyEl.value);
});

/********************************************************************
 * 																	*
 * 							FUNCTIONS								*
 * 																	*
 ********************************************************************/

/**
 * genera una griglia dinamica per il gioco campominato dato l'elemento
 * in cui inserirla
 *
 * @param {HTMLElement} grid
 */
function generaGriglia(grid, difficulty) {
  grid.innerHTML = "";
  let squareNumber = 0;

  if (difficulty == 1) {
    squareNumber = 100;
  } else if (difficulty == 2) {
    squareNumber = 81;
  } else {
    squareNumber = 49;
  }

  bombe = generaBombe(1, squareNumber);
  for (let i = 0; i < squareNumber; i++) {
    const testoCella = i + 1;
    const cellaEl = generaCella(testoCella, difficulty);
    grid.append(cellaEl);
  }
}

/**
 * genera una cella dinamica per il gioco campominato e ritorna la cella
 *
 * @param {string} testo
 * @return {HTMLElement}
 */
function generaCella(testo, difficulty) {
  const cella = document.createElement("div");
  cella.classList.add("square");

  if (difficulty == 2) {
    cella.classList.add("square-medium");
  } else if (difficulty == 3) {
    cella.classList.add("square-big");
  }
  squareNumber = 81;
  cella.innerHTML = testo;
  cella.addEventListener("click", function () {
    this.classList.add("active");
    if (bombe.includes(parseInt(this.innerHTML))) {
      this.classList.add("bomb");
    }
    this.innerHTML;
  });

  return cella;
}

function generaBombe(min, max) {
  const arrayBombe = [];

  while (arrayBombe.length < 16) {
    const randomNumber = Math.floor(Math.random() * max - min + 1) + min;

    if (!arrayBombe.includes(randomNumber)) {
      arrayBombe.push(randomNumber);
    }
  }
  return arrayBombe;
}

function gameOver() {
  const activeSquares = document.querySelectorAll(".square.active");
  alert(activeSquares.length + "punti");
}
