import { useActions } from "../../overmind";

export const SmallArrowBack = () => {
	const actions = useActions();

	return (
		<svg
			width="21"
			height="24"
			viewBox="0 0 21 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ cursor: "pointer" }}
			onClick={() =>
				actions.routing.goBack()
			}
		>
			<g clip-path="url(#clip0_34_27205)">
				<path
					d="M11.7983 3.51298L10.2727 5.03796L6.4222 8.88693L3.99985 11.3083L12.6929 20L15.1152 17.5653L8.8977 11.3503L14.2738 5.98748C14.4365 5.82508 14.5656 5.63222 14.6536 5.41992C14.7417 5.20762 14.787 4.98005 14.787 4.75023C14.787 4.52041 14.7417 4.29284 14.6536 4.08054C14.5656 3.86824 14.4365 3.67538 14.2738 3.51298C14.1114 3.35036 13.9184 3.22135 13.706 3.13333C13.4936 3.04531 13.266 3 13.0361 3C12.8062 3 12.5785 3.04531 12.3661 3.13333C12.1537 3.22135 11.9608 3.35036 11.7983 3.51298Z"
					fill="#FCFCF3"
				/>
			</g>
			<defs>
				<clipPath id="clip0_34_27205">
					<rect
						width="12.8"
						height="22.2"
						fill="white"
						transform="translate(4 1)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};
