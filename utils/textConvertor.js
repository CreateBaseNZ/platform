import blockFunctions from "../public/blocks.json";

const awaitFunctions = ['intialiseRobot', 'MoveArm'];
const unityDirectFunctions = ['Jump', 'Crouch'];
export const convertCode = (text, system) => {
    console.log(text);
    let functions = '';
    
    let blocks = [], awaitFunctions = [],allFunctions=[];
    for (let i = 0; i < blockFunctions.length; i++) {
        const
            element = blockFunctions[i];
        if ((element.robot == undefined || element.robot === system)&&element.functionName) {
            blocks.push(element);
            allFunctions.push(element.functionName);
            if (element.await == true) {
                awaitFunctions.push(element.functionName);
            }
       }
    }
    console.log(blocks);
    console.log(allFunctions);
    console.log(awaitFunctions);
    const usedFunctions = [];
  //divide the code Input 
    const doubledUpText = doubleUp(text);
    let splittedCode = doubledUpText.split('\n');
    for (let i = 0; i < splittedCode.length; i++){
        let element = splittedCode[i].trim();
        const dividedbyBracket=element.split("(")
        const beforeBracket=dividedbyBracket[0];
        const [elementSplitted, sides] = splitSingleEqual(beforeBracket);
        let LHS='',RHS=''
        if (sides == 0) {
            continue;
        } else if (sides == 1) {
            RHS = elementSplitted;
        } else if (sides == 2) {
            LHS = elementSplitted[0];
            RHS = elementSplitted[1];
        }
        if (allFunctions.includes(RHS)&&!usedFunctions.includes(RHS)) {
            usedFunctions.push(RHS);
        }
        if(awaitFunctions.includes(RHS)){
            RHS='await '+RHS;
        } else if (unityDirectFunctions.includes(RHS)) {
            RHS = `unityContext.send("${system}","${RHS}");`
            for (let i = 0; i < dividedbyBracket.length; i++){
                dividedbyBracket[i] = '';
            }
        } else if (RHS == 'console.log') {
            RHS = 'ctx.addLog';
        }
        const afterbraket=dividedbyBracket.splice(1).join('(');
        if(afterbraket){
            afterbraket='('+afterbraket;
        }
        if(LHS){
            LHS+='=';
        }
        element=LHS+RHS+afterbraket;
        splittedCode[i] = element;
    }
    text = splittedCode.join('\n');

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
        text += functionDef;
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

const doubleUp = (text) => {
    let Quotes = false;
    let withinBracket = false;
    for (let i = 1; i < text.length; i++){
        if (Quotes) {
            if (text[i] == "\n") {
                const starttext = text.substring(0, i);
                const endtext = text.substring(i + 1);
                text = starttext + `\\n` + endtext;
                i++;
            }
        } else {
            if (withinBracket) {
                if (text[i] == ')') {
                    withinBracket = false;
                }
            } else {
                if (text[i] == '(') {
                    withinBracket = true;
                } else {
                    if (text[i] == ';') {
                        if (text[i + 1] != '\n') {
                            const starttext = text.substring(0, i + 1);
                            const endtext = text.substring(i + 1);
                            text = starttext + `\n` + endtext;
                        }
                    }
                    else if (text[i] == '{') {
                        if (text[i + 1] != '\n') {
                            const starttext = text.substring(0, i + 1);
                            const endtext = text.substring(i + 1);
                            text = starttext + `\n` + endtext;
                        }
                    }
                    if (text[i] == ';') {
                        if (text[i -
                            1] != '\n') {
                            const starttext = text.substring(0, i + 1);
                            const endtext = text.substring(i + 1);
                            text = starttext + `\n` + endtext;
                        }
                    }
                }
            }
        }
        if (text[i] == "\"" || text[i] == "'" || text[i] == "`") {
            Quotes = !Quotes;
        }
    }
    return text;
}

