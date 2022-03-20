interface Props {
	height?: number;
	width?: number;
	color?: string;
	strokeWidth?: number;
}

interface GenericProps extends Props {
	path: string;
}

const GenericI = ({ path, height = 24, width = 24, color = "black", strokeWidth = 1 }: GenericProps): JSX.Element => {
	return (
		<i style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
			<svg
				style={{
					display: "inline",
				}}
				fill="none"
				height={height}
				width={width}
				viewBox="0 0 24 24">
				<path d={path} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
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
