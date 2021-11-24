//TODO: Check if user has enough currency to buy shop items
//TODO: EventHandlers for achievements

//Declarations
let currency = 0;
let lifetime_currency = 0;
let total_clicks = 0;
let currency_per_click = 1;
let auto_income_rate = 0;
let game_interval_timer = 1000; //Add auto income every 1000ms = 1s
let html_update_timer = 40;     //Update HTML-Elements every 40ms = 25 times/per second

//Writing elements into variables
let currencyElement = document.getElementById("current_balance");
let manualIncomeElement = document.getElementById("income_click");
let autoIncomeElement = document.getElementById("income_auto");

//Data Structure for buyItem(), adjust values of buyable items only here
const itemMap = {
    "manual_option1" : {
        "name" : "TBD",
        "type" : "manual",
        "price" : 1000,
        "valueToIncrease" : "currency_per_click",
        "increase" : 10
    },
    "manual_option2" : {
        "name" : "TBD",
        "type" : "manual",
        "price" : 10000,
        "valueToIncrease" : "currency_per_click",
        "increase" : 20
    },
    "auto_option1" : {
        "name" : "TBD",
        "type" : "manual",
        "price" : 15,
        "valueToIncrease" : "auto_income_rate",
        "increase" : 2
    }, 
    "auto_option2" : {
        "name" : "TBD",
        "type" : "manual",
        "price" : 800,
        "valueToIncrease" : "auto_income_rate",
        "increase" : 4
    }
} 

//Executes on window load
window.onload = function() {
        addEventHandlers();
        setInterval(autoAdder, game_interval_timer);
        setInterval(writeUpdates, html_update_timer);
    };

//Add EventHandlers for shop elements automatically
function addEventHandlers() {
    document.getElementById("main_clicker").addEventListener("click", onMainClickerClick);

    for (const key in itemMap) {
        document.getElementById(key).addEventListener("click", buyItem);
    }
}

function onMainClickerClick () {
    currency += currency_per_click;
    total_clicks += currency_per_click;
}

//Debugging function
function d_print_currency() {
    console.log(currency);
}

function autoAdder() {
    currency += auto_income_rate;
}

//Writes current variable values into 
function writeUpdates() {
    currencyElement.innerHTML = currency;
    manualIncomeElement.innerHTML = currency_per_click;
    autoIncomeElement.innerHTML = auto_income_rate;
}

function buyItem(evt) {
    var boughtItem = evt.currentTarget.id;

    if (!checkPrice(boughtItem)) return;
    
    eval(itemMap[boughtItem]["valueToIncrease"] + ' += itemMap[boughtItem]["increase"]');

    evt.currentTarget.removeEventListener("click", buyItem);
}

//TODO: Change alert to changing the html element
function checkPrice(item) {
    var price = itemMap[item]["price"];

    if (price > currency) {
        alert("Nicht genug Geld! Gebraucht: " + price);
        return false;
    } else {
        currency -= price;
        return true;
    }
}