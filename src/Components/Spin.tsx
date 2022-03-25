import Logo from "./Icons/Logo";
import { SpinLogo } from "./Icons/SpinLogo";

export const Spin = ({ title }: { title?: string }) => (
	<div style={{ width: "100%", textAlign: "center", margin: "14px auto" }}>
		{/* <div className="zoom-in-out-box"> */}
		<div className="rotating" style={{ fontSize: 41 }}>
			<SpinLogo />
		</div>
		{/* </div> */}
		{/* <div className="logo-image rotating" style={{ width: 64, height: 64, display: "inline-block" }} /> */}
		{title ? <div>{title}</div> : ""}
	</div>
);
