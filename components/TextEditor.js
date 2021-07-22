import { useRef, useEffect, useState } from "react";
import { memo } from "react";
import Editor from "@monaco-editor/react";

import { darkThemes, lightThemes, funkyThemes } from "/utils/themes";

import classes from "./TextEditor.module.scss";

export const editorOptions = {
  automaticLayout: true,
  wordWrap: "on",
  wrappingStrategy: "advanced",
  folding: true,
  foldingStrategy: "indentation",
  formatOnPaste: true,
  fontSize: 14,
  fontFamily: "JetBrains Mono, mono",
};

const TextEditor = (props) => {
  const editorRef = useRef();
  const monacoRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  }, [props.text]);

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(props.theme);
    }
  }, [props.theme]);

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    for (const t in darkThemes) {
      monacoRef.current.editor.defineTheme(t, darkThemes[t]);
    }
    for (const t in lightThemes) {
      monacoRef.current.editor.defineTheme(t, lightThemes[t]);
    }
    for (const t in funkyThemes) {
      monacoRef.current.editor.defineTheme(t, funkyThemes[t]);
    }
    const theme = localStorage.getItem("monaco-theme");
    if (theme) {
      monacoRef.current.editor.setTheme(theme);
    } else {
      monacoRef.current.editor.setTheme("Dark");
      localStorage.setItem("monaco-theme", "Dark");
    }
    // setTimeout(() => {
    //   monacoRef.current.editor.remeasureFonts();
    // }, [5000]);
  };

  return (
    <div className={`${classes.editorContainer} ${props.show ? "" : "hide"}`}>
      <Editor
        defaultLanguage="javascript"
        value={props.text}
        onMount={editorDidMount}
        options={editorOptions}
      />
    </div>
  );
};

export default memo(TextEditor);
