import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import classes from "./Define.module.scss";
import ModuleContainer from "../UI/ModuleContainer";

// const PdfViewer = dynamic(() => import("../UI/PdfViewer"), { ssr: false });

const Define = ({ data, caption }) => {
	const [active, setActive] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const cardClickHandler = (i) => {
		setLoaded(false);
		setActive(i);
	};

	const loadHandler = () => setLoaded(true);

	return (
		<div className={classes.view}>
			<ModuleContainer active={active} clickHandler={cardClickHandler} modules={data} caption={caption} />
			<div className={classes.mainContainer}>
				{/* <PdfViewer file={data[active].url} /> */}
				<embed src={data[active].url} width="100%" height="100%" onLoad={loadHandler} />
				<div className={`${classes.loadScreen} ${loaded ? classes.loaded : ""}`} />
			</div>
		</div>
	);
};

export default Define;
