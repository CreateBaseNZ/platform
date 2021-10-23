import { useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { SecondaryButton } from "../components/UI/Buttons";
import { initSession } from "../utils/authHelpers";

import WhiteLogo, { FBIcon, IGIcon, TwitterIcon, YTIcon } from "/components/UI/Icons";

import axios from "axios";

import classes from "/styles/Index.module.scss";
import { useRouter } from "next/router";
import UserSessionContext from "../store/user-session";

// const Index = ({ setLoaded }) => {
// 	const { session, loading } = useSession();
// 	const [user, setUser] = useState({});
// 	const [showHelper, setShowHelper] = useState(false);

// 	useEffect(async () => {
// 		setLoaded(true);

// 		// EXAMPLE: Read organisation data for the admin console page
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/organisation/admin/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Read organisation data for the account settings page
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/organisation/read-account", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Read data
// 		// const input = { properties: ["displayName"], saves: ["test", "test2"] };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/profile/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Update data
// 		// const input = { date: new Date().toString(), displayName: "Test", saves: { test2: "test2" } };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/profile/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Delete data
// 		// const input = { date: new Date().toString(), saves: ["test2"] };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/profile/delete-saves", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Admin create an educator
// 		// const input = { username: "student1", password: "Student1!", status: "free", date: new Date().toString(), displayName: "Student One" };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/organisation/admin/create-learner", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/auth/account-verification-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// const input = { code: "JzwdoH" };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/auth/account-verify", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/auth/send-email-test", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// const input = { email: "carlvelasco96@gmail.com" };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/auth/reset-password-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	data = { status: "error", content: error };
// 		// }
// 		// if (data.status === "critical error") {
// 		// 	// Critical Error Handling
// 		// } else if (data.status === "error") {
// 		// 	// Error Handling
// 		// } else if (data.status === "failed") {
// 		// 	// Failed Handling
// 		// }

// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/signup/validate-username", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Retrieving user's username
// 		// const input = { properties: ["username"] };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/license/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Changing user's username
// 		// const input = { username: "carlvelasco", date: new Date().toString() };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/license/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	if (error.response) {
// 		// 		data = error.response.data;
// 		// 	} else if (error.request) {
// 		// 		data = { status: "error", content: error.request };
// 		// 	} else {
// 		// 		data = { status: "error", content: error.message };
// 		// 	}
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Sending Educators an Email Invitation
// 		// const input = { emails: ["carlvelasco96@gmail.com", "cvel317@aucklanduni.ac.nz", "brydonburnett@gmail.com"] };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/organisation/invite-educator/send", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	data = { status: "error", content: error };
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Joining an Organisation using the Invite Link
// 		// const input = {
// 		// 	email: "cvel317@aucklanduni.ac.nz",
// 		// 	eduCode: "m6S2Nn",
// 		// 	orgName: "Bream Bay College",
// 		// 	orgId: "20",
// 		// 	invCode: "Bvs6To",
// 		// 	date: new Date().toString(),
// 		// };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/organisation/invite-educator/join", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	data = { status: "error", content: error };
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Sending the request to join an organisation
// 		// const input = { orgId: "20", orgName: "Bream Bay College" };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/organisation/invite-educator/request", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	data = { status: "error", content: error };
// 		// }
// 		// console.log(data);

// 		// Accept request to join the organisation
// 		// const input = { email: "test1.createbase@gmail.com", eduCode: "m6S2Nn", orgName: "Bream Bay College", orgId: "20", joinCode: "S8DcNJ", date: new Date().toString() };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/organisation/invite-educator/accept", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	data = { status: "error", content: error };
// 		// }
// 		// console.log(data);

// 		// EXAMPLE: Change password of learner as admin or educator
// 		// const input = { username: "learner1", date: new Date().toString(), updates: { password: "123q!@#Q" } };
// 		// let data;
// 		// try {
// 		// 	data = (await axios.post("/api/organisation/admin/update-learner-license", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
// 		// } catch (error) {
// 		// 	data = { status: "error", content: error };
// 		// }
// 		// console.log(data);

// 		return () => setLoaded(false);
// 	}, []);

// 	useEffect(async () => {
// 		initSession(loading, session, setUser);
// 	}, [loading, session]);

// 	const helperClickHandler = () => {
// 		setShowHelper((state) => !state);
// 	};

// 	if (loading) return null;

// 	return (
// 		<div className={classes.index}>
// 			<Head>
// 				<title>Welcome | CreateBase</title>
// 				<meta name="description" content="Unleash your inner creator. CreateBase." />
// 			</Head>
// 			<div className={classes.bg}>
// 				<div style={{ height: "100%", width: "100%", position: "relative" }}>
// 					<Image src="/landing.png" layout="fill" objectFit="contain" quality={100} objectPosition={"75% 100%"} alt="Landing image" />
// 				</div>
// 			</div>
// 			<nav className={classes.nav}>
// 				<div className={classes.logo}>
// 					<WhiteLogo height={32} width={180} quality={100} />
// 				</div>
// 				<div className={classes.socials}>
// 					<FBIcon height={28} width={28} />
// 					<IGIcon height={28} width={28} />
// 					<TwitterIcon height={28} width={28} />
// 					<YTIcon height={28} width={28} />
// 				</div>
// 			</nav>
// 			<div className={classes.container}>
// 				<h2 className={classes.h2}>Welcome to the</h2>
// 				<h1 className={classes.h1}>
// 					Platform<div>Lite</div>
// 				</h1>
// 				{session ? (
// 					<div className={classes.btnContainer}>
// 						<SecondaryButton className={classes.signOut} mainLabel="Log out" onClick={() => signOut({ callbackUrl: `${window.location.origin}` })} />
// 						<Link href="/onboarding">
// 							<button className={classes.loggedIn}>Continue as {user.displayName}</button>
// 						</Link>
// 					</div>
// 				) : (
// 					<div className={classes.btnContainer}>
// 						<Link href="/auth/signup">
// 							<button className={classes.signUp}>Sign Up</button>
// 						</Link>
// 						<Link href="/auth/login">
// 							<button className={classes.logIn}>
// 								Log In<i className="material-icons-outlined">login</i>
// 							</button>
// 						</Link>
// 						<Link href="/home">
// 							<button className={classes.guest}>Continue as guest</button>
// 						</Link>
// 					</div>
// 				)}
// 			</div>
// 			<div className={classes.help}>
// 				<button className={showHelper ? classes.active : ""} onClick={helperClickHandler}>
// 					What's this?
// 					<i className="material-icons-outlined">close</i>
// 				</button>
// 				<p className={showHelper ? "" : classes.hide}>
// 					At CreateBase, we want to change the world by enabling the next generation of creators. That's why we're developing a project-centric educational platform to give people the skills, tools,
// 					and confidence to unleash their inner technology creator.
// 					<br />
// 					<br />
// 					You're about to experience a tiny portion of our final platform, something that we call a<span className={`${classes.italic} span`}>Project</span>. You'll be introduced to a situation and
// 					will need to apply skills and problem-solving to build a working solution. Your progress will be saved as you move through the Project, so feel free to take your time and, most importantly,
// 					have fun along the way.
// 					<br />
// 					<br />
// 					💜 Team CreateBase
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

const Index = () => {
	const router = useRouter();
	const { userSession } = useContext(UserSessionContext);

	console.log("index");

	useEffect(() => {
		if (userSession.email) {
			router.replace("/browse");
		} else {
			router.replace("/authent");
		}
	}, [userSession]);

	return null;
};

Index.auth = { authent: "either", authoris: "any" };

export default Index;
