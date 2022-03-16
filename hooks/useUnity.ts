import router from "next/router";
import { useEffect, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import { install } from "resize-observer";

interface Props {
	index: number;
	project: string;
	scenePrefix: string;
	setLoaded: any; // TODO
	suffix: string;
	wip?: boolean;
}

const useUnity = ({ scenePrefix, suffix, index, project, wip = false, setLoaded }: Props) => {
	const [unityContext, setUnityContext] = useState(
		new UnityContext({
			loaderUrl: wip ? `/${project}/unity-build/Build.loader.js` : `https://cdn.statically.io/gh/CreateBaseNZ/public/main/${project}/unity-build/Build.loader.js`,
			dataUrl: wip ? `/${project}/unity-build/Build.data` : `https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/${project}/unity-build/Build.data`,
			frameworkUrl: wip ? `/${project}/unity-build/Build.framework.js` : `https://cdn.statically.io/gh/CreateBaseNZ/public/main/${project}/unity-build/Build.framework.js`,
			codeUrl: wip ? `/${project}/unity-build/Build.wasm` : `https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/${project}/unity-build/Build.wasm`,
			productName: "Simulation",
			productVersion: "0.1",
			companyName: "CreateBase",
			// streamingAssetsUrl: "StreamingAssets",
			// matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
			// devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
		})
	);
	const [sensorData, setSensorData] = useState();
	const [gameState, setGameState] = useState("");

	useEffect(() => {
		const canvas = document.createElement("canvas");
		// Get WebGLRenderingContext from canvas element.
		const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		if (!gl || !(gl instanceof WebGLRenderingContext)) {
			return void router.push("/unsupported");
		}
		install();
		unityContext.on("GetSensorData", (sensorData) => {
			setSensorData(sensorData);
		});
		unityContext.on("GetGameState", (gameState) => {
			setGameState(gameState);
		});
	}, []);

	useEffect(() => {
		console.log("loading");
		const sceneName = suffix ? `${scenePrefix}_${index},${suffix}` : `${scenePrefix}_${index}`;

		unityContext.on("loaded", () => {
			setTimeout(() => {
				unityContext.send("SceneController", "LoadScene", sceneName);
				setTimeout(() => {
					console.log("true state");
					setLoaded(true);
				}, 50);
			}, 100);
		});
	}, []);

	useEffect(() => {
		return () => unityContext.removeAllEventListeners();
	}, [unityContext]);

	const resetScene = () => {
		unityContext.send("SceneController", "ResetScene");
	};

	return [unityContext, sensorData, gameState, resetScene] as const;
};

export default useUnity;
