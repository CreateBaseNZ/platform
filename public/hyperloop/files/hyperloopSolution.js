// Subsystem 1: Binary to Hexadecimal
let hyperloop = "0";
let personNumber = PersonNumber();

// A simple hardcoded mapping of binary numbers to equivalent hexadecimal numbers
if (personNumber == "0") { hyperloop = "0"; }
else if (personNumber == "1") { hyperloop = "1"; }
else if (personNumber == "10") { hyperloop = "2"; }
else if (personNumber == "11") { hyperloop = "3"; }
else if (personNumber == "100") { hyperloop = "4"; }
else if (personNumber == "101") { hyperloop = "5"; }
else if (personNumber == "110") { hyperloop = "6"; }
else if (personNumber == "111") { hyperloop = "7"; }
else if (personNumber == "1000") { hyperloop = "8"; }
else if (personNumber == "1001") { hyperloop = "9"; }
else if (personNumber == "1010") { hyperloop = "A"; }
else if (personNumber == "1011") { hyperloop = "B"; }
else if (personNumber == "1100") { hyperloop = "C"; }
else if (personNumber == "1101") { hyperloop = "D"; }
else if (personNumber == "1110") { hyperloop = "E"; }
else if (personNumber == "1111") { hyperloop = "F"; }

MovePersonToHyperloop(hyperloop);



// Subsystem 2: Binary to Decimal
// A function that allows you to convert from bases 2-9 to decimal
let ConvertToBase10 = (numberString, fromBase) => {
    // Create the char array. Optional to uppercase for standardization of input
    // Reverse array to make algorithm easier to work with. Not required depending
    // on how for loop is done
    let charArray = numberString.toUpperCase().split("").reverse();

    let sum = 0;
    for (let i = 0; i < charArray.length; i++) {
        // Convert string into a number
        var parsedNumber = parseInt(charArray[i]);
        // Algorithm for converting to base 10
        sum += parsedNumber * Math.pow(fromBase, i);
    }

    // Convert the number back to a string
    return sum.toString();
}

let personNumber = PersonNumber();
MovePersonToHyperloop(ConvertToBase10(personNumber, 2));



// Subsystem 3: Decimal to binary
// A function that allows you to convert from any decimal to bases 2-10
let ConvertFromBase10 = (number, toBase) => {
    let charList = [];

    //Algorithm for converting to base 10. Ideally a while loop should be used but we cant currently do that
    for (let i = 0; i < 8; i++) {
        if (number > 0) {
            let wholeNumber = Math.floor(number / toBase);
            let remainder = number % toBase;

            charList.splice(0, 0, remainder.toString())
            number = wholeNumber
        }
    }
    return charList.join("");
}

let personNumber = PersonNumber();
MovePersonToHyperloop(ConvertFromBase10(personNumber, 2));



//Subsystem 4: Ternary to tridecimal
// A function that allows you to convert from any base to decimal
let ConvertToBase10 = (numberString, fromBase) => {
    let charArray = numberString.toUpperCase().split("").reverse();
    let sum = 0;
    for (let i = 0; i < charArray.length; i++) {
        // This line needs to use the helper function instead
        var parsedNumber = parseCharToInt(charArray[i]);
        sum += parsedNumber * Math.pow(fromBase, i);
    }

    return sum.toString();
}

// If not done already the ConvertToBase10 Function needs to be modified slightly to deal with
// numbers A-F using this helper function
let parseCharToInt = (number) => {
    if (number == '0') { return 0; }
    else if (number == '1') { return 1; }
    else if (number == '2') { return 2; }
    else if (number == '3') { return 3; }
    else if (number == '4') { return 4; }
    else if (number == '5') { return 5; }
    else if (number == '6') { return 6; }
    else if (number == '7') { return 7; }
    else if (number == '8') { return 8; }
    else if (number == '9') { return 9; }
    else if (number == 'A') { return 10; }
    else if (number == 'B') { return 11; }
    else if (number == 'C') { return 12; }
    else if (number == 'D') { return 13; }
    else if (number == 'E') { return 14; }
    else if (number == 'F') { return 15; }
    else { return 0; }
}

let ConvertFromBase10 = (number, toBase) => {
    let charList = [];

    for (let i = 0; i < 8; i++) {
        if (number > 0) {
            // This line needs to use the helper function instead
            charList.splice(0, 0, parseIntToChar(number % toBase))
            number = Math.floor(number / toBase);
        }
    }
    return charList.join("");
}

// If not done already the ConvertFromBase10 Function needs to be modified slightly to deal with
// numbers A-F using this helper function
let parseIntToChar = (number) => {
    if (number == 0) { return '0'; }
    else if (number == 1) { return '1'; }
    else if (number == 2) { return '2'; }
    else if (number == 3) { return '3'; }
    else if (number == 4) { return '4'; }
    else if (number == 5) { return '5'; }
    else if (number == 6) { return '6'; }
    else if (number == 7) { return '7'; }
    else if (number == 8) { return '8'; }
    else if (number == 9) { return '9'; }
    else if (number == 10) { return 'A'; }
    else if (number == 11) { return 'B'; }
    else if (number == 12) { return 'C'; }
    else if (number == 13) { return 'D'; }
    else if (number == 14) { return 'E'; }
    else if (number == 15) { return 'F'; }
    else { return '0' };
}

// This is an optional additional helper function but allows any input string
// to be converted between any given base from 2-16 to any other base from 2-16
let ConvertBases = (inputNumber, fromBase, toBase) => {
    let outBase10 = ConvertToBase10(inputNumber, fromBase);
    let output = ConvertFromBase10(parseInt(outBase10), toBase);

    return output;
}

let personNumber = PersonNumber();
MovePersonToHyperloop(ConvertBases(personNumber, 3, 13));



// Improve.
// For the improve step if everything is done correctly
// only the last line of subsytem 4 needs to be modified to
// Each time a person enters the hyper loop the people bases and hyperloop base
// will be randomised
let personNumber = PersonNumber();
let personBase = PersonBase();
let hyperloopBase = HyperloopBase();
MovePersonToHyperloop(ConvertBases(personNumber, personBase, hyperloopBase));