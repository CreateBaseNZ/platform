export default function heatSeeker() {
	return `

const sensor = {
	leftLine: () => {
		return JSON.parse(sensorDataRef.current).rightLineSensor - JSON.parse(sensorDataRef.current).leftLineSensor;
	},
	rightLine: () => {
		return JSON.parse(sensorDataRef.current).leftLineSensor - JSON.parse(sensorDataRef.current).rightLineSensor;
	},
};

`;
}
