import { jsx as _jsx } from "react/jsx-runtime";
import { useActions, useAppState } from "../../overmind";
import { MoodsGrid } from "./MoodsGrid";
export const MyMoods = () => {
    useActions().routing.setTitle("My folders");
    return _jsx(MoodsGrid, { moods: useAppState().api.auth.moods, title: "My folders" });
};
export default MyMoods;
//# sourceMappingURL=MyMoods.js.map