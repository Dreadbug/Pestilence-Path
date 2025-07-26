// This file contains all the behavior for some of the html elements
// It also holds the game behavior


// Establish player
let playerParty
if (sessionStorage.getItem("playerParty")) {
    playerParty = JSON.parse(sessionStorage.getItem("playerParty"))
}
else {
    playerParty = {player:'You',wife:'Petra',daughter:'Margeratta',son:'Gunther'}
}

let playerHealth
if (sessionStorage.getItem("playerHealth")) {
    playerHealth = JSON.parse(sessionStorage.getItem("playerHealth"))
}
else {
    playerHealth = {player:0,wife:0,daughter:0,son:0}
}

let playerItems
if (sessionStorage.getItem("playerItems")) {
    playerItems = JSON.parse(sessionStorage.getItem("playerItems"))
}
else {
    playerItems = {food:0,arrows:0,money:100,herbs:0,wheel:0,axle:0,tongue:0,clothes:0,oxen:0}
}

let scoreMultiplier
if (sessionStorage.getItem("scoreMultiplier")) {
    scoreMultiplier = JSON.parse(sessionStorage.getItem("scoreMultiplier"))
}
else {
    scoreMultiplier = 1.0
}


// Establish the season/weather and related difficulty
let season
if (sessionStorage.getItem("season")) {
    season = JSON.parse(sessionStorage.getItem("season"))
}
else {
    season = "fall"
}

let seasonTemp
if (sessionStorage.getItem("seasonTemp")) {
    seasonTemp = JSON.parse(sessionStorage.getItem("seasonTemp"))
}
else {
    seasonTemp = 10
}

// Keep track of days and distance
let distance = 0
let days = 0

let date
if (sessionStorage.getItem("date")) {
    date = JSON.parse(sessionStorage.getItem("date"))
}
else {
    date = "1/10/1347"
}


// Button on story screen
let numClicks = 0
function changeTitleText() {
    const storyText = document.getElementById("storytext")
    numClicks += 1
    if (numClicks == 1) {
        storyText.innerHTML = "...Medieval Europe. 1347. A time of sorrow and suffering..."
        document.body.style.backgroundImage = "url('assets/suffering.png')"
    }
    else if (numClicks == 2) {
        storyText.innerHTML = "...the Plague ravages the wicked and the righteous alike..."
    }
    else if (numClicks == 3) {
        storyText.innerHTML = "...no one is safe from its evil influence..."
        document.body.style.backgroundImage = "url('assets/no one.png')"
    }
    else if (numClicks == 4) {
        storyText.innerHTML = "...someone needs to bring the light to this forsaken place..."
        document.body.style.backgroundImage = "url('assets/someone.png')"
    }
    else if (numClicks == 5) {
        storyText.innerHTML = "...Doctor, we need you more than ever."
        storyText.style.color = "black"
        document.body.style.backgroundImage = "url('assets/doctor.png')"
    }
    else {
        window.location.href = "creator.html"
    }
}

// Add names (if any were written) to playerParty
function changePartyNames() {
    const newWifeName = document.getElementById("wifename").value
    const newDaughterName = document.getElementById("daughtername").value
    const newSonName = document.getElementById("sonname").value
    if (newWifeName != "") {
        playerParty["wife"] = newWifeName
    }
    if (newDaughterName != "") {
        playerParty["daughter"] = newDaughterName
    }
    if (newSonName != "") {
        playerParty["son"] = newSonName
    }
    // Add localStorage json saving and apply to shop.html
    sessionStorage.setItem("playerParty",JSON.stringify(playerParty))
    window.location.href = "creator_2.html"
}

// Update money based on occupation
function changeJobMoney(job) {
    if (job == "farmer") {
        playerItems["money"] = 50
        playerItems["food"] = 200
        scoreMultiplier = 2.0
        document.getElementById("farmeroption").style.color = "green"
        document.getElementById("barberoption").style.color = "white"
        document.getElementById("doctoroption").style.color = "white"
    }
    else if (job == "medic") {
        playerItems["money"] = 200
        playerItems["herbs"] = 50
        document.getElementById("farmeroption").style.color = "white"
        document.getElementById("barberoption").style.color = "white"
        document.getElementById("doctoroption").style.color = "green"
        scoreMultiplier = 1.0
    }
    else {
        playerItems["money"] = 125
        document.getElementById("farmeroption").style.color = "white"
        document.getElementById("barberoption").style.color = "green"
        document.getElementById("doctoroption").style.color = "white"
        scoreMultiplier = 0.25
    }

    // Save to session storage
    sessionStorage.setItem("playerItems",JSON.stringify(playerItems))
    sessionStorage.setItem("scoreMultiplier",JSON.stringify(scoreMultiplier))
}

// Update a bunch of difficulty variables based on chosen season
// The date is European format (d/m/y)
function changeInitialSeason(chosenSeason) {
    season = chosenSeason
    if (chosenSeason == "winter") {
        seasonTemp = 0
        date = "1/1/1347"
        document.getElementById("winteroption").style.color = "royalblue"
        document.getElementById("springoption").style.color = "white"
        document.getElementById("summeroption").style.color = "white"
        document.getElementById("falloption").style.color = "white"
    }
    else if (chosenSeason == "spring") {
        seasonTemp = 15
        date = "1/4/1347"
        document.getElementById("winteroption").style.color = "white"
        document.getElementById("springoption").style.color = "hotpink"
        document.getElementById("summeroption").style.color = "white"
        document.getElementById("falloption").style.color = "white"
    }
    else if (chosenSeason == "summer") {
        seasonTemp = 20
        date = "1/7/1347"
        document.getElementById("winteroption").style.color = "white"
        document.getElementById("springoption").style.color = "white"
        document.getElementById("summeroption").style.color = "orange"
        document.getElementById("falloption").style.color = "white"
    }
    else {
        seasonTemp = 10
        date = "1/10/1347"
        document.getElementById("winteroption").style.color = "white"
        document.getElementById("springoption").style.color = "white"
        document.getElementById("summeroption").style.color = "white"
        document.getElementById("falloption").style.color = "sienna"
    }

    // Save to session storage
    sessionStorage.setItem("season",JSON.stringify(season))
    sessionStorage.setItem("seasonTemp",JSON.stringify(seasonTemp))
    sessionStorage.setItem("date",JSON.stringify(date))
}

// Calculate player's current bill and display it to them
function calculateBill() {
    const food = document.getElementById("foodbought").value
    const arrows = document.getElementById("ammobought").value
    const herbs = document.getElementById("herbsbought").value
    const wheel = document.getElementById("wheelsbought").value
    const axle = document.getElementById("axlesbought").value
    const tongue = document.getElementById("tonguesbought").value
    const clothes = document.getElementById("clothesbought").value
    const oxen = document.getElementById("oxenbought").value

    let totalBill = (food * 1) + (arrows * 5) + (herbs * 10) + (wheel * 30) + (axle * 30) + (tongue * 30) + (clothes * 15) + (oxen * 50)

    if ((playerItems["money"] - totalBill) < 0) {
        alert("You do not have enough money to pay for this bill! Please reduce your purchases.")
        return
    }
    else {
        document.getElementById("moneyavailable").innerHTML = playerItems["money"] - totalBill
    }
}

// Reduce player's money and update their items
function finishPurchase() {
    const food = document.getElementById("foodbought").value
    const arrows = document.getElementById("ammobought").value
    const herbs = document.getElementById("herbsbought").value
    const wheel = document.getElementById("wheelsbought").value
    const axle = document.getElementById("axlesbought").value
    const tongue = document.getElementById("tonguesbought").value
    const clothes = document.getElementById("clothesbought").value
    const oxen = document.getElementById("oxenbought").value

    let totalBill = (food * 1) + (arrows * 5) + (herbs * 10) + (wheel * 30) + (axle * 30) + (tongue * 30) + (clothes * 15) + (oxen * 50)

    if ((playerItems["money"] - totalBill) < 0) {
        alert("You do not have enough money to pay for this bill! Please reduce your purchases.")
        return
    }
    else {
        playerItems["money"] -= totalBill
        playerItems["food"] += parseInt(food)
        playerItems["arrows"] += (parseInt(arrows) * 20)
        playerItems["herbs"] += parseInt(herbs)
        playerItems["wheel"] += parseInt(wheel)
        playerItems["axle"] += parseInt(axle)
        playerItems["tongue"] += parseInt(tongue)
        playerItems["clothes"] += parseInt(clothes)
        playerItems["oxen"] += (parseInt(oxen) * 2)

        // Save to session storage
        sessionStorage.setItem("playerItems",JSON.stringify(playerItems))

        // Send player to next page
        window.location.href = "ready_to_begin.html"
    }
}

// Populate canvas with text and starting animation
function initializeCanvas() {
    // Get game canvas
    const gameCanvas = document.getElementById("gamecanvas")
    const ctx = gameCanvas.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
    ctx.font = "45px Manufacturing Consent"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("Your Party", gameCanvas.width / 2,100)
}

// For checking if values are changed
function logAValue() {
    console.log(playerParty)
}
