import { useEffect, useState } from "react";
import { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "/games/Build.loader.js",
  dataUrl: "/games/Build.data",
  frameworkUrl: "/games/Build.framework.js",
  codeUrl: "/games/Build.wasm",
  productName: "Simulation",
  productVersion: "0.1",
  companyName: "CreateBase",
  // streamingAssetsUrl: "StreamingAssets",
  // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
  // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
});

const useUnity = ({ scene }) => {
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

  useEffect(() => {
    unityContext.on("loaded", () => {
      unityContext.send(
        "SceneController",
        "LoadScene",
        "Project_Jump_0," + scene
      );
    });
    return () => unityContext.removeAllEventListeners();
  }, []);

  const resetScene = () => {
    unityContext.send("SceneController", "ResetScene");
  };

  return [unityContext, sensorData, gameState, resetScene];
};

export default useUnity;
