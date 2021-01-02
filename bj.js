$(function(){

    let set = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let deck = [];
    let dCards = [];
    let oneCard = [];
    let pCards = [];
    let winner = 0;

    //Create the deck
    for(let i = 0; i < set.length; i++){
        deck.push(set[i]);
        deck.push(set[i]);
        deck.push(set[i]);
        deck.push(set[i]);
    }


    //Check deck
    for(let i= 0; i < deck.length; i++){
        if(deck[i] === "A"){
            //console.log("A : 1 or 11");
        }
        else if(deck[i] === "J" || deck[i] ==="Q" || deck[i] ==="K"){
            //console.log(deck[i],": 10");
        }
        else{
            //console.log(deck[i]);
        }
    }

    function printArray(array){
        for(let i = 0; i < array.length; i++){
            console.log(array[i]);
        }
    }

    //Deal cards
    function Deal(){
        dCards.push(deck[Math.floor(Math.random() * deck.length)]);
        dCards.push(deck[Math.floor(Math.random() * deck.length)]);
        oneCard[0] = dCards[0];

        pCards.push(deck[Math.floor(Math.random() * deck.length)]);
        pCards.push(deck[Math.floor(Math.random() * deck.length)]);
    }

    //Check for ace and face cards
    function checkCards(card){
        for(let i = 0; i < card.length; i++){
            if(card[i] === "A"){
                card[i] = 11;
            }
            else if(card[i] === "J" || card[i] ==="Q" || card[i] ==="K"){
                card[i] = 10;
            }
            else card[i] = parseInt(card[i]);
        }
        return card;
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
        checkCards(pCards);
        pTotal = checkTotal(pCards);
        console.log(pCards);
        document.getElementById("pcard").innerHTML = pCards;
        document.getElementById("ptotal").innerHTML = pTotal;
    }

    //Player stay
    function pStay(){
        //Dealer hits until higher than player
        while(dTotals < pTotal && dTotals <=21){
            dCards.push(deck[Math.floor(Math.random() * deck.length)]);
            checkCards(dCards);
            dTotals = checkTotal(dCards);
            console.log(dCards);
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

    //Print hand for both players in console
    function printHand(){
        console.log("Dealer's Hand:", dCards);
        console.log("Player's Hand:", pCards);
        console.log();
    }

    //Print total for both players in console
    function printTotal(){
        console.log("Dealer Total:", dTotal);
        console.log("Player Total:", pTotal);
        console.log();
    }

    //Deal Cards
    Deal();

    //Print Cards
    printHand();

    document.getElementById("dcard").innerHTML = oneCard;
    document.getElementById("pcard").innerHTML = pCards;

    //Check cards
    checkCards(dCards);
    checkCards(pCards);
    checkCards(oneCard);

    //Check Total
    let dTotal = oneCard;
    let dTotals = checkTotal(dCards);
    let pTotal = checkTotal(pCards);

    //Print Total
    printTotal();

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