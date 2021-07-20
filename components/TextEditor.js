import { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

// import themes from "/utils/themes";

import classes from "./TextEditor.module.scss";

const TextEditor = (props) => {
  const editorRef = useRef();
  const monacoRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  }, [props.text]);

  useEffect(() => {
    console.log(document.querySelector(".overflow-guard"));
  }, []);

  // const [monacoTheme, setMonacoTheme] = useState("Monokai");
  // console.log(monacoTheme);

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  // const themeOptions = Object.keys(themes).map((key) => {
  //   return <button key={key}> {key} </button>;
  // });

  const editorOptions = {
    automaticLayout: true,
    wordWrap: "on",
    wrappingStrategy: "advanced",
    folding: true,
    foldingStrategy: "indentation",
    formatOnPaste: true,
  };

  return (
    <div className={`${classes.editorContainer} ${props.show ? "" : "hide"}`}>
      <Editor
        defaultLanguage="javascript"
        value={props.text}
        onMount={editorDidMount}
        theme={"vs-dark"}
        options={editorOptions}
      />
    </div>
  );
};

export default TextEditor;
