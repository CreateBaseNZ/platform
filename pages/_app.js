import { useState, Fragment } from "react";
import { useEffect } from "react";
import LoadingScreen from "../components/UI/Loading";
import { Provider } from "next-auth/client";
import Image from "next/image";

import "../styles/globals.scss";
import { VisualBellContextProvider } from "../store/visual-bell-context";
import VisualBell from "../components/VisualBell";
import { InviteOrgContextProvider } from "../store/invite-org-context";

function MyApp({ Component, pageProps }) {
	const [loaded, setLoaded] = useState(false);
	const [blockView, setBlockView] = useState(true);

	console.log(blockView);

	useEffect(() => {
		console.log(window);
		if (window && !window.matchMedia("only screen and (max-width: 760px)").matches) {
			setBlockView(false);
		}
	}, []);

	return (
		<Provider session={pageProps.session}>
			<VisualBellContextProvider>
				<InviteOrgContextProvider>
					<div id="modal-root"></div>
					<div id="ctx-menu-root"></div>
					{blockView && (
						<div className="mobileView">
							<h1>
								We're sorry but <br />
								<b>mobile view is currently unsupported.</b>
							</h1>
							<h2>To enjoy our platform, try viewing it on a desktop device or laptop.</h2>
							<h3>
								While you're here, why not check out our <a href="https://createbase.co.nz/">website</a>, which{" "}
								<b>
									<em>is</em>
								</b>{" "}
								supported on all devices 👏
							</h3>
							<img src="/mobile.png" />
						</div>
					)}
					{!loaded && <LoadingScreen />}
					{!blockView && <Component {...pageProps} setLoaded={setLoaded} />}
				</InviteOrgContextProvider>
				<VisualBell />
			</VisualBellContextProvider>
		</Provider>
	);
}

export default MyApp;
