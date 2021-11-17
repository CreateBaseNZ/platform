import Image from "next/image";
import { ColourLogo } from "../../UI/Icons";
import classes from "./AuthLayout.module.scss";

const AuthLayout = ({ children }) => {
	return (
		<div className={classes.bg}>
			<div className={classes.squiggle}>
				<div>
					<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/auth/squiggle-thin.svg" layout="fill" objectFit="contain" />
				</div>
			</div>
			<div className={`${classes.squiggle} ${classes.squiggle2}`}>
				<div>
					<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/auth/squiggle-thin.svg" layout="fill" objectFit="contain" />
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

export default AuthLayout;
