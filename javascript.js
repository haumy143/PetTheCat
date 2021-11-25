//TODO: Check if user has enough currency to buy shop items
//TODO: EventHandlers for achievements

//Declarations
let currency = 0;
let lifetime_currency = 0;
let total_clicks = 0;
let currency_per_click = 1;
let auto_income_rate = 0;
let game_interval_timer = 1000; //Add auto income every 1000ms = 1s
let html_update_timer = 80;     //Update HTML-Elements every 40ms = 25 times/per second

var pointerX = -1;
var pointerY = -1;

//Writing elements into variables
let currencyElement = document.getElementById("current_balance");
let manualIncomeElement = document.getElementById("income_click");
let autoIncomeElement = document.getElementById("income_auto");

//Data Structure for buyItem(), adjust values of buyable items only here
const itemMap = {
    "shampoo" : {
        "name" : "Shampoo",
        "type" : "manual",
        "price" : 10,
        "valueToIncrease" : "currency_per_click",
        "increase" : 5,
        "img_path" : "content/icons/shampoo.jpg"
    },
    "brush" : {
        "name" : "Brush",
        "type" : "manual",
        "price" : 600,
        "valueToIncrease" : "currency_per_click",
        "increase" : 20,
        "img_path" : "content/icons/brush.jpg"
    },
    "treat" : {
        "name" : "Treat",
        "type" : "Manual",
        "price" : 2000,
        "valueToIncrease" : "currency_per_click",
        "increase" : 50,
        "img_path" : "content/icons/treat1.png"
    },
    "tree" : {
        "name" : "Tree",
        "type" : "auto",
        "price" : 200,
        "valueToIncrease" : "auto_income_rate",
        "increase" : 2,
        "img_path" : "content/icons/tree.jpg"
    }, 
    "toy" : {
        "name" : "Katzenangel",
        "type" : "auto",
        "price" : 1000,
        "valueToIncrease" : "auto_income_rate",
        "increase" : 5,
        "img_path" : "content/icons/toy1.jpg"
    },
    "buddy" : {
        "name" : "CatBuddy",
        "type" : "auto",
        "price" : 3000,
        "valueToIncrease" : "auto_income_rate",
        "increase" : 15,
        "img_path" : "content/icons/cat_friend.jpg"
    }
} 

//Data Structure for achievementCheck() adjust achievement values only here
const achievementMap = {
    "achievement1" : {
        "name" : "Achievement 1",
        "valueToCheck" : "currency",
        "valueToReach" : 20,
        "check" : true
    },
    "achievement2" : {
        "name" : "Achievement 2",
        "valueToCheck" : "currency",
        "valueToReach" : 50,
        "check" : true
    },
    "achievement3" : {
        "name" : "TBD",
        "valueToCheck" : "total_clicks",
        "valueToReach" : 100,
        "check" : true
    }
}

//Experimental code
/* function createEventVariable(initial_value) {
    var value = initial_value;
    return {
        getValue: function() {
            return value;
        },
        setValue: function(newValue) {
            value = newValue;
            variableChanged(this);
        },
    };
}

function variableChanged(eventVariable) {
    writeUpdates();
} */

//Executes on window load
window.onload = function() {
        addEventHandlers();
        setInterval(autoAdder, game_interval_timer);
        setInterval(gameUpdate, html_update_timer);

        document.onmousemove = function(event) {
            pointerX = event.pageX;
            pointerY = event.pageY;
        }
    };

function pointerCheck() {
    //stub
	//console.log('Cursor at: '+pointerX+', '+pointerY);
}

function gameUpdate() {
    writeUpdates();
    achievementCheck();
    pointerCheck();
}

function achievementCheck() {
    for (const key in achievementMap) {
        if (achievementMap[key]["check"] == true) {
            eval(achievementMap[key]["valueToCheck"])
            if (eval(achievementMap[key]["valueToCheck"] + ' >= achievementMap[key]["valueToReach"]')) {
                document.getElementById(key).innerHTML = achievementMap[key]["name"] + " achieved!";
                achievementMap[key]["valueToCheck"] = false;
                return;
            }
        }
    }
}

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

//Writes current variable values into HTMl Elements
//TODO: Update so that this runs as eventListener instead of as a loop
//Possibly use JavaScript Object with getter and setter with variables as attributes to make this work
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

    /*  console.log(document.getElementById(boughtItem).firstChild);
    console.log(document.getElementById(boughtItem).firstChild.item(0)); */

    document.getElementById(boughtItem).getElementsByTagName("input")[0].src = itemMap[boughtItem]["img_path"];
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