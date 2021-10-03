import { useState } from "react";
import classes from "./Define.module.scss";
import ModuleContainer from "../UI/ModuleContainer";

const Define = ({ data }) => {
	const [active, setActive] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const cardClickHandler = (i) => {
		console.log(i);
		if (i !== active) {
			setLoaded(false);
			setActive(i);
		}
	};

	const loadHandler = () => setLoaded(true);

	return (
		<div className={classes.view}>
			<ModuleContainer active={active} clickHandler={cardClickHandler} modules={data.modules} caption={data.caption} />
			<div className={classes.mainContainer}>
				<embed src={data.modules[active].url} width="100%" height="100%" onLoad={loadHandler} />
				<div className={`${classes.loadScreen} ${loaded ? classes.loaded : ""}`} />
			</div>
		</div>
	);
};

export default Define;
