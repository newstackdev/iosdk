import { Progress } from "antd";
import EventEmitter from "events";
import { useEffect, useState } from "react";
import { useAppState } from "../overmind";
import { clock } from "../utils/clock";

export const IndeterminateProgress = ({
	inProgress,
}: {
	inProgress: boolean;
}) => {
	const [p, setP] = useState(0);

	useEffect(() => {
		clock.on("tick", setP);
		return () => {
			clock.off("tick", setP);
		};
	}, []);
	return inProgress ? (
		<Progress showInfo={false} percent={p} strokeColor={"#c1fa50"} />
	) : (
		<></>
	);
};
export const IndeterminateProgressAction = ({
	actionName,
}: {
	actionName: string;
}) => {
	const state = useAppState();
	const ival = !!state.indicators.specific[actionName];

	return <IndeterminateProgress inProgress={ival} />;
};
