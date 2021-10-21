import Avatar from "boring-avatars";

import classes from "./UserAvatar.module.scss";

const UserAvatar = ({ type, name, size, className, ...rest }) => {
	return (
		<div {...rest} className={`${classes.avatar} ${className}`} style={{ height: size, width: size }}>
			<Avatar variant="beam" name={name} size={size} square={true} colors={["#FFB3BA", "#FFDFBB", "#FFFFBA", "#BAFFC9", "#BAE1FF"]} />
		</div>
	);
};

export default UserAvatar;
