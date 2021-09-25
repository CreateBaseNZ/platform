import Image from "next/image";
import Link from "next/link";
import Img from "./Img";
import classes from "./ModuleContainer.module.scss";

const getIcon = (type) => {
	switch (type) {
		case "video":
			return "play_circle";
		case "pdf":
			return "attach_file";
		case "tut":
			return "emoji_objects";
		case "explore":
			return "explore";
	}
};

const ModuleContainer = ({ active, modules, clickHandler, caption, play }) => {
	return (
		<div className={`${classes.container} roundScrollbar`}>
			<div className={classes.captionContainer}>
				{caption &&
					caption.map((c, i) => (
						<p key={i} className={classes.caption}>
							{c}
						</p>
					))}
			</div>
			{modules.map((item, i) => (
				<button key={i} className={`${classes.card} ${active === i ? classes.activeCard : ""}`} onClick={clickHandler.bind(this, i)}>
					<div className={`${classes.cardImgWrapper} ${classes[item.type]}`}>
						{item.img ? <Img src={item.img} layout="fill" objectFit="cover" /> : <span className={`material-icons-outlined ${classes.shapes}`}>{getIcon(item.type)}</span>}
					</div>
					<p>{item.title}</p>
				</button>
			))}
			{play && (
				<Link href={`/project/${play}/play`}>
					<button className={classes.play}>
						<span className="material-icons-outlined">sports_esports</span>Try the Game
					</button>
				</Link>
			)}
		</div>
	);
};

export default ModuleContainer;
