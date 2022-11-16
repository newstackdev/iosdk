import { Button } from "antd";
import { Callback, NLView } from "../types";
import { IndeterminateProgress } from "./IndeterminateProgress";
import { useAppState } from "../overmind";

export const ProgressButton: NLView<{
  actionName: string;
  type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined;
  htmlType?: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: Callback;
  disabled?: boolean;
  isErrorSubmit?: boolean;
  progressText?: string;
  id?: string;
}> = ({ actionName, id, type, htmlType, className, children, onClick, disabled, isErrorSubmit, progressText }) => {
  const state = useAppState();
  const ival = !!state.indicators.specific[actionName];
  return (
    <>
      {/* <IndeterminateProgress inProgress={ival} /> */}
      {/* {!ival ? ( */}
      <Button
        id={id}
        type={type}
        htmlType={htmlType}
        onClick={onClick}
        disabled={disabled}
        // style={ival ? {} : { color: "black", borderColor: "black" }}
        className={`${className} ${ival || isErrorSubmit ? "disabled-submit-button" : ""}`}
        style={ival ? { color: "black", borderColor: "black" } : {}}
      >
        {children}
      </Button>
      {/* ) : (
					<Button
						type="primary"
						className="disabled-submit-button"
						style={{ color: "black", borderColor: "black" }}
					>
						{progressText || ""}
					</Button>
				)} */}
    </>
  );
};
