import PdfModule from "./PdfModule";
import VideoModule from "./VideoModule";
import TutorialModule from "./TutorialModule";
import Img from "../UI/Img";

import classes from "./ModuleBody.module.scss";

const ModuleBody = ({ module, length }) => {
	if (!length)
		return (
			<div className={classes.empty}>
				<h1>Nothing to see here!</h1>
				<div className={classes.emptyImg}>
					<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/empty-modules.svg" layout="fill" objectFit="contain" label="Illustration by Storyset" />
				</div>
				<h2>You've got everything you need to continue to the next step!</h2>
			</div>
		);

	if (!module?.type) return null;

	return (
		<div style={{ width: "100%", height: "100%" }}>
			{(module.type === "pdf" || module.type === "task") && <PdfModule module={module} />}
			{module.type === "video" && <VideoModule module={module} />}
			{module.type === "tut" && <TutorialModule module={module} />}
			{module.type === "explore" && (
				<div className={classes.exploreWrapper}>
					{module.items.map((item, i) => (
						<a key={i} href={item.url} className={classes.exploreItem} title={`Launch ${item.title}`}>
							<div
								className={classes.imgContainer}
								style={{
									background: `linear-gradient(to bottom right, ${item.col1}, ${item.col2})`,
								}}>
								<div className={classes.imgWrapper}>
									<Img src={item.img} layout="fill" objectFit="cover" />
								</div>
								<span className="material-icons-outlined">launch</span>
								<h3>{item.title}</h3>
							</div>
							<div className={classes.caption}>{item.caption}</div>
						</a>
					))}
				</div>
			)}
		</div>
	);
};

export default ModuleBody;
