import BlocksF from "../public/systemDefinitions.json"


export const convertCode = (text, system, onceCode) => {
    const correctSystem = BlocksF.filter((element) => {
        return element.robot == system
    })[0];
    const genralSystem = BlocksF.filter((element) => {
        return element.robot == undefined;
    })[0];
    let start = correctSystem.functions.start, end = correctSystem.functions.end;
    const actions = [...Object.keys(correctSystem.actions)];
    const sensors = [...Object.keys(correctSystem.sensors)];
    const allFunctions = [...Object.keys(correctSystem.functions), ...Object.keys(genralSystem.functions)];
    const awaitFunctions = allFunctions.filter((element) => {
        if (correctSystem.functions[element]) {
            return correctSystem.functions[element].await;
        } else {
            return genralSystem.functions[element].await;
        }
    })
    const usedFunctions = [];
    //divide the code Input 
    const [doubledUpText, quotes] = doubleUp(text);
    let splittedCode = doubledUpText.split('\n');
    let quotesDone = 0;
    for (let i = 0; i < splittedCode.length; i++){
        let LHS = '', RHS = '';
        let element = splittedCode[i].trim();
        if (element.length < 2 || element.substring(0, 2) != "//") {
            const dividedbyBracket = element.split("(")
            const beforeBracket = dividedbyBracket[0];
            const [elementSplitted, sides] = splitSingleEqual(beforeBracket);
            let unity = false;
            if (sides == 0) {
                continue;
            } else if (sides == 1) {
                RHS = elementSplitted;
            } else if (sides == 2) {
                LHS = elementSplitted[0];
                RHS = elementSplitted[1];
            }
            let isFunction = false;
            if (dividedbyBracket.length > 1) {
                isFunction = true;
            }
            if (isFunction) {
                if (allFunctions.includes(RHS) && !usedFunctions.includes(RHS)) {
                    usedFunctions.push(RHS);
                }
                if (awaitFunctions.includes(RHS)) {
                    RHS = 'await ' + RHS;
                } else if (actions.includes(RHS)) {
                    RHS=RHS.charAt(0).toUpperCase() + RHS.slice(1);
                    RHS = `unityContext.send("${system}","${RHS}");`
                    for (let i = 0; i < dividedbyBracket.length; i++) {
                        dividedbyBracket[i] = '';
                    }
                    unity = true;
                } else if (RHS == 'console.log') {
                    RHS = 'ctx.addLog';
                }
            } else {
                const correctSensor = sensors.filter((element) => {
                    return correctSystem.sensors[element].simpleName == RHS;
                });
                if (correctSensor.length>0) {
                    const name = correctSystem.sensors[correctSensor[0]].name;
                    RHS = `JSON.parse(sensorDataRef.current).${name}`;
                }
            }
            

            let afterbraket = dividedbyBracket.splice(1).join('(');
            if (afterbraket) {
                afterbraket = '(' + afterbraket;
            }
            if (LHS) {
                LHS += '=';
            }
            element = LHS + RHS + afterbraket;
            let startPoints, endPoints;
            if (unity) {
                [startPoints, endPoints] = findQuotePoints(LHS);
            }
            else {
                [startPoints, endPoints] = findQuotePoints(element);
            }
            for (let j = 0; j < startPoints.length; j++) {
                if (quotes.length > quotesDone) {
                    element = element.substring(0, startPoints[j]) + quotes[quotesDone] + element.substring(endPoints[j] + 1);
                    quotesDone++;
                } else {
                    console.log("lol");
                }
            }
        }
        splittedCode[i] = element;
    }
    let intermediateCode = "\n"
    intermediateCode += "if (codeChanged) { resolve(true); } \n";
    let middleCode = splittedCode.reduce((accumulator, element, i) => {
        accumulator += element;
        if (i != splittedCode.length - 1&&element.length>0) {
            if (element[element.length - 1] != "}") {
                accumulator += intermediateCode;
            } else {
                accumulator += "\n";
            }
        }
        return accumulator;
    },"")
    text = start.logic + middleCode + end.logic;
    text += "\n\n";

    usedFunctions.forEach((element) => {
        let functionDef = '';
        let functionNeeded = correctSystem.functions[element];
        if (!functionNeeded) {
            functionNeeded = genralSystem.functions[element];
        }
        let inputVariables  = "";
        if (!functionNeeded) { return [false, "error", "Function does not exist"]; }
        if (functionNeeded.inputs) {
          for (let i = 0; i < functionNeeded.inputs.length; i++) {
            const element = functionNeeded.inputs[i];
            if (i === functionNeeded.inputs.length - 1) {
              inputVariables += element.variable;
            } else {
              inputVariables += element.variable + ", ";
            }
          }
        }
        
        // Build function
        functionDef = `let ${element} = (${inputVariables}) => {\n`;
        if (awaitFunctions.includes(element)) {
            functionDef += `return new Promise((resolve, reject) => {\n`;
        }
        functionDef += `${functionNeeded.logic}\n`;
        if (awaitFunctions.includes(element)) {
            functionDef += `});\n`;
        }  
        functionDef += `}\n`
        text = functionDef + text;
    })
    return text;
};



const splitSingleEqual = (input) => {
    const splittingIndex = [];
    for (let i = 1; i < input.length-1; i++){
        if (input[i] == "="&& input[i-1] != "="&& input[i+1] != "=") {
            splittingIndex.push(i)
        }
    }
    if (splittingIndex.length == 0) {
        return [input,1]
    } else if (splittingIndex.length == 1) {
        const LHS = input.substring(0, splittingIndex[0]);
        const RHS=input.substring(splittingIndex[0]+1);

        return [[LHS, RHS], 2];
    }else{
        console.log("something went Wrong");
        return [input, 0];
    }
}

const findLine = (orignal,modifiedText, modifiedLine) => {
    let editedLine = modifiedText[modifiedLine];

}



const findQuotePoints = (text) => {
    let quoteStart = [];
    let quoteEnd = [];
    let inQuote = false;
    let quoteSign = "";
    for (let i = 0; i < text.length; i++){
        if (text[i] == `"` || text[i] == "'" || text[i] == "`") {
            if (inQuote) {
                if (quoteSign == text[i] && text[i - 1] != "\\") {
                    quoteEnd.push(i);
                    inQuote = false;
                }
            } else {
                quoteSign = text[i];
                inQuote = true;
                quoteStart.push(i);
            }
        }
    }
    if (quoteStart.length == quoteEnd.length) {
        return [quoteStart, quoteEnd];
    } else {
        console.log("something is wrong");
        return [[],[]];
    }  
}

const doubleUp = (text) => {
    let quoteStart;
    let quotes = [];
    let comment = checkCommentNextLine(text, 0);
    let inQuote = false;
    let withinBracket = false;
    let newText = "";
    let quoteSign = "";
    for (let i = 0; i < text.length; i++){
        if (inQuote) {
            if (text[i] == "\n"&& quoteSign=="`") {
                const newLine = "\\n";
                newText = newText.concat(newLine);
            } else {
                newText = newText.concat(text[i])
            }
        } else {
            newText=newText.concat(text[i])
            if (withinBracket) {
                if (text[i] == ')') {
                    withinBracket = false;
                }
            } else {
                switch (text[i]) {
                    case "(":
                        if (!comment) {
                            withinBracket = true;
                        }
                        break;
                    case ";":
                    case "{":
                    case "}":
                        if (!comment) {
                            if (text[i + 1] != '\n') {
                                newText = newText.concat("\n")
                            }
                            comment = checkCommentNextLine(text, i);
                        }
                        break;
                    case "\n":
                        comment = checkCommentNextLine(text, i);
                        break;
                    default:
                        break;
                }
            }
        }
        if (text[i] == `"` || text[i] == "'" || text[i] == "`") {
            if (inQuote) {
                if (quoteSign == text[i] && text[i - 1] != "\\") {
                    quotes.push(text.substring(quoteStart, i + 1));
                    inQuote = false;
                }
            } else if(!comment) {
                quoteSign = text[i];
                quoteStart = i;
                inQuote = true;
            }
        }
    }
    return [newText,quotes];
}

const checkCommentNextLine = (text,i) => {
    const intialI = i;
    while (text[intialI]&&text[intialI] == " ") {
        intialI++;
    }
    return (text.length>intialI+1&&(text[intialI] == '/' && text[intialI + 1] == '/'))
}