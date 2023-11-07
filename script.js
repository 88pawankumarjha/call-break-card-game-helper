// // Define the card deck
// const cardDeck = [];

// const suits = ['♠', '♥', '♣', '♦'];
// const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// // Create the deck by combining suits and ranks
// suits.forEach((suit) => {
//     ranks.forEach((rank) => {
//         cardDeck.push({ suit, rank });
//     });
// });

// console.log(cardDeck); // Display the deck in the console (optional)



// // Shuffle the card deck (implement a shuffle function)

// // Distribute cards among players
// const players = document.querySelectorAll('.player');
// players.forEach((player, index) => {
//     // Distribute cards to each player
//     const playerCards = cardDeck.slice(index * 13, (index + 1) * 13);

//     // Create and display the player's cards
//     const cardContainer = player.querySelector('.card-container');
//     playerCards.forEach((card) => {
//         const cardElement = document.createElement('div');
//         cardElement.classList.add('card');
//         cardElement.textContent = `${card.rank} ${card.suit}`;
//         cardContainer.appendChild(cardElement);
//     });
// });

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

    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        // Check the card's suit and set the text color accordingly
        if (card.suit === '♠' || card.suit === '♣') {
            cardElement.classList.add('black-suit');
        } else {
            cardElement.classList.add('red-suit');
        }

        cardElement.textContent = `${card.rank} ${card.suit}`;
        cardContainer.appendChild(cardElement);
    });
}

// Append the cards to each player's container
playerHands.forEach((playerHand, index) => {
    appendCardsToContainer(index, playerHand);
});

function moveCardToDiscardAndUpdatePlayer(cardElement, playerIndex) {
    const discardPile = document.getElementById('discard-pile');

    // Clone the card element to add to the discard pile
    const discardedCard = cardElement.cloneNode(true);

    // Select and remove all cards with the common class from all players
    const commonClass = 'card';
    const playerCards = document.querySelectorAll(`.${commonClass}`);
    playerCards.forEach((playerCard) => {
        if (playerCard.innerHTML == cardElement.innerHTML) {
            playerCard.remove();
        }
    });

    // Append the cloned card to the discard pile
    discardPile.appendChild(discardedCard);
}




// Function to handle card click
function handleCardClick(event) {
    const cardElement = event.target;
    const playerIndex = cardElement.getAttribute('data-player');

    // Move the clicked card to the discard pile and update the player's hand
    moveCardToDiscardAndUpdatePlayer(cardElement, playerIndex);
}

// Add click event listeners to all cards in player hands
const playerCards = document.querySelectorAll('.card');
playerCards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
});
