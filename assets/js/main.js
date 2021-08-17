//****************************************************************************
// some constants and variables needed
const taxRate1 = 19;
const taxRate2 = 7;

let currency = '€';
let money = 0;

// access to the user interface elements
let mwst1Value = document.getElementById("taxRateValue1");
let mwst2Value = document.getElementById("taxRateValue2");
let currencySign = document.getElementById("currencySign");
let moneyValue = document.getElementById("moneyValue");
let taxValue = document.getElementById("taxValue");
let finalValue = document.getElementById("finalValue");


// initialize the user interface
initialize();


//****************************************************************************
// primary setup for user interface
function initialize() {

    mwst1Value.innerHTML = `${taxRate1}%`;
    mwst2Value.innerHTML = `${taxRate2}%`;
    currencySign.innerHTML = `${currency}`;

    taxValue.innerHTML = formatNumber(0);
    finalValue.innerHTML = formatNumber(0);

    // initialize some text which depends on the calculation type because the
    // text will change each time the calculation type is  changing, it's 
    // easier to call the function for the calculation type changing event
    calculationTypeChanged();
}


//****************************************************************************
// claculate taxes and final value
function calculate() {

    let taxes = 0;
    let final = 0;
    let taxRate = getTaxRate();

    let money = Number(moneyValue.value);

    if (isNetToBrutto()) {
        // calculate the tax value
        taxes = Math.round(money * taxRate) / 100;
        // calculate the brutto value
        final = money * 1 + taxes;
    } else {
        // calculate the tax value
        taxes = Math.round((money - money * 100 / (100 + taxRate)) * 100) / 100;
        // calculate the net value
        final = money - taxes;
    }

    taxValue.innerHTML = formatNumber(taxes);
    finalValue.innerHTML = formatNumber(final);
}


//****************************************************************************
// calculation type has changed, so update the user interface
function calculationTypeChanged() {

    document.getElementById("calculationType").innerHTML =
        isNetToBrutto()
            ? `Nettobetrag (Preis ohne Mehrwertsteuer) in ${currency}`
            : `Nettobetrag (Preis inclusive Mehrwertsteuer) in ${currency}`;

    document.getElementById("finalText").innerHTML =
        isNetToBrutto() ? "Bruttobetrag (Endpreis)" : "Nettobetrag";
}


//****************************************************************************
// Money value has changed so format it as a currency value
function moneyValueChanged() {

    let money = Number(moneyValue.value);
    moneyValue.value = formatNumber(money, false);
}


//****************************************************************************
// helper functions

//----------------------------------------------------------------------------
// format a number 
function formatNumber(value, showCurrencySymbol = true) {

    let formattedNumber = (Math.floor(value * 100) / 100).toFixed(2);

    if (showCurrencySymbol) {
        formattedNumber += ` ${currency}`;
    }
    return formattedNumber;
}

//----------------------------------------------------------------------------
// get the calculation type (Net to brutto or vice versa)
function isNetToBrutto() {

    return document.getElementById("netToBrutto").checked;
}

//----------------------------------------------------------------------------
// get the selected tax rate 
function getTaxRate() {

    return document.getElementById("taxRate1").checked ? taxRate1 : taxRate2;
}