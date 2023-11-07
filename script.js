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

    const suits = ['♠', '♥', '♣', '♦'];

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

// // Function to switch suit indicator colors
// function switchSuitColors(event) {
//     const indicator = event.target;
//     const currentColor = Array.from(indicator.classList).find(cls => cls.startsWith('color-'));
//     let nextColor = parseInt(currentColor.split('-')[1]) % 3 + 1;
//     indicator.classList.remove(currentColor);
//     indicator.classList.add(`color-${nextColor}`);
// }

// // Add click event listeners to suit indicators
// const suitIndicators = document.querySelectorAll('.suit-indicator div');
// suitIndicators.forEach((indicator) => {
//     indicator.addEventListener('click', switchSuitColors);
// });



// const suitColumns = document.querySelectorAll('.suit-column');

// suitColumns.forEach((suitColumn) => {
//     const playerColorIndicators = suitColumn.nextElementSibling.querySelectorAll('.color-indicator');
//     let colors = ['color-1', 'color-2', 'color-3'];
//     let colorIndex = 0;

//     playerColorIndicators.forEach((indicator) => {
//         indicator.addEventListener('click', () => {
//             indicator.classList.remove(colors[colorIndex]);
//             colorIndex = (colorIndex + 1) % colors.length;
//             indicator.classList.add(colors[colorIndex]);

//             // Call a function to synchronize colors across all players for the same suit
//             synchronizeColors(suitColumn.classList[1], colors[colorIndex]);
//         });
//     });
// });

// // Function to synchronize indicator colors for the same suit across all players
// function synchronizeColors(suitType, color) {
//     const suitColumns = document.querySelectorAll(`.${suitType}`);

//     suitColumns.forEach((column) => {
//         const playerColorIndicators = column.nextElementSibling.querySelectorAll('.color-indicator');
//         playerColorIndicators.forEach((indicator) => {
//             indicator.classList.remove('color-3', 'color-2', 'color-1');
//             indicator.classList.add(color);
//         });
//     });
// }
