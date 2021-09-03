import { useState, Fragment } from "react";
import LoadingScreen from "../components/UI/Loading";
import { Provider } from "next-auth/client";

import "../styles/globals.scss";
import { VisualBellContextProvider } from "../store/visual-bell-context";
import VisualBell from "../components/VisualBell";

function MyApp({ Component, pageProps }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<Provider session={pageProps.session}>
			<VisualBellContextProvider>
				<div id="modal-root"></div>
				<div id="ctx-menu-root"></div>
				{!loaded && <LoadingScreen />}
				<Component {...pageProps} setLoaded={setLoaded} />
				<VisualBell />
			</VisualBellContextProvider>
		</Provider>
	);
}

export default MyApp;
