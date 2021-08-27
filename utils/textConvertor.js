import blockFunctions from "../public/blocks.json";

const unityDirectFunctions = ['Jump', 'Crouch'];
export const convertCode = (text, system,onceCode) => {
    let start = [], end = [];
    let blocks = [], awaitFunctions = [],allFunctions=[];
    for (let i = 0; i < blockFunctions.length; i++) {
        const element = blockFunctions[i];
        if ((element.robot == undefined || element.robot === system)) {
            if (element.functionName) {
                blocks.push(element);
                allFunctions.push(element.functionName);
                if (element.await == true) {
                    awaitFunctions.push(element.functionName);
                }
            }
            if (element.type == "start") {
                start = element;
            } else if (element.type == "end") {
                end = element;
            }
       }
    }
    const usedFunctions = [];
    text =  text;
  //divide the code Input 
    const [doubledUpText, quotes] = doubleUp(text);
    let splittedCode = doubledUpText.split('\n');
    let quotesDone = 0;
    for (let i = 0; i < splittedCode.length; i++){
        let unity = false;
        let LHS = '', RHS = '';
        let element = splittedCode[i].trim();
        if (element.length < 2 || element.substring(0, 2) != "//") {
            const dividedbyBracket = element.split("(")
            const beforeBracket = dividedbyBracket[0];
            const [elementSplitted, sides] = splitSingleEqual(beforeBracket);
            
            if (sides == 0) {
                continue;
            } else if (sides == 1) {
                RHS = elementSplitted;
            } else if (sides == 2) {
                LHS = elementSplitted[0];
                RHS = elementSplitted[1];
            }
            if (allFunctions.includes(RHS) && !usedFunctions.includes(RHS)) {
                usedFunctions.push(RHS);
            }
            if (awaitFunctions.includes(RHS)) {
                RHS = 'await ' + RHS;
            } else if (unityDirectFunctions.includes(RHS)) {
                RHS = `unityContext.send("${system}","${RHS}");`
                for (let i = 0; i < dividedbyBracket.length; i++) {
                    dividedbyBracket[i] = '';
                }
                unity = true;
            } else if (RHS == 'console.log') {
                RHS = 'ctx.addLog';
            }

            let afterbraket = dividedbyBracket.splice(1).join('(');
            if (afterbraket) {
                afterbraket = '(' + afterbraket;
            }
            if (LHS) {
                LHS += '=';
            }
            element = LHS + RHS + afterbraket;
        }
        
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
        
        
        splittedCode[i] = element;
    }
    // text = splittedCode.join('\n');
    let intermediateCode = "\n"
    if (onceCode) {
        intermediateCode += "if (codeNum != codesDone) { resolve(''); } \n";
    }
    text = start.logic + splittedCode.join(intermediateCode) + end.logic;
    text += "\n\n";

    usedFunctions.forEach((element, i, arr) => {
        let functionDef = '';
        const functionNeeded=blocks.find((el) => {
            return (el.functionName == element);
        })
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

    // try {
    //     eval(text);
    // } catch (error) {
    //     console.log(error);
    // }
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
    let inQuote = false;
    let withinBracket = false;
    let newText = "";
    let quoteSign = "";
    for (let i = 0; i < text.length; i++){
        if (inQuote) {
            if (text[i] == "\n") {
                const newLine = "\\n";
                newText = newText.concat(newLine);
            } else {
                newText=newText.concat(text[i])
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
                        withinBracket = true;
                        break;
                    case ";":
                    case "{":
                    case "}":
                        if (text[i + 1] != '\n') {
                            newText=newText.concat("\n")
                        }
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
            } else {
                quoteSign = text[i];
                quoteStart = i;
                inQuote = true;
            }
        }
    }
    return [newText,quotes];
}

