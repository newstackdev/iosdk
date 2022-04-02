import { Button } from "antd";
import { useAppState } from "../overmind";
import { Callback, NLView } from "../types";
import { IndeterminateProgress } from "./IndeterminateProgress";

export const ProgressButton: NLView<{
	actionName: string;
	type?:
		| "link"
		| "text"
		| "ghost"
		| "default"
		| "primary"
		| "dashed"
		| undefined;
	htmlType?: "button" | "submit" | "reset" | undefined;
	className?: string;
	onClick?: Callback;
	disabled?: boolean;
	isErrorSubmit?: boolean;
}> = ({
	actionName,
	type,
	htmlType,
	className,
	children,
	onClick,
	disabled,
	isErrorSubmit,
}) => {
	const state = useAppState();
	const ival = !!state.indicators.specific[actionName];
	return (
		<>
			{/* <IndeterminateProgress inProgress={ival} /> */}
			{!ival ? (
				<Button
					// style={{ width: "100%" }}
					type={type}
					htmlType={htmlType}
					onClick={onClick}
					disabled={disabled}
					className={
						isErrorSubmit
							? `${className} disabled-submit-button`
							: `${className}`
					}
				>
					{children}
				</Button>
			) : (
				<Button
					type="primary"
					style={{ color: "black", borderColor: "black" }}
				>
					Sharing...
				</Button>
			)}
		</>
	);
};
