import { Fragment } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <div id="modal-root"></div>
      <div id="ctx-menu-root"></div>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
