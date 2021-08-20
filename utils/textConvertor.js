import blockFunctions from "../public/blocks.json";

const awaitFunctions=['intialiseRobot','MoveArm']

export const convertCode = (text, system) => {
  //divide the code Input 
    const doubledUpText = doubleUp(text);
    let splittedCode = doubledUpText.split('\n');
    console.log(splittedCode);
    for (let i = 0; i < splittedCode.length; i++){
        let element = splittedCode[i].trim();
        console.log(splittedCode[i])
        const dividedbyBracket=element.split("(")
        const beforeBracket=dividedbyBracket[0];

        console.log(beforeBracket);
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
        console.log(RHS);
        if(awaitFunctions.includes(RHS)){
            RHS='await '+RHS;
        }
        const afterbraket=dividedbyBracket.splice(1).join('(');
        console.log(afterbraket);
        if(afterbraket){
            afterbraket='('+afterbraket;
        }
        if(LHS){
            LHS+='=';
        }
        element=LHS+RHS+afterbraket;
        splittedCode[i] = element;
    }
    text= splittedCode.join('\n');
    // try {
    //     eval(text);
    // } catch (error) {
    //     console.log(error);
    // }
    console.log(text);
};



const splitSingleEqual = (input) => {
    const splittingIndex = [];
    for (let i = 1; i < input.length-1; i++){
        if (input[i] == "="&& input[i-1] != "="&& input[i+1] != "=") {
            console.log(i);
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

