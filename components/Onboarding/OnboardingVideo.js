import Link from "next/link";
import ClientOnlyPortal from "../UI/ClientOnlyPortal";
import classes from "./OnboardingVideo.module.scss";

const OnboardingVideo = ({ state, setState }) => {
	console.log(state);

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setState({ show: false })} />
				<iframe
					src={state.videoUrl}
					title={state.title}
					className="embedded-video-16-9"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					style={{ zIndex: 50 }}
				/>
				{state.linkUrl && (
					<Link href={state.linkUrl}>
						<a className={classes.link} title={state.linkLabel} style={{ zIndex: 50 }}>
							{state.linkLabel} <i className="material-icons-outlined">arrow_forward</i>
						</a>
					</Link>
				)}
			</div>
		</ClientOnlyPortal>
	);
};

export default OnboardingVideo;
