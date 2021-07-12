import { FlareSharp } from "@material-ui/icons";
import blockFunctions from "../public/blocks.json";

export class CodeGenerator {
  private blockFunctions: Array<any>;
  private content: string;
  private executes: Array<string>;
  private execute: string;
  private increment: number;
  private code: string;
  private variables: string[];
  private functions: string[];


  constructor() {
    this.blockFunctions = blockFunctions;
    this.content = "";
    this.executes = [];
    this.execute = "";
    this.increment = 1;
    this.code = "";
    this.variables = [];
    this.functions = [];
  }

  private checkCorrectVar(varName: string) {
    //Check if variable in correct system
    const spaces = varName.includes(' ');
    const numberStart = (varName[0] < 'A' || varName[0] > 'z');
    if (numberStart || spaces || this.isBool(varName)) {
      return false;
      console.log("Invalid Variable Name");
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
          str += `, `
        }
      })
    }
    return str;
  }

  private isNumber(varName: string) {
    for (let i = 0; i < varName.length; i++) {
      if (varName[i] < '0' || varName[i] > '9') {
        return false
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
    const possibility = ["+", "-", "*", "/", "**", "%", "<", ">", ">=", "<=", "==", "!=", ">=", "||"];
    for (let i = 0; i < possibility.length; i++) {
      const data = possibility[i];
      if (varName === data) {
        return true;
      }
    }
    console.log("Incorrect Sign!");
    return false;
  }

  private checkVariable(varName: string) {
    //Check if variable in correct system
    const spaces = varName.includes(' ');
    const numberStart = (varName[0] < 'A' || varName[0] > 'z');
    if (numberStart || spaces) {
      console.log("Invalid Variable Name");
      return false;
    }
    //Checks if variable created
    for (let i = 0; i < this.variables.length; i++) {
      if (this.variables[i] === varName) {
        return true;
      }
    }

    console.log("Unintialized Variable");
    return false;
  }

  private start(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find((element) => {
      return (
        element.robot === blockDetail.robot && blockDetail.type === "start"
      );
    });
    if (blockFunction) {
      this.content += blockFunction.logic;
      return true;
    }
    else {
      return false;
    }
    // Add to content
    
  }

  private mathOp(blockDetail: any) {
    switch (blockDetail.name) {
      case "add":
        blockDetail.value.operator = "+";
        break;
      case "subtract":
        blockDetail.value.operator = "-";
        break;
      case "multiply":
        blockDetail.value.operator = "*";
        break;
      case "divide":
        blockDetail.value.operator = "/";
        break;
      case "greaterThan":
        blockDetail.value.operator = ">";
        break;
      case "lessThan":
        blockDetail.value.operator = "<";
        break;
      case "equals":
        blockDetail.value.operator = "==";
        break;
      case "or":
        blockDetail.value.operator = "||";
        break;
    }
    let mathInput = ["a", "operator", "b"];
    let inputs: string = "";
    for (let i = 0; i < mathInput.length; i++) {
      let val = String(blockDetail.value[mathInput[i]]).trim();
      if (mathInput[i] != "operator") {
        if (!this.isNumber(val)) {
          if (!this.checkVariable(val)) {
            return false;
          }
        } else {
          val = String(Number(val));
        }
      } else {
        if (blockDetail)
          if (!this.checkSign(val)) {
            return false;
          }
      }
      inputs += val;
    }
    let output: any;
    output = '';
    output = this.checkCorrectVar(String(blockDetail.value.out));
    const str = `${output}(${inputs})`;
    this.executes.push(str);
    return true;
  }


  private move(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find((element) => {
      if (element.type === "specific") {
        return (
          element.function.name === blockDetail.name &&
          element.robot === blockDetail.robot
        );
      } else {
        return false;
      }
    });
    // Build input
    let inputVariables: string = "";
    let inputs: string = "";
    if (blockFunction.function.inputs) {
      for (let i = 0; i < blockFunction.function.inputs.length; i++) {
        const element = blockFunction.function.inputs[i];
        let currentInput = String(blockDetail.value[element.variable]).trim();
        if (!this.checkVariable(currentInput)) {
          if (element.type == "number")
            if (!this.isNumber(currentInput)) {
              console.log("Can't be used");
              return false;
            } else {
              currentInput = String(Number(currentInput));
            }
        } else if (element.type == "boolean" && !this.isBool(currentInput)) {
          console.log("Can't be used");
          return false;
        }
        if (i === blockFunction.function.inputs.length - 1) {
          inputVariables += element.variable;
          inputs += currentInput;
        } else {
          inputVariables += element.variable + ", ";
          inputs += currentInput + ", ";
        }
      }
    }
    const elementOut = blockFunction.function.output
    let output: any;
    output = '';
    if (elementOut) {
      output = this.checkCorrectVar(String(blockDetail.value[elementOut.variable]));
    }
    // Function name
    const functionName = blockFunction.function.name
    const added = this.addFunction(functionName);
    //const functionName = blockFunction.function.name + String(this.increment);
    this.increment++;
    // Build function
    const func = `let ${functionName} = (${inputVariables}) => {
      return new Promise((resolve, reject) => {
        ${blockFunction.function.logic}
      });
    }\n\n
    `;
    if (added) {
      this.content += func;
    }
    // Add execute
    const execute = `// ${blockFunction.name}
    ${output}await ${functionName}(${inputs});`;
    this.executes.push(execute);
    return true;
  }

  private forStart(blockDetail) {
    let val = String(blockDetail.value.condition).trim();
    if (!this.isNumber(val)) {
      if (!this.checkVariable(val)) {
        return false;
      }
    } else {
      val = String(Number(val));
    }
    const str = `for(let i=0;i<${val};i++){`;
    this.executes.push(str);
    return true;
  }

  private ifStart(blockDetail: any) {
    const val = String(blockDetail.value.condition).trim();
    if (!this.isBool(val)) {
      if (!this.checkVariable(val)) {
        return false;
      }
    }
    let inputs = val;
    const str = `if(${inputs}){`;
    this.executes.push(str);
    return true;
  }

  private whileStart(blockDetail: any) {
    const val = String(blockDetail.value.condition).trim();
    if (!this.isBool(val)) {
      if (!this.checkVariable(val)) {
        return false;
      }
    }
    let inputs = val;
    const str = `while(${inputs}){`;
    this.executes.push(str);
    return true
  }

  private elseCondition() {
    let str = `}else{`;
    this.executes.push(str);
    return true;
  }

  private intialise(blockDetail) {
    let currentInput = String(blockDetail.value.value).trim();
    if (!this.isNumber(currentInput)) {
      if (!this.checkVariable(currentInput) && !this.isBool(currentInput)) {
        console.log("Can't be used");
        return false;
      }
    } else {
      currentInput = String(Number(currentInput));
    }
    let output: any
    output = '';
    output = this.checkCorrectVar(String(blockDetail.value.varName));
    const execute = `// Assign Variable
    ${output} ${currentInput};`;
    this.executes.push(execute);
    return true;
  }

  private endCondition() {
    let str = `}`;
    this.executes.push(str);
    return true;
  }

  private end(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find((element) => {
      return element.robot === blockDetail.robot && element.type === "end";
    });
    // Add to execute
    if (blockFunction) {
      for (let i = 0; i < blockFunction.executes.length; i++) {
        const element = blockFunction.executes[i];
        this.executes.push(element);
      }
      return true;
    }
    return false;
  }
  
  private doMove(blockDetail) {
    const command = (blockDetail.name.charAt(0).toUpperCase()) + blockDetail.name.slice(1);
    if (blockDetail.value) {
      const target = (blockDetail.value.entity.charAt(0).toUpperCase()) + blockDetail.value.entity.slice(1);
      const str = `unityContext.send("${target}","${command}");`;
      this.executes.push(str);
      return true;
    } else {
      return false;
    }
   
  }

  private readSensors(blockDetail) {
    if (blockDetail.value) {
      const output = this.checkCorrectVar(String(blockDetail.value.out));
      const target = blockDetail.value.sensor;
      let str=`${output}currentData.${target}`
    } else {
      return false;
    }
  }

  private run() {
    this.execute = "const run = async () => {\n";
    for (let i = 0; i < this.executes.length; i++) {
      const element = this.executes[i];
      this.execute += "\t" + element + "\n\n";
    }
    this.execute += "};\nrun();";
  }



  public build(blockDetails: Array<any> = []) {
    // Reset Values
    this.content = "";
    this.executes = [
      `// Terminate previous operations of the robotic system.
      const handler = () => {
        console.log('terminating')
        clearInterval(communication);
        clearInterval(interval);
        document.querySelectorAll(".terminate-code").forEach((el) => {
          el.removeEventListener("click", handler);
        });
      };
      document.querySelectorAll(".terminate-code").forEach((el) => {
        el.addEventListener("click", handler);
      });`,
    ];
    this.variables = [];
    this.functions = [];
    this.execute = "";
    this.increment = 1;
    this.code = "";
    //
    let state = true;
    for (let i = 0; i < blockDetails.length; i++) {
      const element = blockDetails[i];
      switch (element.type) {
        case "start":
          state = this.start(element);
          break;
        case "specific":
          state = this.move(element);
          break;
        case "end":
          state = this.end(element);
          break;
        case "if":
          state = this.ifStart(element);
          break;
        case "intialise":
          state = this.intialise(element);
          break;
        case "while":
          state = this.whileStart(element);
          break;
        case "operatorGeneral":
          state = this.mathOp(element);
          break;
        case "repeat":
          state = this.forStart(element);
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
          state = this.readSensors(element);
          break;
        default:
          break;
      }
      if (!state) {
        return ""
      }
    }
    
    this.run();
    
    return this.intialiseVar()+this.content + this.execute;
  }
}
