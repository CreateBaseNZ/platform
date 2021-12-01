import useApi from "../hooks/useApi";
import router from "next/router";

function Error({ statusCode }) {
	return <p>{statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}</p>;
}

Error.getInitialProps = ({ res, err }) => {
	const { reportError } = useApi();
	reportError({ route: router.router, type: "runtime", metadata: err.toString() });

	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
