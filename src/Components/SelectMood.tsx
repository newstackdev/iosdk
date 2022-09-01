import { Callback, NLView } from "../types";
import { Col, Form } from "antd";
import { ItemGrid } from "./ItemGrid";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { MoodCreateModal } from "../Pages/Mood/MoodCreate";
import { MoodFolderWidget, MoodWidget } from "./MoodWidget";
import { MoodReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { MoodsGrid } from "../Pages/Mood/MoodsGrid";
import { ProgressButton } from "./ProgressButton";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { omit } from "lodash";
import { useAppState } from "../overmind";
import { useState } from "react";
import Title from "../Pages/Explore/Title";

export const SelectMood: NLView<{
  moods?: MoodReadResponse[];
  onChange?: (moods: MoodReadResponse[]) => void;
  value?: MoodReadResponse[];
  limit?: number;
  title?: string;
}> = ({ moods, onChange, limit, title }) => {
  const [_value, _setValue] = useState<Record<string, MoodReadResponse>>({});
  const state = useAppState();

  const filteredMoods = state.api.auth.moods.filter(
    () => true,
    // (m) => m.title !== "My uploads"
  );

  const checkMoods = moods === undefined ? filteredMoods || [] : moods.filter((m) => m.title !== "My uploads");

  const toggle = (ni: { id?: string }) => {
    if (!ni.id) return;

    const nv = _value[ni.id || ""] ? { ...omit(_value, [ni.id]) } : { ..._value, [ni.id]: ni };

    _setValue(nv);

    onChange && onChange(Object.values(nv));
  };

  const createMood = (
    <div
      style={{
        textAlign: "center",
        color: "white",
        width: "100%",
        border: "none",
        padding: "10px",
      }}
    >
      <div style={{ width: "90%", margin: "0 auto" }}>
        <MoodCreateModal onCreated={(v) => v?.id && toggle(v)} />
      </div>
    </div>
  );

  return (
    <ItemGrid
      items={[{}, ...checkMoods]}
      limit={limit}
      // titleLink="/save-folder"
      title={title}
      // setSelectedFolder={setSelectedFolder}
      // selectedFolder={selectedFolder}
      render={(m, index) => {
        return !index ? (
          createMood
        ) : (
          <MoodFolderWidget
            // setSelectedFolder={setSelectedFolder}
            // selectedFolder={selectedFolder}
            mood={m}
            onClick={() => toggle(m)}
            selected={!!_value[(m as any).id || ""]}
          />
        );
      }}
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

export const SelectMoodForm: NLView<{ title?: string; onFinish: Callback }> = ({ title, onFinish }) => (
  <Form className="app-main-full-width" onFinish={onFinish}>
    <Form.Item name="moods" style={{ marginBottom: "40px" }}>
      {title ? <SelectMood title={title} /> : <SelectMood />}
    </Form.Item>

    <Form.Item label="" wrapperCol={{ offset: 0, span: 24 }} className="text-right">
      <ProgressButton actionName="api.post.attachToMoods" type="primary" htmlType="submit" progressText="Adding to moods...">
        Share
      </ProgressButton>
    </Form.Item>
  </Form>
);
