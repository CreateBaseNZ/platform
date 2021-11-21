import Img from "../UI/Img";

import classes from "./UserCard.module.scss";

const UserCard = ({ imgSrc, title }) => {
	return (
		<button className={classes.card} title={title}>
			<div className={classes.imgContainer}>
				<Img src={imgSrc} height={180} width={180} />
			</div>
			<div className={classes.title}>{title}</div>
		</button>
	);
};

export default UserCard;
