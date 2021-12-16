import Image from "next/image";
import { LoginForm } from "./LoginForm";
import Img from "../UI/Img";
import SignupForm from "./SignupForm";

import classes from "./AuthCard.module.scss";

const AuthCard = ({ isSignup }) => {
	return (
		<div className={classes.authCard}>
			<div className={`${classes.imgContainer} ${isSignup ? classes.signup : classes.login}`}>
				<div className={classes.imgWrapper}>
					<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/auth/turtle.svg" layout="fill" objectFit="cover" />
					<div className={isSignup ? classes.signupImg : classes.loginImg} style={{ marginLeft: "-10%", height: "100%", width: "140%" }}>
						<Img
							src={isSignup ? "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/auth/signup.svg" : "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/auth/login.svg"}
							layout="fill"
							objectFit="contain"
							label="Illustration by Storyset"
						/>
					</div>
				</div>
			</div>
			<div className={`${classes.formContainer} roundScrollbar`}>{isSignup ? <SignupForm /> : <LoginForm />}</div>
		</div>
	);
};

export default AuthCard;
