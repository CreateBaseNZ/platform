interface Props {
	height?: number;
	width?: number;
	color?: string;
	strokeWidth?: number;
	[x: string]: any;
}

interface GenericProps extends Props {
	paths: string[];
}

const GenericI = ({ paths, height = 24, width = 24, color = "black", strokeWidth = 1, fill = "none", ...props }: GenericProps): JSX.Element => {
	return (
		<i style={{ display: "flex", alignItems: "center", justifyContent: "center" }} {...props}>
			<svg style={{ display: "inline" }} fill="none" height={height} width={width} viewBox="0 0 24 24">
				{paths.map((path, i) => (
					<path key={i} d={path} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill={fill} style={{ transition: "all 0.1s ease-out" }} />
				))}
			</svg>
		</i>
	);
};

export const DeleteI = (props: Props): JSX.Element => {
	return (
		<GenericI
			{...props}
			paths={[
				"M16.5 7.25H18.5M16.5 7.25V17.25C16.5 18.3546 15.6046 19.25 14.5 19.25H9.5C8.39543 19.25 7.5 18.3546 7.5 17.25V7.25M16.5 7.25H7.5M5.5 7.25H7.5M10.5 10.25V16.25M13.5 10.25V16.25M9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25",
			]}
		/>
	);
};

export const CloseI = (props: Props): JSX.Element => {
	return <GenericI {...props} paths={["M5 5L18.9999 19M5 19L19 5"]} />;
};

export const DragIndicatorI = (props: Props): JSX.Element => {
	return (
		<GenericI
			{...props}
			strokeWidth={0}
			fill={"black"}
			paths={[
				"M10.5 6.50055C10.5 7.32897 9.82843 8.00055 9 8.00055C8.17157 8.00055 7.5 7.32897 7.5 6.50055C7.5 5.67212 8.17157 5.00054 9 5.00054C9.82843 5.00054 10.5 5.67212 10.5 6.50055Z",
				"M16.5001 6.5C16.5001 7.32843 15.8285 8 15.0001 8C14.1717 8 13.5001 7.32843 13.5001 6.5C13.5001 5.67157 14.1717 5 15.0001 5C15.8285 5 16.5001 5.67157 16.5001 6.5Z",
				"M10.5001 12.0008C10.5001 12.8292 9.8285 13.5008 9.00007 13.5008C8.17165 13.5008 7.50007 12.8292 7.50007 12.0008C7.50007 11.1723 8.17165 10.5008 9.00007 10.5008C9.8285 10.5008 10.5001 11.1723 10.5001 12.0008Z",
				"M16.5001 12.0006C16.5001 12.829 15.8285 13.5006 15.0001 13.5006C14.1717 13.5006 13.5001 12.829 13.5001 12.0006C13.5001 11.1722 14.1717 10.5006 15.0001 10.5006C15.8285 10.5006 16.5001 11.1722 16.5001 12.0006Z",
				"M10.5001 17.5007C10.5001 18.3291 9.82848 19.0007 9.00006 19.0007C8.17163 19.0007 7.50006 18.3291 7.50006 17.5007C7.50006 16.6723 8.17163 16.0007 9.00006 16.0007C9.82848 16.0007 10.5001 16.6723 10.5001 17.5007Z",
				"M16.5 17.5002C16.5 18.3286 15.8285 19.0002 15 19.0002C14.1716 19.0002 13.5 18.3286 13.5 17.5002C13.5 16.6717 14.1716 16.0002 15 16.0002C15.8285 16.0002 16.5 16.6717 16.5 17.5002Z",
			]}
		/>
	);
};
