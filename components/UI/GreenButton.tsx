import classes from "./GreenButton.module.scss";

interface IGreenButtonProps {
	clickHandler: any; // TODO
	caption: string;
	className?: string;
}

const GreenButton = ({ className, clickHandler, caption }: IGreenButtonProps): JSX.Element => {
	return (
		<button className={`${classes.button} ${className}`} onClick={clickHandler}>
			{caption}
		</button>
	);
};

export default GreenButton;
