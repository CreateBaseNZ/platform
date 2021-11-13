export default function heatSeeker() {
	return `

	const sensor = {
		leftLine: () => {
			return JSON.parse(sensorDataRef.current).rightLineSensor - JSON.parse(sensorDataRef.current).leftLineSensor;
		},
	};

`;
}
