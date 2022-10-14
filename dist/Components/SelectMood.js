import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from "antd";
import { ItemGrid } from "./ItemGrid";
import { MoodCreateModal } from "../Pages/Mood/MoodCreate";
import { MoodFolderWidget } from "./MoodWidget";
import { omit } from "lodash";
import { useAppState } from "../overmind";
import { useState } from "react";
import Title from "../Pages/Explore/Title";
export const SelectMood = ({ moods, onChange, limit, title, deeplikeActions, deepLikeContainer }) => {
    const [_value, _setValue] = useState({});
    const state = useAppState();
    const filteredMoods = state.api.auth.moods.filter(() => true);
    const checkMoods = moods === undefined ? filteredMoods || [] : moods.filter((m) => m.title !== "My uploads");
    const toggle = (ni) => {
        if (!ni.id)
            return;
        const nv = _value[ni.id || ""] ? { ...omit(_value, [ni.id]) } : { ..._value, [ni.id]: ni };
        _setValue(nv);
        onChange && onChange(Object.values(nv));
    };
    const createMood = (_jsx("div", { style: {
            textAlign: "center",
            color: "white",
            width: "100%",
            border: "none",
        }, className: "selectable-folder bg-hover", children: _jsx(MoodCreateModal, { onCreated: (v) => v?.id && toggle(v) }) }));
    return (_jsx(ItemGrid, { items: [{}, ...checkMoods], limit: limit, deepLikeContainer: deepLikeContainer, 
        // titleLink="/save-folder"
        title: title, deeplikeActions: true, 
        // setSelectedFolder={setSelectedFolder}
        // selectedFolder={selectedFolder}
        render: (m, index) => {
            return !index ? (createMood) : (_jsx(MoodFolderWidget
            // setSelectedFolder={setSelectedFolder}
            // selectedFolder={selectedFolder}
            , { 
                // setSelectedFolder={setSelectedFolder}
                // selectedFolder={selectedFolder}
                mood: m, onClick: () => toggle(m), selected: !!_value[m.id || ""] }));
        } }));
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
export const SelectMoodForm = ({ title, onFinish, deeplikeActions, setVisible, visible }) => {
    return (_jsx("div", { className: "nl-post-deeplike-container", children: _jsxs(Form, { className: "app-main-full-width", onFinish: onFinish, children: [_jsx(Title, { title: "Save to a folder", deeplikeActions: true, setVisible: setVisible, visible: visible }), _jsx(Form.Item, { name: "moods", style: { margin: 0 }, children: _jsx(SelectMood, { title: title, deeplikeActions: deeplikeActions, limit: 6 }) })] }) }));
};
//# sourceMappingURL=SelectMood.js.map