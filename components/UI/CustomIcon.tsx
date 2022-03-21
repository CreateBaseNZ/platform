interface Props {
	height?: number;
	width?: number;
	color?: string;
	strokeWidth?: number;
	[x: string]: any;
}

interface GenericProps extends Props {
	path: string;
}

const GenericI = ({ path, height = 24, width = 24, color = "black", strokeWidth = 1, ...props }: GenericProps): JSX.Element => {
	return (
		<i style={{ display: "flex", alignItems: "center", justifyContent: "center" }} {...props}>
			<svg style={{ display: "inline" }} fill="none" height={height} width={width} viewBox="0 0 24 24">
				<path d={path} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" style={{ transition: "all 0.1s ease-out" }} />
			</svg>
		</i>
	);
};

export const DeleteI = (props: Props): JSX.Element => {
	return (
		<GenericI
			{...props}
			path="M16.5 7.25H18.5M16.5 7.25V17.25C16.5 18.3546 15.6046 19.25 14.5 19.25H9.5C8.39543 19.25 7.5 18.3546 7.5 17.25V7.25M16.5 7.25H7.5M5.5 7.25H7.5M10.5 10.25V16.25M13.5 10.25V16.25M9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25"
		/>
	);
};

export const CloseI = (props: Props): JSX.Element => {
	return <GenericI {...props} path="M5 5L18.9999 19M5 19L19 5" />;
};
