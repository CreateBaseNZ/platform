import { memo, useEffect, useRef } from "react";

import FilterNoneIcon from "@material-ui/icons/FilterNone";
import CallToActionOutlinedIcon from "@material-ui/icons/CallToActionOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import classes from "./FlowContextMenu.module.scss";

export const NodeContextMenu = memo(
  ({
    show,
    x,
    y,
    node,
    blurHandler,
    selectHandler,
    copyHandler,
    deleteHandler,
  }) => {
    const ref = useRef();

    useEffect(() => {
      ref.current.focus();
    });

    let alignBottom = false;
    if (document.body.clientHeight - y < 100) {
      alignBottom = document.body.clientHeight - y;
    }
    let alignRight = false;
    if (document.body.clientWidth - x < 230) {
      alignRight = document.body.clientWidth - x;
    }

    return (
      <div
        className={`${classes.contextMenu} ${classes.nodeContext}`}
        style={{
          display: !show && "none",
          top: !alignBottom && y,
          left: !alignRight && x,
          bottom: alignBottom && alignBottom,
          right: alignRight && alignRight,
        }}
        tabIndex={0}
        onBlur={blurHandler}
        ref={ref}
      >
        <button onMouseDown={() => selectHandler(node)}>
          <span className={classes.item}>
            <CallToActionOutlinedIcon /> Select
          </span>
          <span className={classes.hotkey}>Left Click</span>
        </button>
        <button onMouseDown={() => copyHandler([node])}>
          <span className={classes.item}>
            <FilterNoneIcon /> Copy
          </span>
          <span className={classes.hotkey}>Ctrl+C</span>
        </button>
        <button onMouseDown={() => deleteHandler([node])}>
          <span className={classes.item}>
            <DeleteOutlinedIcon />
            Delete
          </span>
          <span className={classes.hotkey}>Backspace</span>
        </button>
      </div>
    );
  }
);

export const PaneContextMenu = memo(() => {
  return (
    <div className={`${classes.contextMenu} ${classes.paneContext}`}></div>
  );
});
