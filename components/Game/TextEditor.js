import { useRef, useEffect, useState, forwardRef } from "react";
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
  readOnly: false,
};

const TextEditor = forwardRef((props, ref) => {
  const monacoRef = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.updateOptions({ readOnly: false });
      ref.current
        .getAction("editor.action.formatDocument")
        .run()
        .then(() => ref.current.updateOptions({ readOnly: false }));
    }
  }, [props.text]);

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(props.theme);
    }
  }, [props.theme]);

  const editorDidMount = (editor, monaco) => {
    ref.current = editor;
    monacoRef.current = monaco;
    for (const t in themeFiles) {
      monacoRef.current.editor.defineTheme(t, themeFiles[t]);
    }
    monacoRef.current.editor.setTheme(props.theme);
  };

  return (
    <div className={`${classes.editorContainer} ${props.show ? "" : "hide"}`}>
      <Editor
        language="javascript"
        value={props.text}
        onMount={editorDidMount}
        options={editorOptions}
      />
    </div>
  );
});

export default memo(TextEditor);
