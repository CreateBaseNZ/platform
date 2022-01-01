import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect } from "react";
import VerifyForm from "../../components/Auth/VerifyForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import GlobalSessionContext from "../../store/global-session-context";

const Verify = (): JSX.Element | null => {
	const router = useRouter();
	const { loaded, globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (loaded && globalSession.verified) return void router.replace("/");
	}, [globalSession]);

	if (!loaded || globalSession.verified) return null;

	return (
		<>
			<Head>
				<title>Verify | CreateBase</title>
				<meta name="description" content="Verify your CreateBase account" />
			</Head>
			{router.isReady && loaded && <VerifyForm routerCode={router.query.code} routerEmail={router.query.email} />}
		</>
	);
};

Verify.getLayout = (page: ReactElement) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Verify;
