import { useEffect, useState } from "react";
import { Callback, NLView } from "../types";
import { secondsClock } from "../utils/clock";

export const AppearingComponent: NLView<{
	seconds: number;
	onShow?: Callback;
}> = ({ seconds, children, onShow }) => {
	const [p, setP] = useState(Date.now());
	const [diff, setDiff] = useState(0);
	const [onRemove, setOnRemove] = useState<{ cb?: () => any }>({ cb: undefined });

	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => {
		secondsClock.on("tick", (n) => {
			const diff = n - p;
			setDiff(diff);

			if (diff > seconds * 1000) setVisible(true);
		});
		return () => {
			secondsClock.off("tick", setP);
			onRemove.cb && onRemove.cb();
		};
	}, []);

	useEffect(() => {
		if (!visible) setP(Date.now());
		else {
			const onr = onShow && onShow();
			setOnRemove({ cb: onr || undefined });
		}
	}, [visible]);

	return <>{visible ? children : <></>}</>;
};
