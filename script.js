// This file contains all the behavior for some of the html elements
// It also holds the game behavior


// #region Lookup tables
let summerTempLookup = {
    "Holy Roman Empire": 23, // Uses Bavaria as a reference
    "France": 20, // Uses Paris as a reference
    "Castile": 30, // Uses Madrid as a reference
    "Portugal": 23, // Uses Lisbon as a reference
    "England": 19, // Uses London as a reference
    "Scotland": 17, // Uses Glasgow as a reference
    "Norway": 12, // Uses Oslo as a reference
    "Sweden": 18, // Uses Stockholm as a reference
    "Novgorod": 21, // Uses St. Petersburg as a reference
    "Lithuania": 22, // Uses Vilnius as a reference
    "Poland": 20, // Uses Warsaw as a reference
    "Hungary": 26, // Uses Budapest as a reference
    "Bulgaria": 25, // Uses Sofia as a reference
    "Byzantium": 32, // Uses Athens as a reference
    "Serbia": 29, // Uses Belgrade as a reference
    "Kingdom of Naples": 27, // Uses Naples as a reference
    "Papal States": 24 // Uses Vatican City as a reference
}

let fallTempLookup = {
    "Holy Roman Empire": 15, // Uses Bavaria as a reference
    "France": 12, // Uses Paris as a reference
    "Castile":21, // Uses Madrid as a reference
    "Portugal": 15, // Uses Lisbon as a reference
    "England": 13, // Uses London as a reference
    "Scotland": 12, // Uses Glasgow as a reference
    "Norway": 9, // Uses Oslo as a reference
    "Sweden": 7, // Uses Stockholm as a reference
    "Novgorod": 6, // Uses St. Petersburg as a reference
    "Lithuania": 10, // Uses Vilnius as a reference
    "Poland": 11, // Uses Warsaw as a reference
    "Hungary": 14, // Uses Budapest as a reference
    "Bulgaria": 16, // Uses Sofia as a reference
    "Byzantium": 23, // Uses Athens as a reference
    "Serbia": 16, // Uses Belgrade as a reference
    "Kingdom of Naples": 20, // Uses Naples as a reference
    "Papal States": 21 // Uses Vatican City as a reference
}

let winterTempLookup = {
    "Holy Roman Empire": -3, // Uses Bavaria as a reference
    "France": 5, // Uses Paris as a reference
    "Castile": 2, // Uses Madrid as a reference
    "Portugal": 8, // Uses Lisbon as a reference
    "England": 6, // Uses London as a reference
    "Scotland": 1, // Uses Glasgow as a reference
    "Norway": -7, // Uses Oslo as a reference
    "Sweden": -5, // Uses Stockholm as a reference
    "Novgorod": -9, // Uses St. Petersburg as a reference
    "Lithuania": -4, // Uses Vilnius as a reference
    "Poland": -2, // Uses Warsaw as a reference
    "Hungary": -1, // Uses Budapest as a reference
    "Bulgaria": -6, // Uses Sofia as a reference
    "Byzantium": 7, // Uses Athens as a reference
    "Serbia": 0, // Uses Belgrade as a reference
    "Kingdom of Naples": 9, // Uses Naples as a reference
    "Papal States": 10 // Uses Vatican City as a reference
}

let springTempLookup = {
    "Holy Roman Empire": 14, // Uses Bavaria as a reference
    "France": 11, // Uses Paris as a reference
    "Castile": 20, // Uses Madrid as a reference
    "Portugal": 12, // Uses Lisbon as a reference
    "England": 11, // Uses London as a reference
    "Scotland":7, // Uses Glasgow as a reference
    "Norway": 2, // Uses Oslo as a reference
    "Sweden": 3, // Uses Stockholm as a reference
    "Novgorod": 0, // Uses St. Petersburg as a reference
    "Lithuania": 8, // Uses Vilnius as a reference
    "Poland": 9, // Uses Warsaw as a reference
    "Hungary": 15, // Uses Budapest as a reference
    "Bulgaria": 13, // Uses Sofia as a reference
    "Byzantium": 16, // Uses Athens as a reference
    "Serbia": 10, // Uses Belgrade as a reference
    "Kingdom of Naples": 17, // Uses Naples as a reference
    "Papal States": 14 // Uses Vatican City as a reference
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

let distanceLookup = {
    "Holy Roman Empire": 846, // HRE to France
    "France": 1275, // France to Spain
    "Castile": 625, // Spain to Portugal
    "Portugal": 2189, // Portugal to England (by water)
    "England": 415, // England to Scotland
    "Scotland": 995, // Scotland to Norway
    "Norway": 557, // Norway to Sweden
    "Sweden": 866, // Sweden to Novgorod
    "Novgorod": 722, // Novgorod to Lithuania
    "Lithuania": 524, // Lithuania to Poland
    "Poland": 859, // Poland to Hungary
    "Hungary": 770, // Hungary to Bulgaria
    "Bulgaria": 791, // Bulgaria to Byzantium
    "Byzantium": 1095, // Byzantium to Serbia
    "Serbia": 740, // Serbia to Kingdom of Naples
    "Kingdom of Naples": 244, // Kingdom of Naples to Papal States
    "Papal States": 890 // Papal States to HRE
}
// #endregion

// #region Events
let summerEvents = {
    "A nearby village is willing to trade 150 marc of their harvest for your services (8 marc of herbs). Accept?" : {"food" : 150,"herbs" : -8},
    "The budding harvest has attracted locusts. Lose 20 marc of food." : {"food" : -20},
    "You see a good omen in the sky as the sun sets. Gain 20 pf." : {"money" : 20},
    "You see a bad omen in the sky as the midnight sun sets. Your party feels uneasy." : {"hurt" : 4},
    "A blistering heatwave keeps your party from going any further. Lose 7 days." : {"delay" : 7},
}

let fallEvents = {
    "A nearby manor offers you 100 pf for an ox to plow the fields. Accept?" : {"money" : 100, "oxen" : -1},
    "A will o' the wisp appears in front of your party. You follow it to an old war stash. Gain 20 arrows" : {"arrows" : 20},
    "A nearby manor is willing to trade wagon parts for hayrides. Accept?" : {"wheel" : 1,"axle" : 1,"tongue" : 1},
    "A local vassel offers you an old ox for 15 pf. Accept?" : {"money" : -15,"oxen" : 1},
    "The spirit of the harvest is in full swing. You get lost in a yet-unplowed field. Gain 200 marc of food, lose 2 days." : {"food" : 200,"delay" : 2},
}

let winterEvents = {
    "A nearby village is willing to trade 150 marc of their harvest for your services (8 marc of herbs). Accept?" : {"food" : 150,"herbs" : -8},
    "The budding harvest has attracted locusts. Lose 20 marc of food." : {"food" : -20},
    "You see a good omen in the sky as the sun sets. Gain 20 pf." : {"money" : 20},
    "You see a bad omen in the sky as the midnight sun sets. Your party feels uneasy." : {"hurt" : 4},
    "A blistering heatwave keeps your party from going any further. Lose 7 days." : {"delay" : 7},
}

let springEvents = {
    "A nearby village is willing to trade 150 marc of their harvest for your services (8 marc of herbs). Accept?" : {"food" : 150,"herbs" : -8},
    "The budding harvest has attracted locusts. Lose 20 marc of food." : {"food" : -20},
    "You see a good omen in the sky as the sun sets. Gain 20 pf." : {"money" : 20},
    "You see a bad omen in the sky as the midnight sun sets. Your party feels uneasy." : {"hurt" : 4},
    "A blistering heatwave keeps your party from going any further. Lose 7 days." : {"delay" : 7},
}

let generalEvents = {
    "A nearby village is willing to trade 150 marc of their harvest for your services (8 marc of herbs). Accept?" : {"food" : 150,"herbs" : -8},
    "The budding harvest has attracted locusts. Lose 20 marc of food." : {"food" : -20},
    "You see a good omen in the sky as the sun sets. Gain 20 pf." : {"money" : 20},
    "You see a bad omen in the sky as the midnight sun sets. Your party feels uneasy." : {"hurt" : 4},
    "A blistering heatwave keeps your party from going any further. Lose 7 days." : {"delay" : 7},
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
    distance = distanceLookup[country]
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

let obstacle
if (sessionStorage.getItem("obstacle")) {
    obstacle = JSON.parse(sessionStorage.getItem("obstacle"))
}
else {
    obstacle = "river" // Player needs to cross the Rhine as the first obstacle
}

let paceMultiplier = 1.0

let foodMultiplier = 1.0

let eventDifficulty = 1.0
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
        temperature = winterTempLookup[country]

        date = {day:1,month:1,year:1347}

        foodMultiplier = 0.5

        document.getElementById("winteroption").style.color = "royalblue"
        document.getElementById("springoption").style.color = "white"
        document.getElementById("summeroption").style.color = "white"
        document.getElementById("falloption").style.color = "white"
    }
    else if (chosenSeason == "spring") {
        temperature = springTempLookup[country]

        date = {day:1,month:4,year:1347}

        foodMultiplier = 1.2

        document.getElementById("winteroption").style.color = "white"
        document.getElementById("springoption").style.color = "hotpink"
        document.getElementById("summeroption").style.color = "white"
        document.getElementById("falloption").style.color = "white"
    }
    else if (chosenSeason == "summer") {
        temperature = summerTempLookup[country]

        date = {day:1,month:7,year:1347}

        foodMultiplier = 1.0

        document.getElementById("winteroption").style.color = "white"
        document.getElementById("springoption").style.color = "white"
        document.getElementById("summeroption").style.color = "orange"
        document.getElementById("falloption").style.color = "white"
    }
    else {
        temperature = fallTempLookup[country]

        date = {day:1,month:10,year:1347}

        foodMultiplier = 1.5

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
        document.getElementById("moneyavailable").innerHTML = "Not enough money! Please reduce your purchases!"
        return
    }
    else {
        document.getElementById("moneyavailable").innerHTML = "You have " + String(playerItems["money"] - totalBill) + " pf left to spend!"
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
        document.getElementById("moneyavailable").innerHTML = "Not enough money! Please reduce your purchases!"
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

    // Fill back of canvas with black
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,gameCanvas.width,gameCanvas.height)

    // Fill in ground with seasonal color
    if (season == "winter") {
        ctx.fillStyle = "#1C9E66"
    }
    else if (season == "spring") {
        ctx.fillStyle = "#1C9E20"
    }
    else if (season == "summer") {
        ctx.fillStyle = "#759E1C"
    }
    else {
        ctx.fillStyle = "#9E541C"
    }
    ctx.fillRect(0,gameCanvas.height - 300,gameCanvas.width,300)

    // Fill in GUI area, eventually this will be textured instead of solid colors
    ctx.fillStyle = "#DED36D"
    ctx.fillRect(0,0,420,gameCanvas.height)
    ctx.fillRect(0,gameCanvas.height-175,gameCanvas.width,175)

    // Fill in tables with player info
    populateTables()
}


function populateTables() {
    paceMultiplier = 1.0 // Reset pacemultiplier

    // Date
    const dateCell = document.getElementById("showdate")
    dateCell.innerHTML = String(date["day"]) + "/" + String(date["month"]) + "/" + String(date["year"])

    // Season
    const seasonCell = document.getElementById("showseason")
    seasonCell.innerHTML = season.charAt(0).toUpperCase() + season.slice(1)
    eventDifficulty = resetEventDifficulty(season) // Reset event difficulty by season
    determineFoodMultiplier(season)

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

    // Country
    const countryCell = document.getElementById("showcountry")
    countryCell.innerHTML = String(country)
    
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

// #region Group of functions that return what to put in gameloop fields
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

    let fullTemp = baseTemperature + modifier

    if (fullTemp > 27 || fullTemp < 10) {
        eventDifficulty += 0.2
    }

    return fullTemp
}

function determinePrecipitation() {
    const weatherDiceroll = Math.random()
    if ((weatherDiceroll < precipitationLookup["Snowy"]) && (temperature < 0)) {
        paceMultiplier -= 0.5
        eventDifficulty += 0.3
        return "Snowy"
    }
    else if (weatherDiceroll < precipitationLookup["Stormy"]) {
        paceMultiplier -= 0.75
        eventDifficulty += 0.2
        return "Stormy"
    }
    else if (weatherDiceroll < precipitationLookup["Rainy"]) {
        paceMultiplier -= 0.25
        eventDifficulty += 0.1
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
        paceMultiplier -= 0.5
        eventDifficulty += 0.2
        return "Straightline"
    }
    else if (windDiceroll < windLookup["Gusty"]) {
        paceMultiplier += 0.25
        eventDifficulty += 0.1
        return "Gusty"
    }
    else if (windDiceroll < windLookup["Cooling"]) {
        paceMultiplier += 0.5
        eventDifficulty -= 0.1
        return "Cooling"
    }
    else {
        paceMultiplier += 1.0
        eventDifficulty -= 0.2
        return "Calm"
    }
}

function getIndividualHealth(member) {
    // Check if the member is healthy, sick or dead
    if (playerHealth[member] == 0) {
        paceMultiplier += 0.2
        return "Healthy"
    }
    else if (playerHealth[member] == -1) {
        paceMultiplier -= 0.1
        return "Sick"
    }
    else if (playerHealth[member] == -2) {
        paceMultiplier -= 0.2
        return "Brink of Death"
    }
    else {
        return "Dead"
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

function determineFoodMultiplier(season) {
    if (season == "fall") {
        foodMultiplier += 1.0
    }
    else if (season == "winter") {
        foodMultiplier -= 0.75
    }
    else if (season == "spring") {
        foodMultiplier += 0.1
    }
    else {
        foodMultiplier += 0.5
    }
}

function resetEventDifficulty(season) {
    switch (season) {
        case "summer":
            return 1.0
        
        case "spring":
            return 0.7
        
        case "winter":
            return 1.5
        
        default:
            return 0.5
    }
}
// #endregion

// #region The regular gameloop
// Advance one normal day without delays
let alreadyHasEvent = false
function advanceOneDay(date,isStopped) {
    let event = "none"

    if (!isStopped) {
        animateWagon() // Show the wagon moving

        distance = calculateRemainingDistance(playerItems["oxen"],pace,paceMultiplier,distance) // Calculate new distance

        if (distance <= 0) {
            if (country == "Papal States") {
                window.location.href = "victory.html"
            }
            else {
                const keys = Object.keys(distanceLookup)
                country = keys.at(keys.indexOf(country) + 1)
                distance = distanceLookup[country]
            }
        }

        animateOther() // Show a checkpoint or obstacle approaching

        event = selectEventType() // See if an event occurs, party can be delayed

        alreadyHasEvent = false
    }
    else {
        if (!alreadyHasEvent) {
            event = selectEventType() // See if another event occurs, delay cannot be lengthened
            alreadyHasEvent = true
        }
    }

    if (event != "none") {
        displayEvent(event,season,isStopped)
    }

    advanceDate(date) // Move date one day forward and change month/year if needed

    season = updateSeason(date) // Update season

    consumeFood(rations,playerItems,playerHealth,playerParty) // Consume food based on rations

    populateTables() // Fill in tables once everything is complete
}

// Advance through a delay without moving
function advanceMultipleDays(date,delayLength) {
    let i = 0
        
    let intervalID = setInterval(function() {
        i += 1;

        if ( i == delayLength) {
        clearInterval(intervalID)
        };

        advanceOneDay(date,true)},1000)
}

function animateWagon() {

}

function animateOther() {

}

function updatePace(newPace) {
    pace = newPace

    // Pace
    const paceCell = document.getElementById("showpace")
    paceCell.innerHTML = pace
}

function updateRations(newRations) {
    rations = newRations

    // Rations
    const rationsCell = document.getElementById("showrations")
    rationsCell.innerHTML = rations
}

function advanceDate(date) {
    date["day"] += 1
    if ([1,3,5,7,8,10,12].includes(date["month"]) && date["day"] >= 32) {
        if (date["month"] == 12) { // New Year's Eve to New Year's Day
            date["month"] = 1
            date["day"] = 1
            date["year"] += 1
        }
        else {
            date["month"] += 1
            date["day"] = 1   
        }
    }
    else if ([4,6,9,11].includes(date["month"]) && date["day"] > 30) {
        date["month"] += 1
        date["day"] = 1
    }
    else if (date["year"] % 4 != 0 && date["day"] > 28 && date["month"] == 2) { // Non-leap day
            date["month"] += 1
            date["day"] = 1
        }
    else if (date["year"] % 4 == 0 && date["day"] > 29 && date["month"] == 2) { // Leap day
            date["month"] += 1
            date["day"] = 1
        }
    else {}
}

function updateSeason(date) {
    if ([1,2,3].includes(date["month"])) {
        return "winter"
    }
    else if ([4,5,6].includes(date["month"])) {
        return "spring"
    }
    else if ([7,8,9].includes(date["month"])) {
        return "summer"
    }
    else {
        return "fall"
    }
}

function calculateRemainingDistance(numOxen,currentPace,multiplier,distanceRemaining) {
    let newDistance

    if (currentPace == "Grueling") {
        newDistance = distanceRemaining - Math.round(8 * (1.0 + multiplier) + 2 * numOxen)
    }
    else if (currentPace == "Leisurely") {
        newDistance = distanceRemaining - Math.round(2 * (1.0 + multiplier) + 2 * numOxen)
    }
    else {
        newDistance = distanceRemaining - Math.round(4 * (1.0 + multiplier) + 2 * numOxen)
    }

    // Make sure party doesn't go backwards
    if (newDistance > distanceRemaining) {
        return distanceRemaining
    }
    else {
        return newDistance
    }
}

function selectEventType() {
    const eventDiceroll = Math.random()

    if (eventDiceroll <= 0.2 && eventDiceroll > 0.1) { // Nonseasonal event
        return "nonseasonal"
    }
    else if (eventDiceroll <= 0.1) { // Seasonal event
        return "seasonal"
    }
    else {
        return "none"
    }
}

function displayEvent(eventType,currentSeason,isStopped) {
    let eventOutcome
    let eventText
    let eventList

    // Get event list and randomly select an event
    if (eventType == "seasonal") {
        if (currentSeason == "summer") {
            eventList = summerEvents
            if (isStopped) {
                eventOutcome = summerEvents[Object.keys(summerEvents)[Math.floor(Math.random() * (Object.keys(summerEvents).length - 1))]]
            }
            else {
                eventOutcome = summerEvents[Object.keys(summerEvents)[Math.floor(Math.random() * Object.keys(summerEvents).length)]]
            }
        }
        else if (currentSeason == "fall") {
            eventList = fallEvents
            if (isStopped) {
                eventOutcome = fallEvents[Object.keys(fallEvents)[Math.floor(Math.random() * (Object.keys(fallEvents).length - 1))]]
            }
            else {
                eventOutcome = fallEvents[Object.keys(fallEvents)[Math.floor(Math.random() * Object.keys(fallEvents).length)]]
            }
        }
        else if (currentSeason == "winter") {
            eventList = winterEvents
            if (isStopped) {
                eventOutcome = winterEvents[Object.keys(winterEvents)[Math.floor(Math.random() * (Object.keys(winterEvents).length - 1))]]
            }
            else {
                eventOutcome = winterEvents[Object.keys(winterEvents)[Math.floor(Math.random() * Object.keys(winterEvents).length)]]
            }
        }
        else {
            eventList = springEvents
            if (isStopped) {
                eventOutcome = springEvents[Object.keys(springEvents)[Math.floor(Math.random() * (Object.keys(springEvents).length - 1))]]
            }
            else {
                eventOutcome = springEvents[Object.keys(springEvents)[Math.floor(Math.random() * Object.keys(springEvents).length)]]
            }
        }
    }
    else {
        eventList = generalEvents

        // Need to make table for nonseasonal events
        if (isStopped) {
            eventOutcome = generalEvents[Object.keys(generalEvents)[Math.floor(Math.random() * (Object.keys(generalEvents).length - 1))]]
        }
        else {
            eventOutcome = generalEvents[Object.keys(generalEvents)[Math.floor(Math.random() * Object.keys(generalEvents).length)]]
        }
    }

    // Get the text for the event by getting the key from the outcome (value)
    eventText = Object.keys(eventList).find(key => eventList[key] === eventOutcome)

    // Disable other buttons
    document.getElementById("barebones").disabled = true
    document.getElementById("meager").disabled = true
    document.getElementById("filling").disabled = true
    document.getElementById("leisurely").disabled = true
    document.getElementById("normal").disabled = true
    document.getElementById("grueling").disabled = true
    document.getElementById("onward").disabled = true

    // Prototype window
    const canvas = document.getElementById("gamecanvas")
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(430,0,canvas.width-450,75)

    ctx.fillStyle = "white"
    ctx.font = "35px Manufacturing Consent"
    ctx.fillText(eventText,445,47)

    if (eventText.endsWith("Accept?")) {
        // Add yes button
        const yesButton = document.createElement("button")
        yesButton.id = "yesbutton"
        yesButton.textContent = "Yes"
        yesButton.classList.add("yes-button")
        yesButton.addEventListener("click",function() {
            applyEvent(eventOutcome)
        })
        document.getElementById("addbuttonhere").appendChild(yesButton)

        // Add no button
        const noButton = document.createElement("button")
        noButton.id = "nobutton"
        noButton.textContent = "No"
        noButton.classList.add("no-button")
        noButton.addEventListener("click",function() {
            applyEvent("none")
        })
        document.getElementById("addbuttonhere").appendChild(noButton)
    }
    else {
        // Add proceed button
        const proceedButton = document.createElement("button")
        proceedButton.id = "proceedbutton"
        proceedButton.textContent = "Proceed"
        proceedButton.classList.add("proceed-button")
        proceedButton.addEventListener("click",function() {
            applyEvent(eventOutcome)
        })
        document.getElementById("addbuttonhere").appendChild(proceedButton)
    }
}

function applyEvent(effect) {
    // Apply event using if/else, switch case could also work but would be longer
    if (JSON.stringify(Object.keys(effect)).includes("food")) {
        playerItems["food"] = (playerItems["food"] + effect["food"] > 0) ? playerItems["food"] + effect["food"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("arrows")) {
        playerItems["arrows"] = (playerItems["arrows"] + effect["arrows"] > 0) ? playerItems["arrows"] + effect["arrows"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("money")) {
        playerItems["money"] = (playerItems["money"] + effect["money"] > 0) ? playerItems["money"] + effect["money"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("herbs")) {
        playerItems["herbs"] = (playerItems["herbs"] + effect["herbs"] > 0) ? playerItems["herbs"] + effect["herbs"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("wheel")) {
        playerItems["wheel"] = (playerItems["wheel"] + effect["wheel"] > 0) ? playerItems["wheel"] + effect["wheel"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("axle")) {
        playerItems["axle"] = (playerItems["axle"] + effect["axle"] > 0) ? playerItems["axle"] + effect["axle"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("tongue")) {
        playerItems["tongue"] = (playerItems["tongue"] + effect["tongue"] > 0) ? playerItems["tongue"] + effect["tongue"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("clothes")) {
        playerItems["clothes"] = (playerItems["clothes"] + effect["clothes"] > 0) ? playerItems["clothes"] + effect["clothes"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("oxen")) {
        playerItems["oxen"] = (playerItems["oxen"] + effect["oxen"] > 0) ? playerItems["oxen"] + effect["oxen"] : 0
    }
    if (JSON.stringify(Object.keys(effect)).includes("delay")) {
        advanceMultipleDays(date,effect["delay"])
    }
    if (JSON.stringify(Object.keys(effect)).includes("hurt")) {
        for (let i = 0; i < effect["hurt"]; i++) {
            const chosenPerson = Object.keys(playerParty)[Math.floor(Math.random() * Object.keys(playerParty).length)]
            playerHealth[chosenPerson] -= 1
        }
    }

    // Clear out buttons and text
    const canvas = document.getElementById("gamecanvas")
    const ctx = canvas.getContext("2d")

    ctx.clearRect(430,0,canvas.width-450,75)
    ctx.fillStyle = "black"
    ctx.fillRect(430,0,canvas.width-450,75)

    if (document.getElementById("yesbutton")) {
        document.getElementById("yesbutton").remove()
    }

    if (document.getElementById("nobutton")) {
        document.getElementById("nobutton").remove()
    }

    if (document.getElementById("proceedbutton")) {
        document.getElementById("proceedbutton").remove()
    }

    // Reenable other buttons
    document.getElementById("barebones").disabled = false
    document.getElementById("meager").disabled = false
    document.getElementById("filling").disabled = false
    document.getElementById("leisurely").disabled = false
    document.getElementById("normal").disabled = false
    document.getElementById("grueling").disabled = false
    document.getElementById("onward").disabled = false

    populateTables()
    alreadyHasEvent = false
}

function consumeFood(currentRations,currentItems,currentHealth,currentParty) {
    let foodEaten = 0
    let foodPerPerson = 4

    if (currentRations == "Filling") {
        foodPerPerson = 4
    }
    else if (currentRations == "Meager") {
        foodPerPerson = 2
    }
    else {
        foodPerPerson = 1
    }

    for (const member in currentParty) {
        if (member != "") {
            foodEaten += foodPerPerson
        }
    }

    if (currentItems["food"] < foodEaten) {
        currentItems["food"] = 0

        let hurt = Math.floor(Math.random() * 5) + 1 // 1 in 5 chance of hurting a family member
        if (hurt == 1) {
            let hurtMember = Object.keys(currentParty)[Math.floor(Math.random() * Object.keys(currentParty).length)]
            currentHealth[hurtMember] -= 1 // Hurt the member

            if (currentHealth[hurtMember] == -3) {
                // Disable other buttons
                document.getElementById("barebones").disabled = true
                document.getElementById("meager").disabled = true
                document.getElementById("filling").disabled = true
                document.getElementById("leisurely").disabled = true
                document.getElementById("normal").disabled = true
                document.getElementById("grueling").disabled = true
                document.getElementById("onward").disabled = true

                const canvas = document.getElementById("gamecanvas")
                const ctx = canvas.getContext("2d")

                ctx.fillStyle = "black"
                ctx.fillRect(430,0,canvas.width-450,75)

                ctx.fillStyle = "white"
                ctx.font = "35px Manufacturing Consent"

                if (hurtMember == "player") {
                    ctx.fillText("You have died of starvation!",445,47)

                    // Add proceed button
                    const proceedButton = document.createElement("button")
                    proceedButton.id = "proceedbutton"
                    proceedButton.textContent = "Proceed"
                    proceedButton.classList.add("proceed-button")
                    proceedButton.addEventListener("click",function() {
                        window.location.href = "game_over.html"
                    })
                    document.getElementById("addbuttonhere").appendChild(proceedButton)
                }
                else {
                    ctx.fillText(currentParty[hurtMember] + " has died of starvation!",445,47)

                    // Add proceed button
                    const proceedButton = document.createElement("button")
                    proceedButton.id = "proceedbutton"
                    proceedButton.textContent = "Proceed"
                    proceedButton.classList.add("proceed-button")
                    proceedButton.addEventListener("click",function() {
                        document.getElementById("barebones").disabled = false
                        document.getElementById("meager").disabled = false
                        document.getElementById("filling").disabled = false
                        document.getElementById("leisurely").disabled = false
                        document.getElementById("normal").disabled = false
                        document.getElementById("grueling").disabled = false
                        document.getElementById("onward").disabled = false

                        ctx.clearRect(430,0,canvas.width-450,75)
                        ctx.fillStyle = "black"
                        ctx.fillRect(430,0,canvas.width-450,75)

                        document.getElementById("proceedbutton").remove()
                    })
                }
            }
        }
    }
    else {
        currentItems["food"] -= foodEaten
    }
}
// #endregion

