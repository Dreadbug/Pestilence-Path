// This file contains all the behavior for some of the html elements
// It also holds the game behavior


// #region Lookup tables
let summerTempLookup = {
    "Holy Roman Empire": 20,
    "France": 20,
    "Castile": 20,
    "Portugal": 20,
    "England": 15,
    "Scotland": 10,
    "Norway": 5,
    "Sweden": 5,
    "Novgorod": 5,
    "Lithuania": 10,
    "Poland": 15,
    "Hungary": 15,
    "Bulgaria": 15,
    "Byzantium": 20,
    "Serbia": 15,
    "Naples": 20,
    "Papal States": 20,
}

let fallTempLookup = {
    "Holy Roman Empire": 20,
    "France": 20,
    "Castile": 20,
    "Portugal": 20,
    "England": 15,
    "Scotland": 10,
    "Norway": 5,
    "Sweden": 5,
    "Novgorod": 5,
    "Lithuania": 10,
    "Poland": 15,
    "Hungary": 15,
    "Bulgaria": 15,
    "Byzantium": 20,
    "Serbia": 15,
    "Naples": 20,
    "Papal States": 20,
}

let winterTempLookup = {
    "Holy Roman Empire": 20,
    "France": 20,
    "Castile": 20,
    "Portugal": 20,
    "England": 15,
    "Scotland": 10,
    "Norway": 5,
    "Sweden": 5,
    "Novgorod": 5,
    "Lithuania": 10,
    "Poland": 15,
    "Hungary": 15,
    "Bulgaria": 15,
    "Byzantium": 20,
    "Serbia": 15,
    "Naples": 20,
    "Papal States": 20,
}

let springTempLookup = {
    "Holy Roman Empire": 20,
    "France": 20,
    "Castile": 20,
    "Portugal": 20,
    "England": 15,
    "Scotland": 10,
    "Norway": 5,
    "Sweden": 5,
    "Novgorod": 5,
    "Lithuania": 10,
    "Poland": 15,
    "Hungary": 15,
    "Bulgaria": 15,
    "Byzantium": 20,
    "Serbia": 15,
    "Naples": 20,
    "Papal States": 20,
}

let precipitationLookup = {
    "Stormy" : 0.2,
    "Rainy" : 0.4,
    "Clear" : 0.5,
    "Snowy" : 0.1
}

let windLookup = {
    "Calm" : 0.5,
    "Cooling" : 0.3,
    "Gusty" : 0.15,
    "Straightline" : 0.05
}
// #endregion


// #region Anything that needs to be grabbed from sessionStorage
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

let rations
if (sessionStorage.getItem("rations")) {
    rations = JSON.parse(sessionStorage.getItem("rations"))
}
else {
    rations = "Filling"
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

// Establish the season/weather, country/temp and related difficulty
let season
if (sessionStorage.getItem("season")) {
    season = JSON.parse(sessionStorage.getItem("season"))
}
else {
    season = "fall"
}

let country
if (sessionStorage.getItem("country")) {
    country = JSON.parse(sessionStorage.getItem("country"))
}
else {
    country = "Holy Roman Empire"
}

// Set the temperature based on the season and country
// The temperature is in Celsius
let temperature
if (season == "summer") {
        temperature = summerTempLookup[country]
}
else if (season == "fall") {
        temperature = fallTempLookup[country]
}
else if (season == "winter") {
        temperature = winterTempLookup[country]
}
else {
        temperature = springTempLookup[country]
}


// Keep track of distance
let distance
if (sessionStorage.getItem("distance")) {
    distance = JSON.parse(sessionStorage.getItem("distance"))
}
else {
    distance = 1000
}

let pace
if (sessionStorage.getItem("pace")) {
    pace = JSON.parse(sessionStorage.getItem("pace"))
}
else {
    pace = "Normal"
}

let date
if (sessionStorage.getItem("date")) {
    date = JSON.parse(sessionStorage.getItem("date"))
}
else {
    date = {day:1,month:10,year:1347}
}
// #endregion

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
function initializeGameloop() {
    // Fill in canvas
    const gameCanvas = document.getElementById("gamecanvas")
    gameCanvas.width = window.innerWidth
    gameCanvas.height = window.innerHeight
    const ctx = gameCanvas.getContext("2d")
    ctx.fillStyle = "red"
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)

    // Fill in tables with player info
    populateTables()
}


function populateTables() {
    // Date
    const dateCell = document.getElementById("showdate")
    console.log(date["day"], date["month"], date["year"])
    dateCell.innerHTML = String(date["day"]) + "/" + String(date["month"]) + "/" + String(date["year"])

    // Season
    const seasonCell = document.getElementById("showseason")
    seasonCell.innerHTML = season.charAt(0).toUpperCase() + season.slice(1)

    // Temperature
    const temperatureCell = document.getElementById("showtemperature")
    temperatureCell.innerHTML = String(determineTemperature(season,country)) + " °C"

    // Precipitation
    const precipitationCell = document.getElementById("showprecipitation")
    precipitationCell.innerHTML = determinePrecipitation()

    // Wind
    const windCell = document.getElementById("showwind")
    windCell.innerHTML = determineWind(precipitationCell.innerHTML)

    // Distance
    const distanceCell = document.getElementById("showdistance")
    distanceCell.innerHTML = String(distance) + " km"

    // Pace
    const paceCell = document.getElementById("showpace")
    paceCell.innerHTML = pace

    // Food
    const foodCell = document.getElementById("showfood")
    foodCell.innerHTML = String(playerItems["food"]) + " marc"

    // Rations
    const rationsCell = document.getElementById("showrations")
    rationsCell.innerHTML = rations

    // Health
    const healthCell = document.getElementById("showhealth")
    healthCell.innerHTML = determineOverallHealth()

    // Money
    const moneyCell = document.getElementById("showmoney")
    moneyCell.innerHTML = String(playerItems["money"]) + " pf"

    // Player
    const playerHealthCell = document.getElementById("showyou")
    playerHealthCell.innerHTML = getIndividualHealth("player")

    // Wife
    const wifeNameCell = document.getElementById("showwifename")
    wifeNameCell.innerHTML = playerParty["wife"]
    const wifeHealthCell = document.getElementById("showwife")
    wifeHealthCell.innerHTML = getIndividualHealth("wife")

    // Daughter
    const daughterNameCell = document.getElementById("showdaughtername")
    daughterNameCell.innerHTML = playerParty["daughter"]
    const daughterHealthCell = document.getElementById("showdaughter")
    daughterHealthCell.innerHTML = getIndividualHealth("daughter")

    // Son
    const sonNameCell = document.getElementById("showsonname")
    sonNameCell.innerHTML = playerParty["son"]
    const sonHealthCell = document.getElementById("showson")
    sonHealthCell.innerHTML = getIndividualHealth("son")
}

// Group of functions that return what to put in gameloop fields
// Need to make difficulty adjustemnts within them still
// Ex. stormy weather and straightline winds should make travelling harder, and thus reduce distance travelled
function determineTemperature(currentSeason,currentCountry) {
    // Get lookup table to be used
    let currentLookup
    if (currentSeason == "summer") {
        currentLookup = summerTempLookup
    }
    else if (currentSeason == "fall") {
        currentLookup = fallTempLookup
    }
    else if (currentSeason == "winter") {
        currentLookup = winterTempLookup
    }
    else {
        currentLookup = springTempLookup
    }

    // Establish a base temperature
    const baseTemperature = currentLookup[currentCountry]

    // Modify base temp by a random amount
    const modifier = Math.floor(Math.random() * 10) -5

    return baseTemperature + modifier
}

function determinePrecipitation() {
    const weatherDiceroll = Math.random()
    if ((weatherDiceroll < precipitationLookup["Snowy"]) && (temperature < 0)) {
        return "Snowy"
    }
    else if (weatherDiceroll < precipitationLookup["Stormy"]) {
        return "Stormy"
    }
    else if (weatherDiceroll < precipitationLookup["Rainy"]) {
        return "Rainy"
    }
    else {
        return "Clear"
    }
}

function determineWind(currentPrecipitation) {
    let windDiceroll = Math.random()
    if (currentPrecipitation == "Snowy") {
        windDiceroll -= 0.7
    }
    else if (currentPrecipitation == "Stormy") {
        windDiceroll -= 0.9
    }
    
    if (windDiceroll < windLookup["Straightline"]) {
        return "Straightline"
    }
    else if (windDiceroll < windLookup["Gusty"]) {
        return "Gusty"
    }
    else if (windDiceroll < windLookup["Cooling"]) {
        return "Cooling"
    }
    else {
        return "Calm"
    }
}

function getIndividualHealth(member) {
    // Check if the member is healthy, sick or dead
    if (playerHealth[member] == 0) {
        return "Healthy"
    }
    else if (playerHealth[member] == -1) {
        return "Sick"
    }
    else {
        return "Brink of Death"
    }
}

function determineOverallHealth() {
    let partyNumber = 0
    let isHealthy = 0
    
    for (const member in playerHealth) {
        if (playerHealth[member] == 0) {
            isHealthy += 1
        }
        else if (playerHealth[member] == -1) {
            isHealthy -= 1
        }
        else {
            isHealthy -= 2
        }
        partyNumber += 1
    }

    const healthRatio = isHealthy / partyNumber
    if (healthRatio < 0) {
        return "Very poor"
    }
    else if (healthRatio == 0) {
        return "Poor"
    }
    else if (healthRatio < 0.5) {
        return "Fair"
    }
    else if (healthRatio < 1) {
        return "Good"
    }
    else {
        return "Excellent"
    }
}

// For checking if values are changed
function logAValue() {
    console.log(playerParty)
}
