// general functions - http://www.net-comber.com/charset.html

var slider = document.getElementById('length');
var sliderOutput = document.getElementById('rangeValue');
sliderOutput.innerHTML = slider.value;
slider.oninput = function(){
    sliderOutput.textContent = this.value;
}

// variables based on result, length, uppercase, lowercase, numbers, symbols, generate, and clipboard dom options.
var result = document.getElementById('result');
var uppercase = document.getElementById('uppercase');
var lowercase = document.getElementById('lowercase');
var numbers = document.getElementById('numbers');
var special = document.getElementById('special');
var generate = document.getElementById('submit');
var clipboard = document.getElementById('clipboard');

var randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97);
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()* 26) + 65);
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()* 10) + 48);
}
function getRandomSymbol(){
    var symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

generate.addEventListener('click', (event)=>{
    event.preventDefault();
    var length = parseInt(slider.value);
    var hasLower = lowercase.checked;
    var hasUpper = uppercase.checked;
    var hasNumbers = numbers.checked;
    var hasSymbols = special.checked;
    
    result.textContent = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    var generatedPassword = '';
    var typesCount = lower + upper + number + symbol;
    var typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0) {
        return '';
    }
    for (var i = 0; i < length; i += typesCount) {
        typesArray.forEach(type=>{
            var funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    var finalPassword = generatedPassword;
    return finalPassword;
}

clipboard.addEventListener('click', ()=>{
    var textarea = document.createElement('textarea');
    var password = result.textContent;

    if(!password) {
        return;
    }
    textarea.value = password;

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    
    alert('Password copied to clipboard');
});
