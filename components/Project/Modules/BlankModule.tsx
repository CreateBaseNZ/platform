import Image from "next/image";
import classes from "./BlankModule.module.scss";

const BlankModule = (): JSX.Element => {
	return (
		<div className={classes.container}>
			<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/blank-module.svg" height={400} width={400} alt="Select a module" />
			<p>Click on a module on the left to get started</p>
		</div>
	);
};

export default BlankModule;
