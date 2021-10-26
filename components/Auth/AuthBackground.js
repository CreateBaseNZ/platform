import { ColourLogo } from "../UI/Icons";
import Image from "next/image";
import classes from "./AuthBackground.module.scss";

const AuthBackground = ({ children }) => {
	return (
		<div className={classes.bg}>
			<div className={classes.squiggle}>
				<div>
					<Image src="/auth/squiggle-thin.svg" layout="fill" objectFit="contain" />
				</div>
			</div>
			<div className={`${classes.squiggle} ${classes.squiggle2}`}>
				<div>
					<Image src="/auth/squiggle-thin.svg" layout="fill" objectFit="contain" />
				</div>
			</div>
			<div className={classes.triangle} />
			<p className={classes.copy}>&copy; CreateBase 2021</p>
			<div className={classes.logo}>
				<ColourLogo />
			</div>
			{children}
		</div>
	);
};

export default AuthBackground;
