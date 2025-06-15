const board = document.getElementById('board');

const suits = ['♠']; // Single suit for simplicity
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let piles = [];

// Create deck (8 full decks of one suit = 104 cards)
function createDeck() {
    const deck = [];
    for (let i = 0; i < 8; i++) {
        for (const v of values) {
            deck.push({ suit: '♠', value: v });
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function render() {
    board.innerHTML = '';
    piles.forEach((pile, index) => {
        const pileDiv = document.createElement('div');
        pileDiv.className = 'pile';
        pileDiv.dataset.index = index;

        pile.forEach((card, i) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.draggable = true;
            cardDiv.style.top = `${i * 20}px`;
            cardDiv.innerHTML = `<span>${card.value}${card.suit}</span>`;
            cardDiv.dataset.index = i;

            cardDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({ from: index, cardIndex: i }));
                setTimeout(() => cardDiv.classList.add('dragging'), 0);
            });

            cardDiv.addEventListener('dragend', () => {
                cardDiv.classList.remove('dragging');
            });

            pileDiv.appendChild(cardDiv);
        });

        pileDiv.addEventListener('dragover', e => e.preventDefault());

        pileDiv.addEventListener('drop', e => {
            e.preventDefault();
            const { from, cardIndex } = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (from == index) return;

            const movingCards = piles[from].splice(cardIndex);
            piles[index].push(...movingCards);
            render();
        });

        board.appendChild(pileDiv);
    });
}

function dealInitial() {
    const deck = createDeck();
    shuffle(deck);
    piles = Array.from({ length: 10 }, () => []);
    let i = 0;
    while (deck.length) {
        piles[i % 10].push(deck.pop());
        i++;
    }
    render();
}

document.getElementById('deal').addEventListener('click', dealInitial);

// Auto deal on page load
dealInitial();