import Avatar from "boring-avatars";

import classes from "./UserAvatar.module.scss";

const UserAvatar = ({ type, name, size, className, ...rest }) => {
	const getColors = () => {
		if (type === "admin") {
			return ["#1F1F20", "#2C4C7C", "#577EB9", "#606D7F", "#DCE0E6"];
		} else if (type === "educator") {
			return ["#FA5522", "#FA6923", "#F6863A", "#FDA839", "#FCC955"];
		} else {
			return ["#ffabab", "#ffdaab", "#ddffab", "#abe4ff", "#d9abff"];
		}
	};

	console.log("my username is " + name);

	return (
		<div {...rest} className={`${classes.avatar} ${className}`} style={{ height: size, width: size }}>
			<Avatar variant="beam" name={name} size={size} square={true} colors={getColors()} />
		</div>
	);
};

export default UserAvatar;
