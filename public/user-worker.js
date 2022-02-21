const code = this.name;

let buffer = [];

const func = new Function(
	"sensorData",
	"buffer",
	`
  buffer.push("hi")
  try {
    ${code}
  } catch(error) {
    console.error(error);
  };
  `
);

onmessage = (e) => {
	const { sensorDataString } = e.data;

	const sensorData = JSON.parse(sensorDataString);

	buffer = [];

	func(sensorData, buffer);
	postMessage({ buffer });
};
