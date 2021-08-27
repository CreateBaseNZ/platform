import Image from "next/image";

const WhiteLogo = (props) => {
	return (
		<a target="_blank" href="https://createbase.co.nz/" className={props.className} title="createbase.co.nz" onClick={props.handler}>
			<Image src="/icons/white-logo.png" alt="CreateBase" layout={props.layout} objectFit={props.objectFit} width={props.width} height={props.height} quality={props.quality} />
		</a>
	);
};

export default WhiteLogo;

export const FBIcon = ({
	className,
	handler,
	href = "https://www.facebook.com/CreateBaseNZ",
	title = "/CreateBaseNZ",
	fill = "white",
	width = "32",
	height = "32",
	iconWidth = "32",
	iconHeight = "32",
}) => {
	return (
		<a
			className={className}
			target="_blank"
			href={href}
			title={title}
			onClick={handler}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: height + "px",
				width: width + "px",
			}}>
			<svg
				style={{
					display: "inline",
				}}
				height={iconHeight}
				width={iconWidth}
				fill={fill}
				viewBox="0 0 448 512">
				<path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
			</svg>
		</a>
	);
};

export const IGIcon = ({
	className,
	handler,
	href = "https://www.instagram.com/createbasenz/",
	title = "@createbasenz",
	fill = "white",
	width = "32",
	height = "32",
	iconWidth = "32",
	iconHeight = "32",
}) => {
	return (
		<a
			className={className}
			target="_blank"
			href={href}
			title={title}
			onClick={handler}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: height + "px",
				width: width + "px",
			}}>
			<svg
				style={{
					display: "inline",
				}}
				height={iconHeight}
				width={iconWidth}
				fill={fill}
				viewBox="0 0 448 512">
				<path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
			</svg>
		</a>
	);
};

export const TwitterIcon = ({
	className,
	handler,
	href = "https://twitter.com/CreateBaseNZ",
	title = "@CreateBaseNZ",
	fill = "white",
	width = "32",
	height = "32",
	iconWidth = "32",
	iconHeight = "32",
}) => {
	return (
		<a
			className={className}
			target="_blank"
			href={href}
			title={title}
			onClick={handler}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: height + "px",
				width: width + "px",
			}}>
			<svg
				style={{
					display: "inline",
				}}
				height={iconHeight}
				width={iconWidth}
				fill={fill}
				viewBox="0 0 512 512">
				<path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
			</svg>
		</a>
	);
};

export const YTIcon = ({
	className,
	handler,
	href = "https://www.youtube.com/channel/UClLBwFvHpGrRpxyRg1IOB0g",
	title = "CreateBase Channel",
	fill = "white",
	width = "32",
	height = "32",
	iconWidth = "32",
	iconHeight = "32",
}) => {
	return (
		<a
			className={className}
			target="_blank"
			href={href}
			title={title}
			onClick={handler}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: height + "px",
				width: width + "px",
			}}>
			<svg
				style={{
					display: "inline",
				}}
				height={iconHeight}
				width={iconWidth}
				fill={fill}
				viewBox="0 0 576 512">
				<path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
			</svg>
		</a>
	);
};

export const ColourLogo = ({ className, handler, width = "175", height = "32" }) => {
	return (
		<a target="_blank" href="https://createbase.co.nz/" className={className} title="createbase.co.nz" onClick={handler}>
			<svg
				style={{
					display: "inline",
				}}
				height={height}
				width={width}
				viewBox="0 0 403.11 73.56">
				<defs>
					<linearGradient id="linear-gradient" x1="-0.36" y1="45.31" x2="63.9" y2="45.31" gradientTransform="translate(-0.08 0.17) rotate(-0.41)" gradientUnits="userSpaceOnUse">
						<stop offset="0" stopColor="#4e4ed6" />
						<stop offset="0.65" stopColor="#8258dc" />
						<stop offset="1" stopColor="#ad3bff" />
					</linearGradient>
				</defs>
				<path
					fill="url(#linear-gradient)"
					d="M59.09,23.11,37.31,9.94a10.25,10.25,0,0,0-10.58,0L5.35,22.85A11.07,11.07,0,0,0,0,32.33v7.8A.87.87,0,0,0,.87,41l8.36-.06a.86.86,0,0,0,.86-.87V36.86a6,6,0,0,1,3-5.25L29.72,22a4.89,4.89,0,0,1,4.92,0l16.9,9.82a1.75,1.75,0,0,1,0,3l-7,4a2.11,2.11,0,0,1-2.13,0l-8.11-4.78a3.94,3.94,0,0,0-4,0l-6.71,3.81a5.66,5.66,0,0,0-2.85,4.86l-.09,8.1a3.4,3.4,0,0,0,1.7,3l6.87,4a5.75,5.75,0,0,0,5.76,0l7.27-4.15a2.91,2.91,0,0,1,2.87,0l5.73,3.22a2.18,2.18,0,0,1,0,3.79L37.3,68.59a10.3,10.3,0,0,1-10.3,0L12.3,60.14a4.29,4.29,0,0,1-2.14-3.68l0-4.88a.86.86,0,0,0-.87-.86l-8.41.06a.87.87,0,0,0-.86.87v9.91a5.66,5.66,0,0,0,2.67,4.83L25.54,80.22a12.55,12.55,0,0,0,13,0L60.94,66.69a6.55,6.55,0,0,0,3.11-5.64V31.91A10.28,10.28,0,0,0,59.09,23.11ZM37.21,48.48a1.55,1.55,0,0,1-.77,1.36l-3.44,2a1.55,1.55,0,0,1-1.56,0L28,49.9a1.55,1.55,0,0,1-.79-1.35l0-4a1.56,1.56,0,0,1,.77-1.36l3.44-2a1.58,1.58,0,0,1,1.56,0l3.47,2a1.55,1.55,0,0,1,.79,1.35Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M84.39,35.68a17.31,17.31,0,0,1,6.76-6.84A19.58,19.58,0,0,1,101,26.39a18.85,18.85,0,0,1,11.54,3.55,17.16,17.16,0,0,1,6.41,9.71H108.81A8.21,8.21,0,0,0,105.6,36a9,9,0,0,0-4.72-1.25,8.79,8.79,0,0,0-6.9,3,11.48,11.48,0,0,0-2.64,7.92A11.49,11.49,0,0,0,94,53.61a8.82,8.82,0,0,0,6.9,3,9,9,0,0,0,4.72-1.24,8.21,8.21,0,0,0,3.21-3.61h10.13a17,17,0,0,1-6.41,9.68A19,19,0,0,1,101,64.93a19.58,19.58,0,0,1-9.84-2.46,17.29,17.29,0,0,1-6.76-6.81,20.18,20.18,0,0,1-2.43-10A20.34,20.34,0,0,1,84.39,35.68Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M137.86,35.68a10.44,10.44,0,0,1,5.39-1.42V44h-2.53a7.77,7.77,0,0,0-5.18,1.49c-1.15,1-1.72,2.72-1.72,5.2v14H124.6V34.58h9.22v5A12.16,12.16,0,0,1,137.86,35.68Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M175.86,51.83H155a6.22,6.22,0,0,0,1.81,4.28,5.5,5.5,0,0,0,3.9,1.49,4.85,4.85,0,0,0,4.8-2.91h9.81A13.45,13.45,0,0,1,172.6,60a13.69,13.69,0,0,1-4.93,3.72A15.84,15.84,0,0,1,161,65.09a16.1,16.1,0,0,1-7.87-1.89,13.38,13.38,0,0,1-5.39-5.39,16.53,16.53,0,0,1-1.94-8.19,16.81,16.81,0,0,1,1.91-8.2A13.23,13.23,0,0,1,153.11,36,17.48,17.48,0,0,1,168.8,36a13.23,13.23,0,0,1,5.31,5.23A15.93,15.93,0,0,1,176,49.13,23.09,23.09,0,0,1,175.86,51.83Zm-9.27-5.12A4.76,4.76,0,0,0,165,42.93a6,6,0,0,0-4-1.4A5.83,5.83,0,0,0,157,42.88a6,6,0,0,0-2,3.83Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M180.79,41.42A13.06,13.06,0,0,1,185.56,36a12.46,12.46,0,0,1,6.74-1.89,11.61,11.61,0,0,1,5.58,1.29,9.5,9.5,0,0,1,3.69,3.4V34.58h9.22V64.66h-9.22V60.4a10,10,0,0,1-3.74,3.39,11.5,11.5,0,0,1-5.58,1.3,12.22,12.22,0,0,1-6.69-1.92,13.23,13.23,0,0,1-4.77-5.44A18.1,18.1,0,0,1,179,49.56,18,18,0,0,1,180.79,41.42Zm18.87,2.75a6.49,6.49,0,0,0-9.33,0,7.46,7.46,0,0,0-1.91,5.41A7.68,7.68,0,0,0,190.33,55a6.42,6.42,0,0,0,9.33,0,7.55,7.55,0,0,0,1.91-5.44A7.57,7.57,0,0,0,199.66,44.17Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M234.24,56.84v7.82h-4.69c-3.35,0-6-.82-7.82-2.45s-2.8-4.31-2.8-8v-12h-3.67V34.58h3.67V27.25h9.21v7.33h6v7.65h-6V54.31a2.53,2.53,0,0,0,.65,1.94,3.19,3.19,0,0,0,2.16.59Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M267.55,51.83H246.69a6.22,6.22,0,0,0,1.8,4.28,5.51,5.51,0,0,0,3.91,1.49,4.85,4.85,0,0,0,4.8-2.91H267A13.58,13.58,0,0,1,264.29,60a13.73,13.73,0,0,1-4.94,3.72,15.78,15.78,0,0,1-6.63,1.35,16.13,16.13,0,0,1-7.87-1.89,13.44,13.44,0,0,1-5.39-5.39,16.64,16.64,0,0,1-1.94-8.19,16.81,16.81,0,0,1,1.92-8.2A13.17,13.17,0,0,1,244.8,36,17.48,17.48,0,0,1,260.49,36a13.14,13.14,0,0,1,5.3,5.23,15.83,15.83,0,0,1,1.92,7.92A25.49,25.49,0,0,1,267.55,51.83Zm-9.27-5.12a4.76,4.76,0,0,0-1.62-3.78,6,6,0,0,0-4-1.4,5.83,5.83,0,0,0-3.91,1.35,6,6,0,0,0-2,3.83Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M300.75,48.51a9.91,9.91,0,0,1-1.32,13.37q-3.31,2.77-9.24,2.78H272.56V26.82h17q5.78,0,9,2.64a8.75,8.75,0,0,1,3.26,7.17,8.63,8.63,0,0,1-1.75,5.55,9,9,0,0,1-4.66,3.07A8.85,8.85,0,0,1,300.75,48.51Zm-19-6.38h6a5.38,5.38,0,0,0,3.48-1,3.59,3.59,0,0,0,1.21-2.94,3.65,3.65,0,0,0-1.21-3,5.22,5.22,0,0,0-3.48-1h-6Zm10.37,14a3.73,3.73,0,0,0,1.27-3.05A3.88,3.88,0,0,0,292.1,50a5.38,5.38,0,0,0-3.64-1.14h-6.68v8.36h6.79A5.46,5.46,0,0,0,292.15,56.17Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M308,41.42A13.06,13.06,0,0,1,312.77,36a12.44,12.44,0,0,1,6.74-1.89,11.61,11.61,0,0,1,5.58,1.29,9.5,9.5,0,0,1,3.69,3.4V34.58H338V64.66h-9.22V60.4A10,10,0,0,1,325,63.79a11.49,11.49,0,0,1-5.57,1.3,12.2,12.2,0,0,1-6.69-1.92A13.23,13.23,0,0,1,308,57.73a18.1,18.1,0,0,1-1.75-8.17A18,18,0,0,1,308,41.42Zm18.87,2.75a6.49,6.49,0,0,0-9.33,0,7.46,7.46,0,0,0-1.91,5.41A7.68,7.68,0,0,0,317.54,55a6.42,6.42,0,0,0,9.33,0,7.55,7.55,0,0,0,1.91-5.44A7.57,7.57,0,0,0,326.87,44.17Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M349.91,63.74a12,12,0,0,1-4.85-3.69,9.74,9.74,0,0,1-2-5.26h9.11a3.53,3.53,0,0,0,1.46,2.54,5.18,5.18,0,0,0,3.18,1,4.54,4.54,0,0,0,2.67-.68,2.08,2.08,0,0,0,.94-1.75A2,2,0,0,0,359.07,54a27.14,27.14,0,0,0-4.36-1.38A39.58,39.58,0,0,1,349.32,51a9.15,9.15,0,0,1-3.72-2.64A7.16,7.16,0,0,1,344,43.47a8.29,8.29,0,0,1,1.43-4.71,9.52,9.52,0,0,1,4.21-3.37,16,16,0,0,1,6.6-1.24c3.77,0,6.75.93,8.92,2.8a11,11,0,0,1,3.75,7.44h-8.52A3.64,3.64,0,0,0,359,41.91a4.75,4.75,0,0,0-3-.92,4.22,4.22,0,0,0-2.48.62,2,2,0,0,0-.86,1.7A2.08,2.08,0,0,0,354,45.25a22.1,22.1,0,0,0,4.29,1.3,47.77,47.77,0,0,1,5.44,1.69,9.43,9.43,0,0,1,3.69,2.7,7.64,7.64,0,0,1,1.65,5,8,8,0,0,1-1.48,4.72,9.77,9.77,0,0,1-4.26,3.26,16.3,16.3,0,0,1-6.44,1.19A17.26,17.26,0,0,1,349.91,63.74Z"
					transform="translate(0 -8.47)"
				/>
				<path
					fill="#322d41"
					d="M403,51.83H382.09a6.22,6.22,0,0,0,1.8,4.28,5.53,5.53,0,0,0,3.91,1.49,4.85,4.85,0,0,0,4.8-2.91h9.81A13.45,13.45,0,0,1,399.69,60a13.65,13.65,0,0,1-4.94,3.72,15.76,15.76,0,0,1-6.62,1.35,16.14,16.14,0,0,1-7.88-1.89,13.42,13.42,0,0,1-5.38-5.39,16.54,16.54,0,0,1-1.95-8.19,16.81,16.81,0,0,1,1.92-8.2A13.17,13.17,0,0,1,380.2,36,17.48,17.48,0,0,1,395.89,36a13.23,13.23,0,0,1,5.31,5.23,15.93,15.93,0,0,1,1.91,7.92A23.09,23.09,0,0,1,403,51.83Zm-9.27-5.12a4.76,4.76,0,0,0-1.62-3.78,6,6,0,0,0-4-1.4,5.83,5.83,0,0,0-3.91,1.35,6,6,0,0,0-2,3.83Z"
					transform="translate(0 -8.47)"
				/>
			</svg>
		</a>
	);
};
