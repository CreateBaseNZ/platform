import BlocksF from "../public/systemDefinitions.json"


export class CodeGenerator {
  private content: string;
  private simpleContent: string;
  private executes: Array<string>;
  private execute: string;
  private simpleExecutes: Array<string>;
  private simpleExecute: string;
  private increment: number;
  private code: string;
  private variables: string[];
  private functions: string[];

  constructor() {
    this.content = "";
    this.executes = [];
    this.execute = "";
    this.increment = 1;
    this.code = "";
    this.variables = [];
    this.functions = [];
    this.simpleExecutes = [];
    this.simpleExecute = "";
    this.simpleContent = "";
  }

  private checkCorrectVar(varName: string) {
    //Check if variable in correct system
    const spaces = varName.includes(" ");
    const numberStart = varName[0] < "A" || varName[0] > "z";
    if (numberStart || spaces || this.isBool(varName)) {
      return false;
    }
    //Checks if variable created
    let found = false;
    for (let i = 0; i < this.variables.length; i++) {
      if (this.variables[i] === varName) {
        found = true;
        break;
      }
    }
    if (!found) {
      this.variables.push(varName);
    }
    return varName + " = ";
  }

  private intialiseVar() {
    let str = "";
    const varNum = this.variables.length - 1;
    if (this.variables.length > 0) {
      str += `let `;
      this.variables.forEach((data, index) => {
        str += `${data}`;
        if (index == varNum) {
          str += `;\n`;
        } else {
          str += `, `;
        }
      });
    }
    return str;
  }

  private isNumber(varName: string) {
    let decimal = 0;
    for (let i = 0; i < varName.length; i++) {
      if (varName[i] == ".") {
        decimal++;
        if (decimal > 1) {
          return false;
        }
      } else if (varName[i] < "0" || varName[i] > "9") {
        if (i != 0 || varName[i] != '-') {
          return false;
        }
      }
    }
    return true;
  }

  private isBool(varName: string) {
    if (varName == "true" || varName == "false") {
      return true;
    }
    return false;
  }

  private addFunction(functionName) {
    for (let i = 0; i < this.functions.length; i++) {
      if (this.functions[i] === functionName) {
        return false;
      }
    }
    this.functions.push(functionName);
    return true;
  }

  private checkSign(varName: string) {
    const possibility = [
      "+",
      "-",
      "*",
      "/",
      "**",
      "%",
      "<",
      ">",
      ">=",
      "<=",
      "==",
      "!=",
      ">=",
      "||",
      "&&",
    ];
    for (let i = 0; i < possibility.length; i++) {
      const data = possibility[i];
      if (varName === data) {
        return true;
      }
    }
    return false;
  }

  private checkVariable(varName: string) {
    //Check if variable in correct system
    const spaces = varName.includes(" ");
    const numberStart = varName[0] < "A" || varName[0] > "z";
    if (numberStart || spaces) {
      return false;
    }
    //Checks if variable created
    for (let i = 0; i < this.variables.length; i++) {
      if (this.variables[i] === varName) {
        return true;
      }
    }
    return false;
  }

  private start( correctSystem) {
    this.executes.push(correctSystem.functions.start.logic);
    this.simpleExecutes.push(correctSystem.functions.start.simpleLogic);
    return true;
  }

  private mathOp(blockDetail: any) {
    let mathInput = ["a", "operator", "b"];
    let inputs: string = "";
    for (let i = 0; i < mathInput.length; i++) {
      let simpleVal = "";
      let val = String(blockDetail.value[mathInput[i]]).trim();
      if (mathInput[i] != "operator") {
        if (!this.isNumber(val)) {
          if (!this.checkVariable(val)) {
            return [
              false,
              "error",
              "The inputs to one of the operators is not a number",
            ];
          }
        } else {
          val = String(Number(val));
        }
      } else {
        if (blockDetail) {
          if (!this.checkSign(val)) {
            return [false, "error", "Wrong Sign is Entered"];
          }
        } else {
          return [false, "error", "Something Went Wrong"];
        }
      }
      inputs += val;
    }
    let output: any;
    output = "";
    output = this.checkCorrectVar(String(blockDetail.value.out));
    const str = `${output}(${inputs})`;
    this.simpleExecutes.push(str);
    this.executes.push(str);
    return [true];
  }

  private move(blockDetail: any,correctSystem,genralSystem) {
    // Fetch the Block Function
    let blockFunction = correctSystem.functions[blockDetail.name];
    if (!blockFunction) {
      blockFunction=genralSystem.functions[blockDetail.name];
    } 
    // Build input
    let inputVariables: string = "";
    let inputs: string = "";
    if (!blockFunction) { return [false, "error", "Function does not exist"]; }
    if (blockFunction.inputs) {
      for (let i = 0; i < blockFunction.inputs.length; i++) {
        const element = blockFunction.inputs[i];
        let currentInput = String(blockDetail.value[element.variable]).trim();
        if (!this.checkVariable(currentInput)) {
          if (element.type == "number")
            if (!this.isNumber(currentInput)) {
              return [
                false,
                "error",
                "Input to one of blocks is not a Boolean or Number",
              ];
            } else {
              currentInput = String(Number(currentInput));
            }
        } else if (element.type == "boolean" && !this.isBool(currentInput)) {
          return [
            false,
            "error",
            "Input to one of blocks is not a Boolean or Number",
          ];
        }
        if (i === blockFunction.inputs.length - 1) {
          inputVariables += element.variable;
          inputs += currentInput;
        } else {
          inputVariables += element.variable + ", ";
          inputs += currentInput + ", ";
        }
      }
    }
    const elementOut = blockFunction.output;
    let output: any;
    output = "";
    if (elementOut) {
      output = this.checkCorrectVar(
        String(blockDetail.value[elementOut.variable])
      );
    }
    // Function name
    const functionName = blockDetail.name;
    const added = this.addFunction(functionName);
    //const functionName = blockFunction.function.name + String(this.increment);
    this.increment++;
    // Build function
    const func = `let ${functionName} = (${inputVariables}) => {
      return new Promise((resolve, reject) => {
        ${blockFunction.logic}
      });
    }\n
    `;
        
    if (added) {
      this.content += func;
    }
    // Add execute
    const execute = `${output}await ${functionName}(${inputs});`;
    const simpleStr = ` ${output} ${functionName}(${inputs});`;
    this.executes.push(execute);
    this.simpleExecutes.push(simpleStr);
    return [true];
  }

  private forStart(blockDetail) {
    let val = String(blockDetail.value.condition).trim();
    if (!this.isNumber(val)) {
      if (!this.checkVariable(val)) {
        return [false, "error", "The input for a Repeat block is not a number"];
      }
    } else {
      val = String(Number(val));
    }
    const str = `for(let i=0;i<${val};i++){`;
    this.simpleExecutes.push(str);
    this.executes.push(str);
    return [true];
  }

  private ifStart(blockDetail: any) {
    const val = String(blockDetail.value.condition).trim();
    if (!this.isBool(val)) {
      if (!this.checkVariable(val)) {
        return [
          false,
          "error",
          "One or more If blocks do not have a condition",
        ];
      }
    }
    let inputs = val;
    const str = `if(${inputs}){`;
    this.executes.push(str);
    this.simpleExecutes.push(str);
    return [true];
  }

  private whileStart(blockDetail: any) {
    const val = String(blockDetail.value.condition).trim();
    if (!this.isBool(val)) {
      if (!this.checkVariable(val)) {
        return [
          false,
          "error",
          "One or more While blocks do not have a condition",
        ];
      }
    }
    let inputs = val;
    const str = `while(${inputs}){`;
    this.executes.push(str);
    this.simpleExecutes.push(str);

    return [true];
  }

  private elseCondition() {
    let str = `}else{`;
    this.executes.push(str);
    this.simpleExecutes.push(str);
    return true;
  }

  private intialise(blockDetail) {
    let currentInput = String(blockDetail.value.value).trim();
    if (!this.isNumber(currentInput)) {
      if (!this.checkVariable(currentInput) && !this.isBool(currentInput)) {
        return [
          false,
          "error",
          "One or more intialise block does not have a correct input",
        ];
      }
    } else {
      currentInput = String(Number(currentInput));
    }
    let output: any;
    output = "";
    output = this.checkCorrectVar(String(blockDetail.value.varName));
    const str = `${output} ${currentInput};`;
    this.simpleExecutes.push(str);

    this.executes.push(str);
    return [true];
  }

  private endCondition() {
    let str = `}`;
    this.executes.push(str);
    this.simpleExecutes.push(str);
    return true;
  }

  private end(correctSystem: any) {
    
    // Add to execute
    this.executes.push(correctSystem.functions.end.logic);
    this.simpleExecutes.push(correctSystem.functions.end.logic);
    return true;
    
  }


  //TODO
  private doMove(blockDetail) {
    const command = blockDetail.name.charAt(0).toUpperCase() + blockDetail.name.slice(1);
    if (blockDetail.value) {
      const target =
        blockDetail.value.entity.charAt(0).toUpperCase() +
        blockDetail.value.entity.slice(1);
      const str = `unityContext.send("${target}","${command}");`;
      const simpleStr = `${command}();`;
      this.simpleExecutes.push(simpleStr);
      this.executes.push(str);
      return true;
    } else {
      return false;
    }
  }

  private readSensors(blockDetail,correctSystem) {
    if (blockDetail.value) {
      const output = this.checkCorrectVar(String(blockDetail.value.out));
      const target = blockDetail.name;
      const sensorMethod = correctSystem.sensors[target];
      if (sensorMethod) {
        let str = `${output}JSON.parse(sensorDataRef.current).${sensorMethod.name};`;
        const simpleStr = `${output} ${sensorMethod.simpleName};`;
        this.simpleExecutes.push(simpleStr);
        this.executes.push(str);
        return true;
      } else {
        return false;
      }
      
    } else {
      return false;
    }
  }


  private delay(blockDetail) {
    if (blockDetail.value) {
      const delayTime = String(blockDetail.value.a);
      console.log(delayTime);
      if (this.checkVariable(delayTime) || this.isNumber(delayTime)) {
        const added = this.addFunction("delay");
        const functionName = "delay";
        const functionImplemt = `const delay = (seconds) => {\nconst startTime=new Date().getTime();\nlet timeDone=false;\nwhile(!timeDone){\nif ((new Date().getTime() - startTime) > seconds*1000){\nbreak;\n}\n}\n}\n`;
        if (added) {
          this.content += functionImplemt;
        }
        let str = `await delay(${delayTime});`;
        this.simpleExecutes.push(str);
        this.executes.push(str);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private printMessage(blockDetail, printNum) {
    if (blockDetail.value) {
      printNum++;
      const input = String(blockDetail.value.a);
      let str, simpleStr;
      str = `if(printing>=10){
               `
      if (this.checkVariable(input)) {
        str += `ctx.addLog(\`Print Number ${printNum}= \${${input}} \`)`;
        simpleStr = `console.log(\`Print Number ${printNum}= \${${input}}\`)`;
      } else if (this.isNumber(input) || (this.isBool(input))) {
        str += `ctx.addLog(\`Print Number ${printNum}= ${input}\`)`;
        simpleStr = `console.log(\`Print Number ${printNum}= ${input}\`)`;
      } else {
        printNum--;
        return [false, printNum];

      }
      str += `
    }`;
      this.simpleExecutes.push(simpleStr);
      this.executes.push(str);
      return [true, printNum];
    } else {
      return [false, printNum];
    }
  }

  private run() {
    this.execute = "";
    for (let i = 0; i < this.executes.length; i++) {
      this.simpleExecute += this.simpleExecutes[i] + "\n";
      const element = this.executes[i];
      this.execute += "\t" + element + "\n";
    }
    this.execute += "";
  }

  public build(blockDetails: Array<any> = [], runOnce: boolean) {
    // Reset Values
    this.content = "";
    this.executes = [];
    this.variables = [];
    this.functions = [];
    this.execute = "";
    this.increment = 1;
    this.code = "";
    this.simpleExecutes = [];
    this.simpleExecute = "";
    this.simpleContent = "";
    let printNum = 0;
    //
    let state: any = true;
    let type = null;
    let message = null;
    const systemName = blockDetails[0].robot;
    const correctSystem = BlocksF.filter((element) => {
      return element.robot==systemName
    })[0];
    const genralSystem = BlocksF.filter((element) => {
      return element.robot == undefined;
    })[0];
    for (let i = 0; i < blockDetails.length; i++) {
      const element = blockDetails[i];
      switch (element.type) {
        case "start":
          state = this.start(correctSystem);
          break;
        case "specific":
          [state, type, message] = this.move(element, correctSystem, genralSystem);
          break;
        case "end":
          state = this.end(correctSystem);
          break;
        case "if":
          [state, type, message] = this.ifStart(element);
          break;
        case "intialise":
          [state, type, message] = this.intialise(element);
          break;
        case "while":
          [state, type, message] = this.whileStart(element);
          break;
        case "operatorGeneral":
          [state, type, message] = this.mathOp(element);
          break;
        case "repeat":
          [state, type, message] = this.forStart(element);
          break;
        case "else-condition":
          state = this.elseCondition();
          break;
        case "move":
          state = this.doMove(element);
          break;
        case "end-condition":
          state = this.endCondition();
          break;
        case "sense":
          state = this.readSensors(element, correctSystem);
          break;
        case "print":
          [state, printNum] = this.printMessage(element, printNum);
          break;
        case "delay":
          state = this.delay(element);
          break;
        default:
          break;
      }
      if (!state) {
        return [
          "// Oops! An error occurred, please check the Console for more info",
          type,
          message,
          "// Oops! An error occurred, please check the Console for more info",
        ];
      }
      const str = "if(codeChanged){resolve(true);}"
      this.simpleExecutes.push("");
      this.executes.push(str);
    }

    this.run();
    const runCode = this.intialiseVar() + this.content + this.execute;
    const simple = this.intialiseVar() + this.simpleContent + this.simpleExecute;
    return [runCode, null, null, simple];
  }
}
