import { memo, useRef } from "react";
import Editor, { editorOptions } from "@monaco-editor/react";
import classes from "./Config.module.scss";

const lorem = `const btn = document.getElementById('btn')
let count = 0

function render() {
  btn.innerText = \`Count: \${count}\`
}

btn.addEventListener('click', () => {
  // Count from 1 to 10.
  if (count < 10) {
    count += 1
    render()
  }
})`;

const Config = (props) => {
  const monacoRef = useRef();

  const editorDidMount = (editor, monaco) => {
    monacoRef.current = monaco;
    // monacoRef.current.editor.updateOptions({ tabSize: 4 });
    console.log(monacoRef);
    const theme = localStorage.getItem("monaco-theme");
    if (theme) {
      monacoRef.current.editor.setTheme(theme);
    } else {
      monacoRef.current.editor.setTheme("Dark");
      localStorage.setItem("monaco-theme", "Dark");
    }
    setTimeout(() => {
      monacoRef.current.editor.remeasureFonts();
    }, [500]);
  };

  return (
    <div className={`${classes.config} ${props.show ? "" : "hide"}`}>
      <div className={classes.editorWrapper}>
        <Editor
          defaultLanguage="javascript"
          value={lorem}
          onMount={editorDidMount}
          options={editorOptions}
        />
      </div>
    </div>
  );
};

export default memo(Config);
