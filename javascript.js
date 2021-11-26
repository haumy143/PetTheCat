//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------DECLARATIONS----------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let currency = 0;
let lifetime_currency = 0;
let total_clicks = 0;
let currency_per_click = 1;
let auto_income_rate = 0;
let game_interval_timer = 1000; //Add auto income every 1000ms = 1s

var pointerX = -1;
var pointerY = -1;

let currencyElement = document.getElementById("current_balance");
let manualIncomeElement = document.getElementById("income_click");
let autoIncomeElement = document.getElementById("income_auto");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------DATA STRUCTURES---------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Data Structure for buyItem(), adjust values of buyable items only here
const itemMap = {
    "shampoo" : {
        "displayName" : "Shampoo",
        "type" : "manual",
        "price" : 100,
        "valueToIncrease" : "currency_per_click",
        "increase" : 2,
        "img_path" : "content/icons/shampoo_bw.jpg",
        "img_path_active" : "content/icons/shampoo.jpg"
    },
    "brush" : {
        "displayName" : "Brush",
        "type" : "manual",
        "price" : 600,
        "valueToIncrease" : "currency_per_click",
        "increase" : 20,
        "img_path" : "content/icons/brush_bw.jpg",
        "img_path_active" : "content/icons/brush.jpg"
    },
    "treat" : {
        "displayName" : "Treats",
        "type" : "Manual",
        "price" : 2000,
        "valueToIncrease" : "currency_per_click",
        "increase" : 50,
        "img_path" : "content/icons/treat1_bw.png",
        "img_path_active" : "content/icons/treat1.png"
    },
    "tree" : {
        "displayName" : "Scratcher",
        "type" : "auto",
        "price" : 200,
        "valueToIncrease" : "auto_income_rate",
        "increase" : 2,
        "img_path" : "content/icons/tree_bw.jpg",
        "img_path_active" : "content/icons/tree.jpg"
    }, 
    "toy" : {
        "displayName" : "Toy",
        "type" : "auto",
        "price" : 1000,
        "valueToIncrease" : "auto_income_rate",
        "increase" : 5,
        "img_path" : "content/icons/toy1_bw.jpg",
        "img_path_active" : "content/icons/toy1.jpg"
    },
    "buddy" : {
        "displayName" : "Cat Buddy",
        "type" : "auto",
        "price" : 3000,
        "valueToIncrease" : "auto_income_rate",
        "increase" : 15,
        "img_path" : "content/icons/cat_friend_bw.jpg",
        "img_path_active" : "content/icons/cat_friend.jpg"
    }
} 

//Data Structure for achievementCheck() adjust achievement values only here
const achievementMap = {
    "achievement1" : {
        "name" : "First Steps",
        "valueToCheck" : "total_clicks",
        "valueToReach" : 10,
        "check" : true
    },
    "achievement2" : {
        "name" : "Rookie Cat Sitter",
        "valueToCheck" : "currency",
        "valueToReach" : 50,
        "check" : true
    },
    "achievement3" : {
        "name" : "Rookie Clicker",
        "valueToCheck" : "total_clicks",
        "valueToReach" : 100,
        "check" : true
    },
    "achievement4" : {
        "name" : "Getting There",
        "valueToCheck" : "currency",
        "valueToReach" : 250,
        "check" : true
    },
    "achievement5" : {
        "name" : "Leaning Back",
        "valueToCheck" : "auto_income_rate",
        "valueToReach" : 5,
        "check" : true
    },
    "achievement6" : {
        "name" : "Professional Clicker",
        "valueToCheck" : "total_clicks",
        "valueToReach" : 500,
        "check" : true
    },
    "achievement7" : {
        "name" : "Nouveau Riche",
        "valueToCheck" : "currency",
        "valueToReach" : 1000,
        "check" : true
    },
    "achievement8" : {
        "name" : "Big Bucks",
        "valueToCheck" : "lifetime_currency",
        "valueToReach" : 1000,
        "check" : true
    },
    "achievement9" : {
        "name" : "Master Clicker",
        "valueToCheck" : "total_clicks",
        "valueToReach" : 1000,
        "check" : true
    },
    "achievement10" : {
        "name" : "Professional Cat Sitter",
        "valueToCheck" : "currency",
        "valueToReach" : 2000,
        "check" : true
    },
    "achievement11" : {
        "name" : "Professional Cat Sitter",
        "valueToCheck" : "auto_income_rate",
        "valueToReach" : 20,
        "check" : true
    },
    "achievement12" : {
        "name" : "Auto Cat Sitter",
        "valueToCheck" : "auto_income_rate",
        "valueToReach" : 20,
        "check" : true
    },
    "achievement13" : {
        "name" : "Master Cat Sitter",
        "valueToCheck" : "currency",
        "valueToReach" : 5000,
        "check" : true
    },
    "achievement14" : {
        "name" : "Sage Clicker",
        "valueToCheck" : "total_clicks",
        "valueToReach" : 5000,
        "check" : true
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//------------------------INITIALIZING FUNCTIONS-----------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

window.onload = function() {
        addEventHandlers();
        setInterval(autoAdder, game_interval_timer);
        writeUpdates();
        writeShopContent();
    };

document.onmousemove = function(event) {
    pointerX = event.pageX;
    pointerY = event.pageY;
}

function writeShopContent() {
    writeShopPrices();
    writeShopImages();
    writeShopTooltips();
}

function writeShopPrices() {
    for (const key in itemMap) {
        document.getElementById(key).getElementsByTagName("p1")[0].innerHTML = itemMap[key]["price"] + "$";
    }
}

function writeShopImages() {
    for (const key in itemMap) {
        document.getElementById(key).getElementsByTagName("input")[0].src = itemMap[key]["img_path"];
    }
}

function writeShopTooltips() {
    for (const key in itemMap) {
        if (itemMap[key]["valueToIncrease"] == "currency_per_click") var per = "click";
        else var per = "second";
        document.getElementById(key).getElementsByTagName("span")[0].innerHTML = "+ " + itemMap[key]["increase"] + "$ per " + per;
    }
}

//Add EventHandlers for shop elements automatically
function addEventHandlers() {
    document.getElementById("main_clicker").addEventListener("click", onMainClickerClick);

    for (const key in itemMap) {
        document.getElementById(key).getElementsByTagName("input")[0].addEventListener("click", buyItem);
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//--------------------------UPDATE FUNCTIONS---------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function gameUpdate() {
    writeUpdates();
    achievementCheck();
}

function clickerFeedback () {
    content = "+ " + currency_per_click + "$";

    var newDiv = document.createElement("div");
    placeDiv(newDiv);

    var newContent = document.createTextNode(content);
    newDiv.id = "clicker_feedback";
    newDiv.appendChild(newContent);

    var currentElement = document.getElementById("button_container");
    document.body.insertBefore(newDiv, currentElement);

    setTimeout(() => { newDiv.remove(); }, 500);
}

function placeDiv(d) {
    d.style.position = "absolute";
    d.style.left = pointerX+'px';
    d.style.top = pointerY+'px';
}

function writeUpdates() {
    currencyElement.innerHTML = currency + '$';
    manualIncomeElement.innerHTML = currency_per_click + '$';
    autoIncomeElement.innerHTML = auto_income_rate + '$';
}

function achievementCheck() {
    for (const key in achievementMap) {
        if (achievementMap[key]["check"] == true) {
            if (eval(achievementMap[key]["valueToCheck"] + ' >= achievementMap[key]["valueToReach"]')) {
                document.getElementById(key).getElementsByTagName("p")[0].innerHTML = achievementMap[key]["name"];

                if (achievementMap[key]["valueToCheck"] == "currency_per_click") {
                    var per = "click";
                } else if (achievementMap[key]["valueToCheck"] == "total_clicks") {
                    var per = "manual clicks";
                } else if (achievementMap[key]["valueToCheck"] == "currency") {
                    var per = "$ in your wallet";
                } else if (achievementMap[key]["valueToCheck"] == "lifetime_currency") {
                    var per = "$ over your career";
                } else {
                    var per = "$/second";
                }

                var awarded = "Awarded for reaching " + achievementMap[key]["valueToReach"] + " " + per + "!";

                document.getElementById("status").innerHTML = "New achievement unlocked: " + achievementMap[key]["name"] + "! " + awarded;
                document.getElementById(key).getElementsByTagName("span")[0].innerHTML = awarded;

                achievementMap[key]["valueToCheck"] = false;
                return;
            }
        }
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//----------------------------SHOP FUNCTIONS---------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function buyItem(evt) {
    var boughtItem = evt.currentTarget.parentElement.id;

    if (!checkPrice(boughtItem)) return;
    
    eval(itemMap[boughtItem]["valueToIncrease"] + ' += itemMap[boughtItem]["increase"]');

    evt.currentTarget.removeEventListener("click", buyItem);
    evt.currentTarget.addEventListener("click", itemBoughtMessage);

    document.getElementById(boughtItem).getElementsByTagName("input")[0].src = itemMap[boughtItem]["img_path_active"];

    if (itemMap[boughtItem]["valueToIncrease"] == "currency_per_click") var per = "click";
    else var per = "second";

    document.getElementById("status").innerHTML = "Bought " + itemMap[boughtItem]["displayName"] + "! +" + itemMap[boughtItem]["increase"] + "$ per " + per + "!";
}

function itemBoughtMessage(evt) {
    document.getElementById("status").innerHTML = "You already bought this item!";
}

function checkPrice(item) {
    var price = itemMap[item]["price"];

    if (price > currency) {
        document.getElementById("status").innerHTML = "You can't buy this! You need " + price + "$!";
        return false;
    } else {
        currency -= price;
        return true;
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------MAIN ADDERS-----------------------------
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function onMainClickerClick () {
    currency += currency_per_click;
    lifetime_currency += currency_per_click;
    total_clicks += currency_per_click;
    gameUpdate();
    clickerFeedback();
}

function autoAdder() {
    currency += auto_income_rate;
    gameUpdate();
}
