$(function(){

    let dCards = [];
    let pCards = [];
    let oneCard = [];
    let winner = 0;
    let dTotal= 0;
    let pTotal = 0;

    let convertDealer = [];
    let convertPlayer = [];

    //Create the deck
    const createDeck = () => {
        let set = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
        let deck = [];

        for(let i = 0; i < set.length; i++){
            deck.push(set[i]);
            deck.push(set[i]);
            deck.push(set[i]);
            deck.push(set[i]);
        }
        return deck;
    }
    

    //Deal cards
    const deal = () => {
        let cards = [];
        cards.push(deck[Math.floor(Math.random() * deck.length)]);
        cards.push(deck[Math.floor(Math.random() * deck.length)]);
        return cards;
    }
    

    //Convert cards to numeric value
    const convertCards = (cards) => {
        let hand = [];
        for(let i = 0; i < cards.length; i++){
            if(cards[i] === "A"){
                hand.push(11);
            }
            else if(cards[i] === "J" || cards[i] ==="Q" || cards[i] ==="K"){
                hand.push(10);
            }
            else hand.push(parseInt(cards[i]));
        }
        return hand;
    } 


    //Check for aces and bust
    const checkTotal = (cards) => {
        let total = 0;
        for(let i = 0; i < cards.length; i++){
            total += cards[i];
        }
        while(total > 21 && cards.includes(11)){
            cards[cards.indexOf(11)] = 1;
            total -= 10;
        }
        return total;
    }

    const checkBust = (total, winner) => {
        if(total > 21 && winner === 0){
            let outcome = "Player bust! You lose!";
            console.log("Bust! Total is:", total);
            document.getElementById("outcome").innerHTML = outcome;
            $("#pHit").toggle();
            $("#pStay").toggle();
            $("#playAgain").toggle().on('click',function(){
                window.location.reload();
            });
            return total;
        }
        else if(total > 21 && winner === 1){
            let outcome = "Dealer bust! You win!";
            console.log("Bust! Total is:", total);
            document.getElementById("outcome").innerHTML = outcome;
            $("#playAgain").toggle().on('click',function(){
                window.location.reload();
            });
            return total;
        }
        else {
            return total;
        }
    }

    //Player hit
    const pHit = () => {
        pCards.push(deck[Math.floor(Math.random() * deck.length)]);
        convertPlayer = convertCards(pCards);
        pTotal = checkTotal(convertPlayer);
        checkBust(pTotal, winner);
        document.getElementById("pcard").innerHTML = pCards;
        document.getElementById("ptotal").innerHTML = pTotal;
    }

    //Player stay
    const pStay = () => {
        //Dealer hits until higher than player
        while(dTotal < pTotal && dTotal <=21){
            dCards.push(deck[Math.floor(Math.random() * deck.length)]);
            convertDealer = convertCards(dCards);
            dTotal = checkTotal(convertDealer);
            checkBust(dTotal, winner);
            document.getElementById("dcard").innerHTML = dCards;
            document.getElementById("dtotal").innerHTML = dTotal;
        }
        //Dealer total higher than player
        if(dTotal > pTotal && dTotal <= 21){
            dTotal = checkTotal(convertDealer);
            document.getElementById("dcard").innerHTML = dCards;
            document.getElementById("dtotal").innerHTML = dTotal;

            let outcome = "Dealer's hand is larger. You lose!";
            document.getElementById("outcome").innerHTML = outcome;
            $("#playAgain").toggle().on('click',function(){
                window.location.reload();
            });
        }
        //Tie outcome
        else if(dTotal === pTotal){
            document.getElementById("dcard").innerHTML = dCards;
            document.getElementById("dtotal").innerHTML = dTotal;
            let outcome = "Tie";
            document.getElementById("outcome").innerHTML = outcome;
            $("#playAgain").toggle().on('click',function(){
                window.location.reload();
            });
        }
    }


    deck = createDeck();

    //Deal Cards
    dCards = deal();
    pCards = deal();

    oneCard.push(dCards[0]);

    document.getElementById("dcard").innerHTML = oneCard;
    document.getElementById("pcard").innerHTML = pCards;

    //Convert cards to numerical values
    convertDealer = convertCards(dCards);
    convertPlayer = convertCards(pCards);
    oneCard = convertCards(oneCard);

    //Check Total
    dTotal = oneCard;
    pTotal = checkTotal(convertPlayer);

    document.getElementById("dtotal").innerHTML = dTotal;
    document.getElementById("ptotal").innerHTML = pTotal;

    document.getElementById("pHit").onclick = function() {pHit()};
    document.getElementById("pStay").onclick = function() {winner++; pStay()};

    $("#pStay").on('click', function() {
        $("#pHit").toggle();
        $("#pStay").toggle();
    })

    $("#playAgain").toggle();
})