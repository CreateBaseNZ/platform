import router from "next/router";

const ClassesTabRoot = () => {
	if (router.query?.id) router.replace({ pathname: "/classes/[id]/announcements", query: { id: router.query.id } });

	return null;
};

ClassesTabRoot.auth = "user";

export default ClassesTabRoot;
