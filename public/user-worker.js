const code = this.name;

const func = new Function(
	"sensorData",
	`
  console.log = () => {}
  try {
    ${code}
  } catch(error) {
    console.error(error)
  }`
);

onmessage = (e) => {
	const { sensorDataString } = e.data;

	const sensorData = JSON.parse(sensorDataString);

	func(sensorData);

	postMessage({
		sensorData,
	});
};
