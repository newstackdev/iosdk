import { Button, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useAppState } from "../overmind";
import { NLView } from "../types";
import { CrossCircle } from "./Icons/CrossCircle";

export const Share: NLView<{ url: string }> = ({ url }) => (
	<Input value={url} />
);

export const ShareButton: NLView = () => {
	const [isVisible, setIsVisible] = useState(false);
	const state = useAppState();

	const url = [
		window.location.protocol,
		"//",
		window.location.host,
		state.routing.location,
	].join("");

	return (
		<>
			{isVisible ? (
				<Modal
					closeIcon={<CrossCircle />}
					visible={isVisible}
					onCancel={() => setIsVisible(false)}
					onOk={() => setIsVisible(false)}
					className="nl-white-box-modal"
				>
					<Share url={url} />
				</Modal>
			) : (
				<></>
			)}
			<Button onClick={() => setIsVisible(true)}>Share link</Button>
		</>
	);
};
