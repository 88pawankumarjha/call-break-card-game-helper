// Define the full deck of cards
const fullDeck = [];

const suits = ['♠', '♥', '♣', '♦'];
const ranks = ['A','K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

suits.forEach((suit) => {
    ranks.forEach((rank) => {
        fullDeck.push({ suit, rank });
    });
});

// Number of players
const numberOfPlayers = 4;

// Initialize an array to hold each player's cards
const playerHands = [];

// Distribute all 52 cards to each player
for (let i = 0; i < numberOfPlayers; i++) {
    const playerHand = [...fullDeck]; // Copy the full deck for each player
    playerHands.push(playerHand);
}

// Function to append cards to a player's card container
function appendCardsToContainer(playerIndex, cards) {
    const containerId = `player${playerIndex + 1}-cards`;
    const cardContainer = document.getElementById(containerId);
    suits.forEach((suit) => {
        const suitCards = cards.filter((card) => card.suit === suit);
        if (suitCards.length > 0) {
            const suitColumn = document.createElement('div');
            suitColumn.classList.add('suit-column');

            suitCards.forEach((card) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                // Check the card's suit and set the text color accordingly
                if (card.suit === '♠' || card.suit === '♣') {
                    cardElement.classList.add('black-suit');
                } else {
                    cardElement.classList.add('red-suit');
                }

                cardElement.textContent = `${card.rank} ${card.suit}`;
                suitColumn.appendChild(cardElement);
            });

            cardContainer.appendChild(suitColumn);
        }
    });
}


// Append the cards to each player's container
playerHands.forEach((playerHand, index) => {
    appendCardsToContainer(index, playerHand);
});

function hideCard(cardElement) {
    // Select and remove all cards with the common class from all players
    const commonClass = 'card';
    const playerCards = document.querySelectorAll(`.${commonClass}`);
    const countSpades = document.getElementById('countSpades');
    const countHearts = document.getElementById('countHearts');
    const countClubs = document.getElementById('countClubs');
    const countDiamonds = document.getElementById('countDiamonds');

    cardElement.innerHTML.includes('♠') ? countSpades.innerHTML=countSpades.innerHTML-1: cardElement.innerHTML.includes('♥') ? countHearts.innerHTML=countHearts.innerHTML-1 : cardElement.innerHTML.includes('♣') ? countClubs.innerHTML=countClubs.innerHTML-1 : countDiamonds.innerHTML=countDiamonds.innerHTML-1;

    playerCards.forEach((playerCard) => {
        if (playerCard.innerHTML == cardElement.innerHTML) {
            playerCard.remove();
        }
    });
}

// Function to handle card click
function handleCardClick(event) {
    const cardElement = event.target;
    // const playerIndex = cardElement.getAttribute('data-player');
    hideCard(cardElement);
}

// Add click event listeners to all cards in player hands
const playerCards = document.querySelectorAll('.card');
playerCards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
});

const countSpadesElement = document.getElementById('countSpades');
const countHeartsElement = document.getElementById('countHearts');
const countClubsElement = document.getElementById('countClubs');
const countDiamondsElement = document.getElementById('countDiamonds');

function toggleButtonHighlight(element) {
    // Toggle the highlighting class (e.g., 'highlighted') on manual click
  if (element.classList.contains('highlighted')) {
    element.classList.remove('highlighted', 'noHighlight');
    element.classList.add('highlighted1');
  } else if (element.classList.contains('highlighted1')) {
    element.classList.remove('highlighted','highlighted1');
    element.classList.add('noHighlight');
  } else {
    element.classList.remove('noHighlight','highlighted1');
    element.classList.add('highlighted');
  }
}
countSpadesElement.addEventListener('click', function () {
  toggleButtonHighlight(this);
});
countHeartsElement.addEventListener('click', function () {
  toggleButtonHighlight(this);
});
countClubsElement.addEventListener('click', function () {
  toggleButtonHighlight(this);
});
countDiamondsElement.addEventListener('click', function () {
  toggleButtonHighlight(this);
});

const hiddenCardsHistory = [];
function hideCard(cardElement) {
    const commonClass = 'card';
    const playerCards = document.querySelectorAll(`.${commonClass}`);
  
    // Record the hidden card information
    const hiddenCardInfo = {
      cardElement: cardElement.cloneNode(true),
      suitColumn: cardElement.parentElement,
    };
    hiddenCardsHistory.push(hiddenCardInfo);
  
    // Update suit count
    if (cardElement.innerHTML.includes('♠')) {
      countSpades.innerHTML = countSpades.innerHTML - 1;
    } else if (cardElement.innerHTML.includes('♥')) {
      countHearts.innerHTML = countHearts.innerHTML - 1;
    } else if (cardElement.innerHTML.includes('♣')) {
      countClubs.innerHTML = countClubs.innerHTML - 1;
    } else {
      countDiamonds.innerHTML = countDiamonds.innerHTML - 1;
    }
  
    // Remove the card from the player's hand
    playerCards.forEach((playerCard) => {
      if (playerCard.innerHTML === cardElement.innerHTML) {
        playerCard.remove();
      }
    });
  }
  const undoButton = document.getElementById('undoButton');

  undoButton.addEventListener('click', function () {
    if (hiddenCardsHistory.length > 0) {
      const lastHiddenCardInfo = hiddenCardsHistory.pop();
      const { cardElement, suitColumn } = lastHiddenCardInfo;
  
      // Restore the hidden card to the player's hand
      suitColumn.appendChild(cardElement);
  
      // Update suit count
      if (cardElement.innerHTML.includes('♠')) {
        countSpades.innerHTML = Number(countSpades.innerHTML) + 1;
      } else if (cardElement.innerHTML.includes('♥')) {
        countHearts.innerHTML = Number(countHearts.innerHTML) + 1;
      } else if (cardElement.innerHTML.includes('♣')) {
        countClubs.innerHTML = Number(countClubs.innerHTML) + 1;
      } else {
        countDiamonds.innerHTML = Number(countDiamonds.innerHTML) + 1;
      }
    }
  });
    