// This is a module worker, so we can use imports (in the browser too!)
// Maybe make a module for each project and import here

addEventListener("message", (event) => {
	console.log(event.data);
});

const header = `
const post = (message) => postMessage(JSON.stringify(message));

// ["log", "debug", "info", "warn", "error"].forEach(function (verb) {
// 	console[verb] = function () {
// 		post({ fn: \`console.\${verb}\`, params: Array.from(arguments) });
// 	};
// });

function rotateLeftMotor(value) {
  if (typeof value !== 'number') {
    console.error(\`Type error: Input to rotateLeftMotor must be a number, received a \${typeof value} instead\`);
    return post({fn: 'terminate'})
  }
	post({ fn: "unityContext.send", params: ["LeftWheel", "RotateMotorForwards", value] });
};
`;

const footer = `
init()
// setInterval(() => {
//  loop()
// }, 1000)
`;

const code = self.name;

try {
	Function(header + code + footer)();
} catch (e) {
	postMessage(JSON.stringify({ fn: "console.error", params: [e.toString()] }));
	postMessage(JSON.stringify({ fn: "hang" }));
}
