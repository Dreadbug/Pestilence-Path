// This file contains that game behavior and html behavior
// Written with type checking to make maintaining/adding easier

// Alerts are placeholders for incomplete code
// Need to fix: money bug after multiple restarts (Fixed for now)
// Need to fix: once character dies, some things are still counting them
// Most pending features need art assets done first
/*
Pending:
- Hunting
- Art for events
- UI reshuffling
- Change weather and season into icons
- Pitstops (Good enough, needs art)
- Walking animation
- Different backgrounds
- Shakespeare mode
- Obstacles
- Revive family with herbs
*/

class Character {
    constructor(){}
}

class Party {
    private player: Character;
    private wife: Character;
    private son: Character;
    private daughter: Character;

    constructor(){
        this.player = new Character();
        this.wife = new Character();
        this.son = new Character();
        this.daughter = new Character();
    }
}

class WeatherController {
    private summerTemps: number[] = [23,20,30,23,19,17,12,18,21,22,20,26,25,32,29,27,24];
    private fallTemps: number[] = [15,12,21,15,13,12,9,7,6,10,11,14,16,23,16,20,21];
    private winterTemps: number[] = [-3,5,2,8,6,1,-7,-5,-9,-4,-2,-1,-6,7,0,9,10];
    private springTemps: number[] = [14,11,20,12,11,7,2,3,0,8,9,15,13,16,10,17,14];
    private currentCountry: number = 0;

    constructor(){}

    public advanceCurrentCountry(): void {
        this.currentCountry += 1;
    }

    public getTemperature(season: string): number {
        // Modify temperature by a random amount (-5 - 5 C)
        let tempModifier: number = Math.floor(Math.random() * 10) - 5;

        if (season === "summer") {
            if (this.summerTemps.length > this.currentCountry) {
                return this.summerTemps[this.currentCountry] + tempModifier;
            }
            else {
                return 23;
            }
        }
        else if (season === "fall") {
            if (this.fallTemps.length > this.currentCountry) {
                return this.fallTemps[this.currentCountry] + tempModifier;
            }
            return 15;
        }
        else if (season === "winter") {
            if (this.winterTemps.length > this.currentCountry) {
                return this.winterTemps[this.currentCountry] + tempModifier;
            }
            return 0;
        }
        else {
            if (this.springTemps.length > this.currentCountry) {
                return this.springTemps[this.currentCountry] + tempModifier;
            }
            return 17;
        }
    }

    public getPrecipitation(season: string, temp: number): string {
        const diceroll: number = Math.random();

        if (diceroll < 0.1) {
            if (temp <= 0) {
                return "Snow";
            }
            else {
                return "Storm";
            }
        }
        else if (diceroll < 0.2) {
            return "Storm";
        }
        else if (diceroll < 0.4) {
            return "Rain";
        }
        else {
            return "Clear";
        }
    }

    public getWind(precipitation: string) {
        let diceroll: number = Math.random();

        if (precipitation === "Stormy") {
            diceroll -= 0.8;
        }

        if (diceroll < 0.05) {
            return "Straightline";
        }
        else if (diceroll < 0.2) {
            return "Gusty";
        }
        else if (diceroll < 0.4) {
            return "Cooling";
        }
        else {
            return "Calm";
        }
    }
}

class DifficultyController {
    // How much will be eaten
    private foodConsumptionMultiplier: number = 1.0;
    // How far the player will go
    private paceMultiplier: number = 1.0;
    // How often random events will occurr
    private eventFrequencyMultiplier: number = 1.0;
    // How bad random events will be
    private eventDifficultyMultiplier: number = 1.0

    constructor(){}
}

class Game {
    // When the player is
    // Defaults to fall
    private day: number = 1;
    private month: number = 10;
    private year: number = 1347;
    // Where player is
    // Defaults represent start of journey
    private countries: string[] = ["Holy Roman Empire","France","Castile","Portugal","England","Scotland","Norway","Sweden","Novgorod","Lithuania","Poland","Hungary","Bulgaria","Byzantium","Serbia","Kingdom of Naples","Papal States"];
    private currentCountry: number = 0;
    private distance: number = 846;
    // What weather the player is encountering
    // Defaults represent calmest weather
    private weather: WeatherController = new WeatherController();
    private season: string = "fall";
    private temperature: number = 20;
    private precipitation: string = "Clear";
    private wind: string = "Calm";
    // How difficult the day will be
    private difficulty: DifficultyController = new DifficultyController();
    // The player party
    private party: Party = new Party();

    constructor(){}
}