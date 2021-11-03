import { useRouter } from "next/router";

const ClassesTabRoot = () => {
	const router = useRouter();

	if (router.query.id) router.replace({ pathname: "/classes/[id]/announcements", query: { id: router.query.id } });

	return null;
};

ClassesTabRoot.auth = "user";

export default ClassesTabRoot;
