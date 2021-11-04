import router from "next/router";
import { useEffect, useState } from "react";

const useClass = () => {
	const [classObject, setClassObject] = useState({});

	useEffect(() => {
		if (router?.query?.id) {
			// TODO query class data
			setClassObject({ name: "Testing" });
		}
	}, [router]);

	return { classObject, setClassObject };
};

export default useClass;
