import { useEffect, useState } from "react";
import { UnityContext } from "react-unity-webgl";

const useUnity = ({ scenePrefix, scene, iteration, project, setLoaded }) => {
	const [unityContext, setUnityContext] = useState(
		new UnityContext({
			loaderUrl: `/${project}/unity-build/Build.loader.js`,
			dataUrl: `/${project}/unity-build/Build.data`,
			frameworkUrl: `/${project}/unity-build/Build.framework.js`,
			codeUrl: `/${project}/unity-build/Build.wasm`,
			productName: "Simulation",
			productVersion: "0.1",
			companyName: "CreateBase",
			// streamingAssetsUrl: "StreamingAssets",
			// matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
			// devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
		})
	);
	const [sensorData, setSensorData] = useState();
	const [gameState, setGameState] = useState();

	useEffect(() => {
		unityContext.on("GetSensorData", (sensorData) => {
			setSensorData(sensorData);
		});
	}, []);

	useEffect(() => {
		unityContext.on("GetGameState", (gameState) => {
			setGameState(gameState);
		});
	}, []);

	const sceneName = scene === "manual" || scene === "improve" ? `${scenePrefix}_${iteration},${scene}` : `${scenePrefix}_${iteration}`;

	console.log(sceneName);

	useEffect(() => {
		unityContext.on("loaded", () => {
			setTimeout(() => {
				unityContext.send("SceneController", "LoadScene", sceneName);
				console.log("scene changed");
				setTimeout(() => {
					setLoaded(true);
				}, 50);
			}, 100);
		});
	}, []);

	useEffect(() => {
		return () => {
			unityContext.removeAllEventListeners();
			setLoaded(true);
		};
	}, []);

	const resetScene = () => {
		unityContext.send("SceneController", "ResetScene");
	};

	return [unityContext, sensorData, gameState, resetScene];
};

export default useUnity;
