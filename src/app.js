/* eslint-disable */
import "bootstrap";
import "./style.css";

let btnDraw = document.querySelector("#btnDraw");
let btnSort = document.querySelector("#btnSort");
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let suits = ["♦", "♥", "♠", "♣"];
let orderCards = [];

function createCards(elem) {
  let input = document.getElementById("amountOfCards");
  let amountOfCards = parseInt(input.value); //pido valor entero
  orderCards = [];

  for (let i = 0; i < amountOfCards; i++) {
    let randomNumber = Math.floor(Math.random() * numbers.length);
    let randomSuit = Math.floor(Math.random() * suits.length);

    let card = document.createElement("div");
    card.classList.add("card");

    let topSuit = document.createElement("div");
    topSuit.classList.add("topSuit");
    topSuit.innerHTML = suits[randomSuit];

    let middleNumber = document.createElement("div");
    middleNumber.classList.add("middleNumber");
    middleNumber.innerHTML = numbers[randomNumber];

    let bottonSuit = document.createElement("div");
    bottonSuit.classList.add("bottonSuit");

    if (topSuit.innerHTML === "♥" || topSuit.innerHTML === "♦") {
      topSuit.style.color = "red";
      middleNumber.style.color = "red";
      bottonSuit.style.color = "red";
    } else {
      topSuit.style.color = "black";
      middleNumber.style.color = "black";
      bottonSuit.style.color = "black";
    }

    bottonSuit.innerHTML = topSuit.innerHTML;

    card.appendChild(topSuit);
    card.appendChild(middleNumber);
    card.appendChild(bottonSuit);
    elem.appendChild(card);

    let cardContent = {
      number: parseInt(changeValue(middleNumber.innerHTML)),
      html: card.innerHTML
    };

    orderCards.push(cardContent);
  }
}

function changeValue(valor) {
  switch (valor) {
    case "1":
      return "A";
    case "11":
      return "J";
    case "12":
      return "Q";
    case "13":
      return "K";
    default:
      return valor;
  }
}

btnDraw.addEventListener("click", e => {
  const cardDeck = document.querySelector("#cardDeck");
  cardDeck.innerHTML = "";
  createCards(cardDeck);
  let sortDeck = document.getElementById("sortDeck");
  sortDeck.innerHTML = "";
});

btnSort.addEventListener("click", e => {
  let sortDeck = document.getElementById("sortDeck");
  sortDeck.innerHTML = "";

  for (let j = orderCards.length - 1; j > 0; j--) {
    for (let k = 0; k < j; k++) {
      if (orderCards[k].number > orderCards[k + 1].number) {
        let aux = orderCards[k];
        orderCards[k] = orderCards[k + 1];
        orderCards[k + 1] = aux;

        let firstStep = document.createElement("div");
        firstStep.classList.add("lines");
        sortDeck.appendChild(firstStep);
        var lineBar = sortDeck.childElementCount;
        firstStep.innerHTML = lineBar;

        for (let h = 0; h < orderCards.length; h++) {
          let newCard = document.createElement("div");
          newCard.classList.add("newCard");
          newCard.innerHTML = orderCards[h].html;
          firstStep.appendChild(newCard);
        }
      }
    }
  }
});
