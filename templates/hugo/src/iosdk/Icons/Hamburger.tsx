import { IOView } from "@newstackdev/iosdk/dist/types";

export const Hamburger: IOView<{ onClick: () => void }> = ({ onClick }) => (
	<span className="logo-icon">
	<svg
		width="50"
		height="50"
		viewBox="0 0 74 44"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{
			cursor: "pointer",
			paddingLeft: 20,
			marginTop: -5
		}}
		onClick={onClick}
	>
		<path d="M0 2H73.6971" stroke="black" stroke-width="3.36901" />
		<path d="M0 41.5859H73.6971" stroke="black" stroke-width="3.36901" />
	</svg>
	</span>
);
