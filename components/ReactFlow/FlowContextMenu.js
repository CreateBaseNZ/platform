import { memo, useEffect, useRef } from "react";

import FilterNoneIcon from "@material-ui/icons/FilterNone";
import CallToActionOutlinedIcon from "@material-ui/icons/CallToActionOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import classes from "./FlowContextMenu.module.scss";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import UndoOutlinedIcon from "@material-ui/icons/UndoOutlined";
import RedoOutlinedIcon from "@material-ui/icons/RedoOutlined";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import SelectAllOutlinedIcon from "@material-ui/icons/SelectAllOutlined";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import CropFreeOutlinedIcon from "@material-ui/icons/CropFreeOutlined";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

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
    selectAllHandler,
    clearAllHandler,
  }) => {
    const ref = useRef();

    useEffect(() => {
      ref.current.focus();
    });

    let alignBottom = false;
    if (document.body.clientHeight - y < 160) {
      alignBottom = document.body.clientHeight - y;
    }
    let alignRight = false;
    if (document.body.clientWidth - x < 230) {
      alignRight = document.body.clientWidth - x;
    }

    return (
      <div
        className={classes.contextMenu}
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
        <div className={classes.divider} />
        <button onMouseDown={selectAllHandler}>
          <span className={classes.item}>
            <SelectAllOutlinedIcon />
            Select All
          </span>
          <span className={classes.hotkey}>Ctrl+A</span>
        </button>
        <button onMouseDown={clearAllHandler}>
          <span className={classes.item}>
            <BackspaceOutlinedIcon />
            Clear All
          </span>
          <span className={classes.hotkey}>Ctrl+B</span>
        </button>
      </div>
    );
  }
);

export const PaneContextMenu = memo(
  ({
    show,
    x,
    y,
    allowUndo,
    allowRedo,
    flowLocked,
    blurHandler,
    undoHandler,
    redoHandler,
    saveHandler,
    restoreHandler,
    fitViewHandler,
    captureHandler,
    lockHandler,
    infoHandler,
  }) => {
    const ref = useRef();
    useEffect(() => {
      ref.current.focus();
    });

    let alignBottom = false;
    if (document.body.clientHeight - y < 250) {
      alignBottom = document.body.clientHeight - y;
    }
    let alignRight = false;
    if (document.body.clientWidth - x < 230) {
      alignRight = document.body.clientWidth - x;
    }

    return (
      <div
        className={classes.contextMenu}
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
        <button
          className={allowUndo ? "" : classes.deactive}
          onMouseDown={undoHandler}
        >
          <span className={classes.item}>
            <UndoOutlinedIcon /> Undo
          </span>
          <span className={classes.hotkey}>Ctrl+Z</span>
        </button>
        <button
          className={allowRedo ? "" : classes.deactive}
          onMouseDown={redoHandler}
        >
          <span className={classes.item}>
            <RedoOutlinedIcon /> Redo
          </span>
          <span className={classes.hotkey}>Ctrl+Y</span>
        </button>
        <button onMouseDown={saveHandler}>
          <span className={classes.item}>
            <SaveOutlinedIcon />
            Save
          </span>
          <span className={classes.hotkey}>Ctrl+S</span>
        </button>
        <button onMouseDown={restoreHandler}>
          <span className={classes.item}>
            <RestoreOutlinedIcon />
            Restore
          </span>
          <span className={classes.hotkey}>Ctrl+R</span>
        </button>
        <div className={classes.divider} />
        <button onMouseDown={fitViewHandler}>
          <span className={classes.item}>
            <CropFreeOutlinedIcon />
            Fit View
          </span>
          <span className={classes.hotkey}>Space</span>
        </button>
        <button onMouseDown={captureHandler}>
          <span className={classes.item}>
            <CameraAltOutlinedIcon />
            Capture
          </span>
          <span className={classes.hotkey}>Ctrl+G</span>
        </button>
        <button onMouseDown={lockHandler}>
          <span className={classes.item}>
            {flowLocked ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
            {flowLocked ? "Unlock" : "Lock"}
          </span>
          <span className={classes.hotkey}>Ctrl+L</span>
        </button>
        <div className={classes.divider} />
        <button onMouseDown={infoHandler}>
          <span className={classes.item}>
            <InfoOutlinedIcon />
            Info
          </span>
        </button>
      </div>
    );
  }
);
