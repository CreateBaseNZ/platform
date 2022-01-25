import Image from "next/image";
import { TutModule } from "../../types/modules";
import classes from "./TutorialModule.module.scss";

interface Props {
	module: TutModule;
}

const TutorialModule = ({ module }: Props): JSX.Element => {
	return (
		<div className={classes.container}>
			{module.items.map((gif, i) => (
				<div key={i} className={classes.item}>
					<Image src={gif.src} layout="responsive" width={600} height={338} alt={gif.caption} title={gif.caption} />
					<p>{gif.caption}</p>
				</div>
			))}
		</div>
	);
};

export default TutorialModule;
