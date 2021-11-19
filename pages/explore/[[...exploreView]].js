// TODO explore page

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import classes from "/styles/exploreView.module.scss";
import Boost from "../../components/Minigames/Boost";

const ExploreView = ({ setLoaded }) => {
	const router = useRouter();
	const [view, setView] = useState();

	useEffect(() => {
		if (Object.keys(router.query).length) {
			setView(router.query.exploreView[0]);
		} else {
			setView("explore");
		}
	}, [router.query]);

	return (
		<div className={classes.exploreView}>
			{view === "comparison-boost" && <Boost mode="Comparison" setLoaded={setLoaded} />}
			{view === "if-boost" && <Boost mode="If" setLoaded={setLoaded} />}
			{view === "while-boost" && <Boost mode="While" setLoaded={setLoaded} />}
			{view === "explore" && <div></div>}
		</div>
	);
};

export default ExploreView;
