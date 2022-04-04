import Logo from "./Icons/Logo";
import { SpinLogo } from "./Icons/SpinLogo";



export const SpaceSpin = ({
	title,
	isRotating,
}: {
	title?: string;
	isRotating?: boolean;
}) => (
	<div style={{ width: "100%", textAlign: "center", margin: "14px auto" }}>
		{/* <div className="zoom-in-out-box"> */}
		<div className="rotating" style={{ fontSize: 41, height: "50px" }}>
			{isRotating ? <SpinLogo /> : <></>}
		</div>
		{/* </div> */}
		{/* <div className="logo-image rotating" style={{ width: 64, height: 64, display: "inline-block" }} /> */}
		{title ? <div>{title}</div> : ""}
	</div>
);

export const Spin = ({
	title,
}: {
	title?: string;
}) =>
	<SpaceSpin isRotating={true} title={title} />;
