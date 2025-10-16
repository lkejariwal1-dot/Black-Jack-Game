isAlive = true
hasJacked = false

let Player = {
    name: "Per",
    chips: 100,
    cards: [],
    sum: 0
}

let mgs = document.getElementById("play-text")
let sum_display = document.getElementById("sum-text")
let card_display = document.getElementById("cards-text")
let balance = document.getElementById("Player")

function RandomNumber() {
    return Math.floor(Math.random() * 10 + 2)
}

function check() {
    if (Player.sum < 21) {
        mgs.innerText = "Do you want to draw new card?"
    }
    else if (Player.sum === 21) {
        mgs.innerText = "You got BlackJack.\nWant to play a round?"
        Player.chips += 100
        balance.innerText = Player.name + ": $" + Player.chips
        card_display.innerText = "Cards:"
    }
    else if (Player.chips === 0 || Player.sum > 21) {
        mgs.innerText = "You are out of the game."
        hasJacked = true
        isAlive = false
        balance.innerText = Player.name + ": $0"
    }
}

function Start() {
    if (!isAlive && hasJacked) {
        Player.sum = 0
        Player.cards = []
        Player.chips = 100
        isAlive = true
        hasJacked = false
        sum_display.innerText = "Sum:"
        card_display.innerText = "Cards:"
    }
    if (Player.sum === 21) {
        Player.sum = 0
        Player.cards = []
        mgs.innerText = "Want to play another round?"
        sum_display.innerText = "Sum:"
        card_display.innerText = "Cards:"
    }
    Player.cards.push(RandomNumber())
    Player.cards.push(RandomNumber())
    Player.sum = Player.cards[0] + Player.cards[1]
    balance.innerText = Player.name + ": $" + Player.chips
    check()
    sum_display.innerText = "Sum: " + Player.sum
    let cards = "Cards: "
    for (let i = 0; i < Player.cards.length; i++) {
        cards += Player.cards[i] + " "
    }
    card_display.innerText = cards
}

function New_Card() {
    if (isAlive && !hasJacked && Player.sum !== 21) {
        Player.chips -= 10
        balance.innerText = Player.name + ": $" + Player.chips
        Player.cards.push(RandomNumber())
        Player.sum = 0
        for (let i = 0; i < Player.cards.length; i++) {
            Player.sum += Player.cards[i]
        }
        check()
        sum_display.innerText = "Sum: " + Player.sum
        let cards = "Cards: "
        for (let i = 0; i < Player.cards.length; i++) {
            cards += Player.cards[i] + " "
        }
        card_display.innerText = cards
    }
    else if (Player.sum === 21) {
        Start()
    }
    else {
        mgs.innerText = "You're out of game.... Start a new game."
    }
}
