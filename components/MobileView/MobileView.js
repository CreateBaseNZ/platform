import classes from "./MobileView.module.scss";

const MobileView = () => {
	return (
		<div className={classes.mobileView}>
			<h1>We're sorry but mobile view is currently unsupported.</h1>
			<h2>To enjoy our platform, try viewing it on a laptop or desktop device.</h2>
			<h2>
				Check out our <a href="https://createbase.co.nz/">website</a> which <b>is</b> supported on all devices 📱
			</h2>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/mobile.png" />
		</div>
	);
};

export default MobileView;
