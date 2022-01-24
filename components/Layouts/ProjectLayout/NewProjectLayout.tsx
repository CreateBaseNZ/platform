import { Fragment, ReactElement, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./NewProjectLayout.module.scss";
import STEPS from "../../../constants/projectSteps";
import { useRouter } from "next/router";
import UserAvatar from "../../UI/UserAvatar";
import GlobalSessionContext from "../../../store/global-session-context";

interface Props {
	children: ReactElement;
	step: string;
}

const NewProjectLayout = ({ children, step }: Props) => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	console.log(step);

	return (
		<div className={classes.container}>
			<nav className={classes.nav}>
				<div className={classes.logo}>
					<button className={classes.mainMenu}>
						<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/icons/logo-no-text.svg" height={32} width={28} alt="CreateBase" />
						<i className="material-icons-outlined">expand_more</i>
					</button>
				</div>
				<div className={classes.title}>TO DO</div>
				<div className={classes.steps}>
					{STEPS.map((s, i) => (
						<Fragment key={s.name}>
							{i !== 0 ? <div className={classes.separator} /> : null}
							<Link href={{ pathname: `/project/[id]/${s.name}`, query: { id: router.query.id } }}>
								<a className={step === s.name ? classes.active : ""} title={s.title}>
									{s.title}
								</a>
							</Link>
						</Fragment>
					))}
				</div>
				<div className={classes.buttons}>
					<div className={classes.group}>
						<i className="material-icons-outlined">backpack</i>CreateBase School
					</div>
					<button className={classes.upgrade} title="Upgrade">
						<i className="material-icons-outlined">bolt</i>
					</button>
					<UserAvatar id={globalSession.accountId} size={40} className={classes.avatar} />
				</div>
			</nav>
			{children}
		</div>
	);
};

export default NewProjectLayout;
