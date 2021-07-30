import { Fragment, useState } from "react";
import LoadingScreen from "../components/UI/Loading";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Fragment>
      <div id="modal-root"></div>
      <div id="ctx-menu-root"></div>
      {!loaded && <LoadingScreen />}
      <Component {...pageProps} setLoaded={setLoaded} />
    </Fragment>
  );
}

export default MyApp;
