import { memo, useEffect, useRef, useState } from "react";
import Editor, { editorOptions } from "@monaco-editor/react";
import classes from "./Config.module.scss";

import themes, { themeFiles } from "../utils/themes";

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
  const [hoveredTheme, setHoveredTheme] = useState();

  useEffect(() => {
    if (monacoRef.current) {
      if (hoveredTheme) {
        monacoRef.current.editor.setTheme(hoveredTheme);
      } else {
        monacoRef.current.editor.setTheme(props.theme);
      }
    }
  }, [props.theme, monacoRef.current, hoveredTheme]);

  const editorDidMount = (editor, monaco) => {
    monacoRef.current = monaco;
    monacoRef.current.editor.setTheme(props.theme);
  };

  const mouseEnterHandler = (theme, foreground, background, event) => {
    event.target.style.color = foreground;
    event.target.style.backgroundColor = background;
    setHoveredTheme(theme.replace(/([\ +'])/g, ""));
  };

  const mouseLeaveHandler = (e) => {
    e.target.style.color = null;
    e.target.style.backgroundColor = null;
    setHoveredTheme(props.theme);
  };

  const clickHandler = (theme) => {
    props.setTheme(theme.replace(/([\ +'])/g, ""));
  };

  const themeOptions = (category) => {
    return (
      <div className={classes.themeOptions}>
        <h4>{category}</h4>
        {themes[category].map((t) => {
          const themeName = t.replace(/([\ +'])/g, "");
          return (
            <div
              key={t}
              title={t}
              className={props.theme === themeName ? classes.selectedTheme : ""}
              onMouseEnter={mouseEnterHandler.bind(
                this,
                t,
                themeFiles[themeName].colors["editor.foreground"],
                themeFiles[themeName].colors["editor.background"]
              )}
              onMouseLeave={mouseLeaveHandler}
              onClick={clickHandler.bind(this, t)}
            >
              {t}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`${classes.config} ${props.show ? "" : "hide"}`}>
      <div className={classes.themeSelect}>
        <div className={classes.configEditorWrapper}>
          <Editor
            defaultLanguage="javascript"
            value={lorem}
            onMount={editorDidMount}
            options={editorOptions}
          />
        </div>
        {themeOptions("Light Themes")}
        {themeOptions("Dark Themes")}
        {themeOptions("Funky Themes")}
      </div>
    </div>
  );
};

export default memo(Config);
