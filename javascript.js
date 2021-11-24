
//Declarations
let currency = 0;
let total_clicks = 0;
let currency_per_click = 1;
let auto_income_rate = 0;
let game_interval_timer = 1000;
let html_update_timer = 40;

//Writing elements into variables
let currencyElement = document.getElementById("current_balance");
let manualIncomeElement = document.getElementById("income_click");
let autoIncomeElement = document.getElementById("income_auto");

//Data Structure for buyItem(), adjust values of buyable items only here
const itemMap = {
    "manual" : {
        "manual_option1" : 10,
        "manual_option2" : 20,
    },

    "auto" : {
        "auto_option1" : 2,
        "auto_option2" : 4,
    }
}

//EventHandler for main clicker
document.getElementById("main_clicker").addEventListener("click", onMainClickerClick);

//EventHandlers for shop elements
document.getElementById("manual_option1").addEventListener("click", buyItem);
document.getElementById("manual_option2").addEventListener("click", buyItem);
document.getElementById("auto_option1").addEventListener("click", buyItem);
document.getElementById("auto_option2").addEventListener("click", buyItem);

//Executes on window load
window.onload = function() {
        setInterval(autoAdder, game_interval_timer);
        setInterval(writeUpdates, html_update_timer);
    };

function initGame() {
    //stub
}

function onMainClickerClick () {
    currency += currency_per_click;
}

//Debugging function
function d_print_currency() {
    console.log(currency);
}

function autoAdder() {
    currency += auto_income_rate;
}

function writeUpdates() {
    currencyElement.innerHTML = currency;
    manualIncomeElement.innerHTML = currency_per_click;
    autoIncomeElement.innerHTML = auto_income_rate;
}

function buyItem(evt) {
    var boughtItem = evt.currentTarget.id;
    
    if (boughtItem.startsWith("manual"))
        currency_per_click += itemMap["manual"][boughtItem];
    else
        auto_income_rate += itemMap["auto"][boughtItem];

    alert("Currency per Click: " + currency_per_click);
    alert("Auto Income Rate: " + auto_income_rate);
}