import Image from "next/image";
import { LoginForm } from "./LoginForm";
import Img from "../UI/Img";
import SignupForm from "./SignupForm";

import classes from "./AuthentCard.module.scss";

const AuthentCard = ({ isSignup }) => {
	return (
		<>
			<div className={`${classes.imgContainer} ${isSignup ? classes.signup : classes.login}`}>
				<div className={classes.imgWrapper}>
					<Image src="/auth/turtle.svg" layout="fill" objectFit="cover" />
					<div style={{ marginLeft: "-10%", height: "100%", width: "140%" }}>
						<Img
							src={isSignup ? "/auth/signup.svg" : "/auth/login.svg"}
							layout="fill"
							objectFit="contain"
							style={{ transform: isSignup ? "rotate(-45deg) scaleX(-1) translate(-2%, -8%)" : "scaleX(-1)" }}
						/>
					</div>
				</div>
			</div>
			<div className={`${classes.formContainer} roundScrollbar`}>{isSignup ? <SignupForm /> : <LoginForm />}</div>
		</>
	);
};

export default AuthentCard;
