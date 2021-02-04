$(function(){

    let dCards = [];
    let oneCard = [];
    let pCards = [];
    let winner = 0;
    let dTotal= 0;
    let dTotals = 0;
    let pTotal = 0;


    //Create the deck
    function createDeck(){
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
    function dealDealer(){
        dCards.push(deck[Math.floor(Math.random() * deck.length)]);
        dCards.push(deck[Math.floor(Math.random() * deck.length)]);
        return dCards;
    }

    function dealPlayer (){
        pCards.push(deck[Math.floor(Math.random() * deck.length)]);
        pCards.push(deck[Math.floor(Math.random() * deck.length)]);
        return pCards;
    }
    

    //Convert cards to numeric value
    function convertCards(cards){
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
    function checkTotal(cards){
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

    function checkWinner(total, winner){
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
    function pHit(){
        pCards.push(deck[Math.floor(Math.random() * deck.length)]);
        pCards = convertCards(pCards);
        pTotal = checkTotal(pCards);
        checkWinner(pTotal, winner);
        document.getElementById("pcard").innerHTML = pCards;
        document.getElementById("ptotal").innerHTML = pTotal;
    }

    //Player stay
    function pStay(){
        //Dealer hits until higher than player
        while(dTotals < pTotal && dTotals <=21){
            dCards.push(deck[Math.floor(Math.random() * deck.length)]);
            dCards = convertCards(dCards);
            dTotals = checkTotal(dCards);
            checkWinner(dTotals, winner);
            document.getElementById("dcard").innerHTML = dCards;
            document.getElementById("dtotal").innerHTML = dTotals;
        }
        //Dealer total higher than player
        if(dTotals > pTotal && dTotals <= 21){
            dTotals = checkTotal(dCards);
            document.getElementById("dcard").innerHTML = dCards;
            document.getElementById("dtotal").innerHTML = dTotals;

            let outcome = "Dealer's hand is larger. You lose!";
            document.getElementById("outcome").innerHTML = outcome;
            $("#playAgain").toggle().on('click',function(){
                window.location.reload();
            });
        }
        //Tie outcome
        else if(dTotals === pTotal){
            document.getElementById("dcard").innerHTML = dCards;
            document.getElementById("dtotal").innerHTML = dTotals;
            let outcome = "Tie";
            document.getElementById("outcome").innerHTML = outcome;
            $("#playAgain").toggle().on('click',function(){
                window.location.reload();
            });
        }
    }


    deck = createDeck();

    //Deal Cards
    dCards = dealDealer();
    pCards = dealPlayer();

    oneCard = dCards[0];

    document.getElementById("dcard").innerHTML = oneCard;
    document.getElementById("pcard").innerHTML = pCards;

    //Convert cards to numerical values
    dCards = convertCards(dCards);
    pCards = convertCards(pCards);
    oneCard = convertCards(oneCard);

    //Check Total
    dTotal = oneCard;
    dTotals = checkTotal(dCards);
    pTotal = checkTotal(pCards);


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