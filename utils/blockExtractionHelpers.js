import {
    getOutgoers,
    getConnectedEdges,
    getIncomers,
  } from "react-flow-renderer";




 const findNextNode = (currentNode, path, elements) => {
    const nodes = [currentNode];
    let nodeCollection = getConnectedEdges(nodes, elements);
    let nextNodeList = getOutgoers(currentNode, elements);
    let nextNodeID;
    const reqConnection = nodeCollection.filter((connection) => {
      if (currentNode.id == connection.source) {
        if (connection.sourceHandle == String(path)) {
          return true;
        }
      }
      return false;
    });
    if (reqConnection.length > 1) {
      return [false, "One Block has multiple exectution connection"];
    }
    if (reqConnection.length == 0) {
      return [true, false];
    }
    const Connection = reqConnection[0];
    if (
      Connection.targetHandle &&
      Connection.targetHandle.split("__")[0] == "execution"
    ) {
      nextNodeID = Connection.target;
    } else {
      return [false, "Wrong Connection"];
    }
  
    for (let i = 0; i < nextNodeList.length; i++) {
      if (nextNodeID == nextNodeList[i].id) {
        return [true, nextNodeList[i]];
      }
    }
  
    return [true, false];
  };
  
 const determineType = (block, currentNode) => {
    switch (currentNode.type) {
      case "if":
      case "intialise":
      case "compare":
      case "while":
      case "for":
      case "num":
      case "repeat":
      case "operatorGeneral":
      case "print":
        block.name = currentNode.type;
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
      case "greaterThan":
      case "lessThan":
      case "equals":
      case "notEquals":
      case "and":
      case "or":
        block.type = "operatorGeneral";
        block.name = currentNode.type;
        break;
      case "heightOf":
      case "widthOf":
      case "elevationOf":
      case "speedOf":
      case "distance":
        block.type = "sense";
        block.name = currentNode.type;
        break;
      case "start":
      case "end":
        break;
      case "jump":
      case "crouch":
      case "attack":
      case "crouch":
      case "doubleJump":
        block.type = "move";
        block.name = currentNode.type;
        break;
      default:
        block.type = "specific";
        block.name = currentNode.type;
        break;
    }
    return block;
  };
  
  const CheckPreviuos = (currentNode, elements) => {
    const nodes = [currentNode];
    let edgeCollection = getConnectedEdges(nodes, elements);
    const prevConnection = edgeCollection.filter((connection) => {
      if (currentNode.id == connection.target) {
        if (connection.targetHandle.split("__")[0] == "execution") {
          return true;
        }
      }
      return false;
    });
  
    if (prevConnection.length != 1 && currentNode.id != "start") {
      return false;
    }
    return true;
  };
  
  const findInputs = (
    blocksOrder,
    currentNode,
    elements,
    val,
    robotName,
    level = 0
  ) => {
    const nodes = [currentNode];
    let edgeCollection = getConnectedEdges(nodes, elements);
    let prevNodeList = getIncomers(currentNode, elements);
    let IDlist = [];
    let inputs = [];
    if (level != 0) {
      let outName = null;
      let executionBlock = false;
      for (let i = 0; i < edgeCollection.length; i++) {
        if (currentNode.id == edgeCollection[i].source) {
          if (
            edgeCollection[i].sourceHandle &&
            edgeCollection[i].sourceHandle.split("_")[0] == "execution"
          ) {
            executionBlock = true;
          } else if (
            edgeCollection[i].sourceHandle &&
            edgeCollection[i].sourceHandle.split("_")[0] == "execution"
          ) {
            outName = blocksOrder[i].value[edgeCollection[i].sourceHandle];
          }
          if (executionBlock == true && outName) {
            break;
          }
        }
      }
      if (executionBlock) {
        for (let i = 0; i < blocksOrder.length; i++) {
          if (blocksOrder[i].id == currentNode.id) {
            return [blocksOrder, val, outName];
          }
        }
        return [null, null, null, "Wrong execution order"];
      }
    }
  
    for (let i = 0; i < edgeCollection.length; i++) {
      if (currentNode.id == edgeCollection[i].target) {
        if (
          edgeCollection[i].targetHandle &&
          edgeCollection[i].targetHandle.split("_")[0] != "execution"
        ) {
          const splitName = edgeCollection[i].targetHandle.split("__");
          const inputName = splitName[splitName.length - 1];
          inputs.push(inputName);
          for (let j = 0; j < prevNodeList.length; j++) {
            if (edgeCollection[i].source == prevNodeList[j].id) {
              IDlist.push(prevNodeList[j]);
              break;
            }
          }
        }
      }
    }
    const unduplicatedArray = [...new Set(inputs)];
  
    if (unduplicatedArray.length != inputs.length) {
      return [null, null, null, "One of the inputs has more than one entry"];
    }
    let block = {
      robot: robotName,
      id: currentNode.id,
      type: currentNode.type,
    };
    if (currentNode.data != undefined) {
      block.value = { ...currentNode.data.values };
    }
    block = determineType(block, currentNode);
    let output;
    for (let i = 0; i < IDlist.length; i++) {
      let message;
      [blocksOrder, val, output, message] = findInputs(
        blocksOrder,
        IDlist[i],
        elements,
        val,
        robotName,
        1
      );
      if (blocksOrder || val || output) {
        block.value[inputs[i]] = output;
      } else {
        return [null, null, null, message];
      }
    }
    let edgeNum;
    for (let i = 0; i < edgeCollection.length; i++) {
      if (currentNode.id == edgeCollection[i].source) {
        if (
          edgeCollection[i].sourceHandle &&
          edgeCollection[i].sourceHandle.split("__")[0] != "execution"
        ) {
          edgeNum = i;
          break;
        }
      }
    }
    let outName = false;
    switch (currentNode.type) {
      default:
        if (edgeNum || edgeNum == 0) {
          const splitArray = edgeCollection[edgeNum].sourceHandle.split("__");
          let NextOut = splitArray[splitArray.length - 1];
          if (NextOut) {
            outName = "out_" + String(val);
            val++;
          }
          block.value[NextOut] = outName;
        }
        blocksOrder.push(block);
        break;
    }
    return [blocksOrder, val, outName, ""];
  };
  
export  const flow2Text = (elements, projectName) => {
    let blocksConfig = [];
    let currentNode = elements[0];
    let traverse = true;
    let val = 0;
    let path = [];
    let maxPath = [];
    let nodeContext = [];
    const robotName = defineObject(projectName);
    if (robotName == "") {
      console.log("G");
      return "Robot doesn't Exist";
    }
    while (traverse) {
      if (currentNode) {
        if (!CheckPreviuos(currentNode, elements)) {
          return ["One Node has more than one input", null, null];
        }
        let f, message;
        [blocksConfig, val, f, message] = findInputs(
          blocksConfig,
          currentNode,
          elements,
          val,
          robotName
        );
        if (!(blocksConfig || val || f)) {
          return [message, null, null];
        }
      }
      let nextNode;
      let executionNext = "execution__out";
      switch (currentNode.type) {
        case "if":
          maxPath.push(2);
          path.push(0);
          nodeContext.push(currentNode);
          executionNext += "__" + String(path[path.length - 1]);
          break;
        case "while":
        case "repeat":
          maxPath.push(1);
          path.push(0);
          nodeContext.push(currentNode);
          executionNext += "__" + String(path[path.length - 1]);
          break;
        case undefined:
          let block = blocksConfig.pop();
          if (block.type != "else-condition") {
            blocksConfig.push(block);
          }
          executionNext = undefined;
          break;
      }
      if (executionNext) {
        let state;
        [state, nextNode] = findNextNode(currentNode, executionNext, elements);
        if (!state) {
          return [nextNode, null, null];
        }
      }
      if (nextNode) {
        currentNode = nextNode;
      } else {
        if (path.length == 0) {
          traverse = false;
          break;
        } else {
          currentNode = nodeContext[path.length - 1];
          path[path.length - 1]++;
          let executionNext = "execution__out__" + String(path[path.length - 1]);
          let state;
          [state, nextNode] = findNextNode(currentNode, executionNext, elements);
          if (!state) {
            return [nextNode, null, null];
          }
          let interBlock;
          if (path[path.length - 1] == maxPath[path.length - 1]) {
            path.pop();
            maxPath.pop();
            nodeContext.pop();
            interBlock = {
              type: "end-condition",
              name: "end-condition",
            };
          } else {
            switch (currentNode.type) {
              case "if":
                if (path[path.length - 1] == 1) {
                  interBlock = {
                    type: "else-condition",
                    name: "else-condition",
                  };
                }
                break;
              default:
                break;
            }
          }
          blocksConfig.push(interBlock);
          currentNode = nextNode;
        }
      }
    }
  
    const endNode = {
      robot: robotName,
      type: "end",
    };
    blocksConfig.push(endNode);
  
    if (blocksConfig.length == 2) {
      return [
        blocksConfig,
        "warning",
        "You have no blocks connected. Nothing interesting will happen.",
      ];
    }
    return [blocksConfig, null, null];
  };
  
  export const  defineObject = (projectName) => {
    switch (projectName) {
      case "send-it":
        return "Player";
      case "magnebot":
        return "Arm";
    }
    return "";
  };
  
export const isOnceCode = (projectName) => {
    switch (projectName) {
      case "send-it":
        return false;
      case "magnebot":
        return true;
    }
  };
  