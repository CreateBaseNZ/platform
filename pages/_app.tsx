import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { GlobalSessionContextProvider } from "../store/global-session-context";
import { VisualBellContextProvider } from "../store/visual-bell-context";
import { ClassesContextProvider } from "../store/classes-context";
import { MainLayoutContextProvider } from "../store/main-layout-context";
import VisualBell from "../components/VisualBell";
import MobileView from "../components/MobileView/MobileView";
import AuthGuard from "../components/Auth/AuthGuard";

import "../styles/globals.scss";
import styles from "../styles/_exports.module.scss";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
	auth?: "user" | "staff";
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<SessionProvider session={session}>
			<VisualBellContextProvider>
				<GlobalSessionContextProvider>
					<ClassesContextProvider>
						<MainLayoutContextProvider>
							<div id="modal-root" />
							<NextNProgress color="#772eff" options={{ showSpinner: false }} />
							{Component.auth ? <AuthGuard auth={Component.auth}>{getLayout(<Component {...pageProps} />)}</AuthGuard> : getLayout(<Component {...pageProps} />)}
							<MobileView />
							<VisualBell />
						</MainLayoutContextProvider>
					</ClassesContextProvider>
				</GlobalSessionContextProvider>
			</VisualBellContextProvider>
		</SessionProvider>
	);
};

export default MyApp;
