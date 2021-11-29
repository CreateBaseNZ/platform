// TODO explore page

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import classes from "/styles/exploreView.module.scss";
import Boost from "../../components/Minigames/Boost";

const ExploreView = () => {
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
			{view === "comparison-boost" && <Boost mode="Comparison" />}
			{view === "if-boost" && <Boost mode="If" />}
			{view === "while-boost" && <Boost mode="While" />}
			{view === "explore" && <div></div>}
		</div>
	);
};

export default ExploreView;
