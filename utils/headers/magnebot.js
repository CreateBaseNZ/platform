export default function magnebot() {
	return `

function InitialiseRobot() {
	return new Promise((resolve, reject) => {
		unityContext.send("SceneController", "ResetScene");
		setTimeout(resolve, 2500);
	});
}

function MoveArmAlgorithm(x, y, z) {
	const intialPoint = JSON.parse(sensorDataRef.current).endEffectorPosition;
	const point = x + ", " + y + ", " + z;
	unityContext.send("Arm", "SetTarget", point);
	const rate = 100;
	const maxtime = 2.5;
	const maxRepeats = (maxtime * 1000) / rate;
	const minTimeCheck = 1;
	const minRepeats = (minTimeCheck * 1000) / rate;
	let repeats = 0;
	let interval = setInterval(() => {
		const position = JSON.parse(sensorDataRef.current).endEffectorPosition;

		let Reached = true;
		repeats++;
		const error = [0, 0, 0];
		error[0] = Math.abs(x - position.x);
		error[1] = Math.abs(y - position.y);
		error[2] = Math.abs(z - position.z);
		for (let i = 0; i < error.length; i++) {
			if (error[i] > 0.05) {
				Reached = false;
				break;
			}
		}
		if (Reached || repeats >= maxRepeats) {
			clearInterval(interval);
			resolve();
		}
		if (repeats == minRepeats) {
			const change = [0, 0, 0];
			change[0] = Math.abs(intialPoint.x - position.x);
			change[1] = Math.abs(intialPoint.y - position.y);
			change[2] = Math.abs(intialPoint.z - position.z);
			let notMoved = true;
			for (let i = 0; i < change.length; i++) {
				if (change[i] > 0.01) {
					notMoved = false;
					break;
				}
			}
			if (notMoved) {
				clearInterval(interval);
				resolve();
			}
		}
	}, rate);
}

function MagneticSwitchAlgorithm() {
	if (a) {
		props.unityContext.send("GravitySphere", "EnableGravitySphere");
	} else {
		props.unityContext.send("GravitySphere", "DisableGravitySphere");
	}
	setTimeout(resolve, 100);
}

`;
}
