import Img from "../UI/Img";
import Link from "next/link";

import classes from "./UserCard.module.scss";

const UserCard = ({ imgSrc, title, route }) => {
	return (
		<Link href={route}>
			<button className={classes.card} title={title}>
				<div className={classes.imgContainer}>
					<Img src={imgSrc} height={180} width={180} label="Illustration by Storyset" />
				</div>
				<div className={classes.title}>{title}</div>
			</button>
		</Link>
	);
};

export default UserCard;
