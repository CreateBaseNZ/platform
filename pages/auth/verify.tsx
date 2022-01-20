import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect } from "react";
import VerifyForm from "../../components/Auth/VerifyForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import GlobalSessionContext from "../../store/global-session-context";

const Verify = (): JSX.Element | null => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (globalSession.loaded && globalSession.verified) return void router.replace("/");
	}, [globalSession, router]);

	if (!globalSession.loaded || globalSession.verified) return null;

	return (
		<>
			<Head>
				<title>Verify | CreateBase</title>
				<meta name="description" content="Verify your CreateBase account" />
			</Head>
			{router.isReady && globalSession.loaded && <VerifyForm routerCode={router.query.code as string} routerEmail={router.query.email as string} />}
		</>
	);
};

Verify.getLayout = (page: ReactElement) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Verify;
