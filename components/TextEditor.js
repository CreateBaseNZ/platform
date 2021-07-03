import { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

// import themes from "/utils/themes";

import classes from "./TextEditor.module.scss";

const TextEditor = (props) => {
  const editorRef = useRef();
  const monacoRef = useRef();

  // const [monacoTheme, setMonacoTheme] = useState("Monokai");
  // console.log(monacoTheme);

  const handleEditorDidMount = (editor, monaco) => {
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
  };

  return (
    <div
      className={`${classes.editorContainer} ${
        props.mode === "testing" || props.mode === "verifying"
          ? classes.disable
          : ""
      } ${props.show ? "" : "hide"}`}
    >
      <Editor
        defaultLanguage="javascript"
        value={props.code}
        onMount={handleEditorDidMount}
        className={classes.editor}
        theme={"vs-dark"}
        options={editorOptions}
      />
    </div>
  );
};

export default TextEditor;
