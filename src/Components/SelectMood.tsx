import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Callback, NLView } from "../types";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { MoodFolderWidget, MoodWidget } from "./MoodWidget";
import { omit } from "lodash";
import { useState } from "react";
import { ItemGrid } from "./ItemGrid";
import { MoodsGrid } from "../Pages/Mood/MoodsGrid";
import { useAppState } from "../overmind";
import { Form } from "antd";
import { ProgressButton } from "./ProgressButton";
import Title from "../Pages/Explore/Title";

export const SelectMood: NLView<{
	moods?: MoodReadResponse[];
	onChange?: (moods: MoodReadResponse[]) => void;
	value?: MoodReadResponse[];
	limit?: number;
	title?: string;
}> = ({ moods, onChange, limit, title }) => {
	const [_value, _setValue] = useState<Record<string, MoodReadResponse>>({});
	const [selectedFolder, setSelectedFolder] = useState<boolean>(false);
	const state = useAppState();

	const checkMoods = moods === undefined ? state.api.auth.moods || [] : moods;

	const toggle = (ni: { id?: string }) => {
		if (!ni.id) return;

		const nv = _value[ni.id || ""]
			? { ...omit(_value, [ni.id]) }
			: { ..._value, [ni.id]: ni };

		_setValue(nv);

		onChange && onChange(Object.values(nv));
	};

	return (
		<ItemGrid
			items={checkMoods}
			limit={limit}
			// titleLink="/save-folder"
			title={"Select a folder to share"} 
			setSelectedFolder={setSelectedFolder}
			selectedFolder={selectedFolder}
			render={(m) => (
				<MoodFolderWidget
					setSelectedFolder={setSelectedFolder}
					selectedFolder={selectedFolder}
					mood={m}
					onClick={() => toggle(m)}
					selected={!!_value[(m as any).id || ""]}
				/>
			)}
		/>
	);
	// return <ItemGrid items={moods} render={m => <MoodWidget mood={m} onClick={() => toggle(m)} selected={!!value[(m as any).id || ""]} />} />

	// return <ScrollMenu
	//     LeftArrow={LeftCircleOutlined}
	//     RightArrow={RightCircleOutlined}
	// >
	//     {

	//         moods.length ? moods.map(m => (
	//             <div style={{ maxWidth: 280 }}><MoodWidget mood={m} onClick={() => toggle(m)} selected={!!value[m.id || ""]} /></div>
	//         )) : <h1>no moods</h1>
	//     }
	// </ScrollMenu>
};

export const SelectMoodForm: NLView<{ title?: string, onFinish: Callback }> = ({ title, onFinish }) => (
	<Form className="app-main-full-width" onFinish={onFinish}>
		<Form.Item name="moods" style={{ marginBottom: "40px" }}>
			{title ? <SelectMood title={title} /> : <SelectMood />}
		</Form.Item>

		<Form.Item
			label=""
			wrapperCol={{ offset: 0, span: 24 }}
			className="text-right"
		>
			<ProgressButton
				actionName="api.post.attachToMoods"
				type="primary"
				htmlType="submit"
			>
				Share
			</ProgressButton>
		</Form.Item>
	</Form>
);
