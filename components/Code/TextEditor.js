import { useRef, useEffect, useState } from "react";
import { memo } from "react";
import Editor from "@monaco-editor/react";

import { themeFiles } from "/utils/themes";

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
  readOnly: true,
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
    for (const t in themeFiles) {
      monacoRef.current.editor.defineTheme(t, themeFiles[t]);
    }
    monacoRef.current.editor.setTheme(props.theme);
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
