import router from "next/router";
import { useContext, useEffect, useState } from "react";
import GlobalSessionContext from "../store/global-session-context";
import useApi from "./useApi";

const useClass = () => {
	const post = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	const [classObject, setClassObject] = useState({});
	const [classLoaded, setClassLoaded] = useState(false);

	useEffect(async () => {
		if (router?.query?.id) {
			await post({
				route: "/api/classes/fetch-one",
				input: { profileId: globalSession.profileId, schoolId: globalSession.groups[globalSession.recentGroups[0]].id, classId: router.query.id },
				failHandler: (data) => {
					if (data.content === "not found") {
						router.replace("/404");
					}
				},
				successHandler: (data) => {
					setClassObject(data.content);
					setClassLoaded(true);
				},
			});
		}
	}, [router]);

	return { classObject, setClassObject, classLoaded };
};

export default useClass;
