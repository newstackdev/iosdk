import { NLView } from "../../types";
import { useActions, useAppState } from "../../overmind";
import { MoodsGrid } from "./MoodsGrid";

export const MyMoods: NLView = () => {
    useActions().routing.setTitle("My folders");

    return <MoodsGrid moods={useAppState().api.auth.moods} title="My folders" />
}
export default MyMoods;