import { useEffect, useState } from "react";
import { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "/send-it/unity-build/Build.loader.js",
  dataUrl: "/send-it/unity-build/Build.data",
  frameworkUrl: "/send-it/unity-build/Build.framework.js",
  codeUrl: "/send-it/unity-build/Build.wasm",
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
      setTimeout(() => {
        unityContext.send(
          "SceneController",
          "LoadScene",
          "Project_Jump_0," + scene
        );
      }, 1000);
    });
  }, []);

  useEffect(() => {
    return () => unityContext.removeAllEventListeners();
  }, []);

  const resetScene = () => {
    unityContext.send("SceneController", "ResetScene");
  };

  return [unityContext, sensorData, gameState, resetScene];
};

export default useUnity;
