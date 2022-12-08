let card = document.getElementsByClassName("card")
let cards = [...card];
    cards = shuffle(cards);
const deck = document.getElementById("card-deck");
let moves = 0,
    counter = document.querySelector(".moves");
    const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");
let openedCards = [];
const restartButton = document.getElementById("restart");
  counter.innerHTML = moves;
  let starRating;

let second = 0
let    minute = 0
let    hour = 0
let    timer = document.querySelector(".timer")
let    interval;







// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




//set time
function setTime() {
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins" + " : " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        //I'm too lazy to check this, but if you take more than 20min the game will automatically reset
        if (minute == 20) {
            swal({
                    title: 'Too late!',
                    text: "You took too long on you, now you have to try again!"
                },)
                startGame();

        }
    }, 1000);
}

// makes the clock work
document.body.onload = startGame();


// starts game
function startGame() {
  moves = 0;
  second = 0;
  minute = 0;
    deck.onclick = function () {
        this.onclick = null;
        setTime();
    };

    // reset deck
 var i = 0;
    for (i; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }



    //reset timer

    var timer = document.querySelector(".timer").innerHTML = " ";

    clearInterval(interval);

    // reset rating
 var i = 0;
    for (i; i < stars.length; i++) {
        stars[i].style.visibility = "visible";
    }
}

let displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


function cardMatched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

// function when cards don't match
function cardUnmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disableCard();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open","unmatched");
        enableCard();
        openedCards = [];
    }, 600);
}

// check for matched cards
function cardOpen() {
    openedCards.push(this);
    let cardLength = openedCards.length;
    if (cardLength === 2) {
        moveCounter();
        if (openedCards[0].dataset.name === openedCards[1].dataset.name) {
            cardMatched();
        } else {
            cardUnmatched();
        }
    }
};

function disableCard() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}


function enableCard() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');

        for (i; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}
for (i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", victory);
};

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    // set star rating
    if (moves > 14 && moves < 22) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
                starRating = 2;
            }
        }
    } else if (moves > 22) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
                starRating = 1;
            }
        }
    }
}


// victory screen, stops timer
function victory() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        stopTime = timer.innerHTML;

        // sweetalert from html pops up and congratulate
        swal({
                title: 'You won!',
                text: 'Your score: ' + moves + ' Moves and ' + starRating + ' Star(s) with ' + stopTime,
                confirmButtonText: 'To play again, press the red icon'
            },)
    };
}

// Restart Button, it works, just that it looks a little wierd that it doesnt show 0 after reset but it does reset
restartButton.addEventListener('click', function () {
    startGame();


});
