import { memo, useEffect, useRef } from "react";

import FilterNoneIcon from "@material-ui/icons/FilterNone";
import CallToActionOutlinedIcon from "@material-ui/icons/CallToActionOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import classes from "./FlowContextMenu.module.scss";

export const NodeContextMenu = memo(({ show, x, y, blurHandler }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <div
      className={`${classes.contextMenu} ${classes.nodeContext}`}
      style={{ display: !show && "none", top: y, left: x }}
      tabIndex={0}
      onBlur={blurHandler}
      ref={ref}
    >
      <button>
        <span className={classes.item}>
          <CallToActionOutlinedIcon /> Select
        </span>
        <span className={classes.hotkey}>Left Click</span>
      </button>
      <button>
        <span className={classes.item}>
          <FilterNoneIcon /> Copy
        </span>
        <span className={classes.hotkey}>Ctrl+C</span>
      </button>
      <button>
        <span className={classes.item}>
          <DeleteOutlinedIcon />
          Delete
        </span>
        <span className={classes.hotkey}>Backspace</span>
      </button>
    </div>
  );
});

export const PaneContextMenu = memo(() => {
  return (
    <div className={`${classes.contextMenu} ${classes.paneContext}`}></div>
  );
});
