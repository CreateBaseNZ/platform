import Image from "next/image";

import classes from "./NoModule.module.scss";

const NoModule = (): JSX.Element => {
	return (
		<div className={classes.container}>
			<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/no-module.svg" height={400} width={400} alt="Select a module" />
			<p>No modules here, move onto the next step!</p>
		</div>
	);
};

export default NoModule;
