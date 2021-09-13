import { useEffect } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";

import classes from "./Modal.module.scss";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeHandler}></div>;
};

const Overlay = (props) => {
  return <div className={classes.overlay}>{props.children}</div>;
};

const Modal = ({ children, closeHandler }) => {
  useEffect(() => {
    if (document) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  });
  return (
    <ClientOnlyPortal selector="#modal-root">
      <Backdrop closeHandler={closeHandler} />
      <Overlay children={children} />
    </ClientOnlyPortal>
  );
};

export default Modal;
