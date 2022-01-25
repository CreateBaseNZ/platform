import { ReactElement } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { GlobalSessionContextProvider } from "../store/global-session-context";
import { VisualBellProvider } from "../store/visual-bell-context";
import { MainLayoutContextProvider } from "../store/main-layout-context";
import VisualBell from "../components/VisualBell";
import MobileView from "../components/MobileView/MobileView";
import AuthGuard from "../components/Auth/AuthGuard";

import "../styles/globals.scss";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement, data: any) => JSX.Element;
	auth?: "user" | "staff";
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

/**
 * @ignore
 */
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<SessionProvider session={session}>
			<VisualBellProvider>
				<GlobalSessionContextProvider>
					<MainLayoutContextProvider>
						<div id="modal-root" />
						<NextNProgress color="#772eff" options={{ showSpinner: false }} />
						{Component.auth ? <AuthGuard auth={Component.auth}>{getLayout(<Component {...pageProps} />, pageProps)}</AuthGuard> : getLayout(<Component {...pageProps} />, pageProps)}
						<MobileView />
						<VisualBell />
					</MainLayoutContextProvider>
				</GlobalSessionContextProvider>
			</VisualBellProvider>
		</SessionProvider>
	);
};

export default MyApp;
